import { CollectionAfterOperationHook } from 'payload'

import { Resend } from 'resend'

import {
  HTMLConverterFeature,
  consolidateHTMLConverters,
  convertLexicalToHTML,
  defaultEditorConfig,
  defaultEditorFeatures,
  sanitizeServerEditorConfig,
} from '@payloadcms/richtext-lexical'

const afterPostCreate: CollectionAfterOperationHook = async ({
  args,
  operation,
  req,
  result,
}: any) => {
  if (operation !== 'create') {
    return result
  }
  const apiKey = process.env.RESEND_API_KEY
  const audienceId = process.env.RESEND_AUDIENCE_ID

  if (!apiKey || !audienceId) {
    return result
  }

  const resend = new Resend(apiKey)

  // get audience emails
  const emails = await resend.contacts.list({
    audienceId: audienceId,
  })

  if (!emails.data) {
    return result
  }

  if (emails.data.object !== 'list') {
    return result
  }

  const newPost = result.docs ? result.docs[0] : result
  const title = newPost.title
  const body = newPost.postBody

  const editorConfig = defaultEditorConfig
  editorConfig.features = [...defaultEditorFeatures, HTMLConverterFeature({})]
  const sanitizedEditorConfig = await sanitizeServerEditorConfig(editorConfig, req.payload.config)

  const html = await convertLexicalToHTML({
    converters: consolidateHTMLConverters({
      editorConfig: sanitizedEditorConfig,
    }),
    data: body,
    req,
  })
  const emailData = emails.data.data.map((contact) => ({
    from: `Hello <hello@${process.env.RESEND_DOMAIN}>`,
    to: [contact.email],
    subject: title,
    html,
  }))

  // send email to audience
  const response = await resend.batch.send(emailData)
  console.log('batch response', response)
  return result
}

export default afterPostCreate
