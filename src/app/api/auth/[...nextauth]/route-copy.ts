import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import db from '@/libs/db';

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Usuario", type: "text", placeholder: "usuario" },
        password: { label: "Password", type: "password", placeholder: "*****" }
      },
      async authorize(credentials) {
        const userFound = await db.user.findUnique({
          where: {
            username: credentials?.username
          }
        });
        if (!userFound) throw new Error('Usuario no encontrado');
        console.log({ userFound });
        if (credentials?.password !== userFound.password) return null;

        return {
          id: userFound.idUser.toString(),
          username: userFound.username,
          email: userFound.email || null
        };
      }
    })
  ],
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
