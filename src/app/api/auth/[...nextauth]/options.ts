import { connectToDB } from '@src/configs/database_config';
import User from '@src/models/user';
import { NextAuthOptions } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import { JWT } from 'next-auth/jwt';
import GoogleProvider from 'next-auth/providers/google';

type SessionParams = {
  session: any;
  token: JWT;
  user: AdapterUser;
};

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/'
  },
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async session({ session, token, user }: SessionParams) {
      await connectToDB();
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = await sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }: any) {
      try {
        await connectToDB();
        const userExist = await User.findOne({ email: profile.email });
        if (!userExist) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(' ', '').toLowerCase(),
            image: profile.picture
          });
        }
        return true;
      } catch (error: any) {
        console.log('Error checking if user exists: ', error.message);
        return false;
      }
    }
  }
};

/**
 * ===========================================
 * Credential Provider For Future Reference
 * ===========================================
 */

// CredentialsProvider({
//   name: 'Credentials',
//   credentials: {
//     email: {
//       label: 'Email',
//       type: 'email',
//       placeholder: 'Enter your email'
//     },
//     password: {
//       label: 'Password',
//       type: 'password',
//       placeholder: 'Enter your password'
//     }
//   },
//   async authorize(credentials) {
//     try {
//       await connectToDB();
//       const userExist = await User.findOne({ email: credentials?.email });
//       if (!userExist) throw Error('Email does not exist.');
//       //validate password
//       const passwordIsValid = await bcrypt.compare(credentials?.password!, userExist.password);
//       if (!passwordIsValid) throw new Error('Invalid credentials');

//       return {
//         id: userExist._id.toString(),
//         ...userExist
//       };
//     } catch (error) {
//       return false;
//     }
//   }
// })

/**
 * ===============================
 * CALLBACKS
 * ===============================
 */

//  session: {
//   strategy: 'jwt'
//  },
// async jwt({ token, user, account, profile }) {
//   //   console.log('fire jwt Callback');

//   // console.log({ token, user, account, profile, isNewUser });
//   return token;
// },
// async redirect({ url, baseUrl }) {
//   console.log('fire redirect Callback');
//   return baseUrl;
// }
