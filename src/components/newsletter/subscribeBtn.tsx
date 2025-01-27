'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const SubscribeBtn = () => {
  return (
    <form>
      <div className="flex space-x-2">
        <Input
          type="email"
          name="email"
          className="max-w-lg flex-1"
          placeholder="Enter your email"
        />
        <Button type="submit">Subscribe</Button>
      </div>
    </form>
  )
}

export default SubscribeBtn
