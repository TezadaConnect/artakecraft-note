export { default } from 'next-auth/middleware';

export const config = { matcher: ['/dashboard/:path*', '/api/:path*'] };

// import { getToken } from 'next-auth/jwt';
// import { NextRequest, NextResponse } from 'next/server';

// export const middleware = async (req: NextRequest) => {
//   const session = await getToken({
//     req: req,
//     secret: process.env.NEXTAUTH_SECRET
//   });

//   return NextResponse.next();
// };
