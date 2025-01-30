import * as migration_20250130_191502 from './20250130_191502';

export const migrations = [
  {
    up: migration_20250130_191502.up,
    down: migration_20250130_191502.down,
    name: '20250130_191502'
  },
];
