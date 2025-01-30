import * as migration_20250114_010454_initial from './20250114_010454_initial';
import * as migration_20250130_184210 from './20250130_184210';
import * as migration_20250130_190930 from './20250130_190930';

export const migrations = [
  {
    up: migration_20250114_010454_initial.up,
    down: migration_20250114_010454_initial.down,
    name: '20250114_010454_initial',
  },
  {
    up: migration_20250130_184210.up,
    down: migration_20250130_184210.down,
    name: '20250130_184210',
  },
  {
    up: migration_20250130_190930.up,
    down: migration_20250130_190930.down,
    name: '20250130_190930'
  },
];
