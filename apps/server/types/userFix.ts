import { Users } from '../src/users/users.entity';

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface User extends Users {}
  }
}
