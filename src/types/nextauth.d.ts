import { DefaultUser } from 'next-auth';

/**
 * ==============================================
 * Added Keys
 * ==============================================
 */
interface IUser extends DefaultUser {
  id: string;
}

/**
 * Session
 */
declare module 'next-auth' {
  interface User extends IUser {}
  interface Session {
    user?: User;
  }
}

/**
 * JWT
 */
declare module 'next-auth/jwt' {
  interface JWT extends IUser {}
}
