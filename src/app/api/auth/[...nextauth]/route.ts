import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import conn from '@/libs/mysql';
import bcrypt from 'bcryptjs';
import { User as NextAuthUser } from 'next-auth';

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Usuario", type: "text", placeholder: "usuario" },
        password: { label: "Password", type: "password", placeholder: "*****" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Credenciales inválidas');
        }

        try {
          const results = await conn.query(
            'SELECT * FROM user WHERE email = ?',
            [credentials.username]
          );

          console.log('results:::', results);

          if (Array.isArray(results) && results.length > 0) {
            const userFound = results[0];

            if (!userFound) {
              throw new Error('Usuario no encontrado');
            }

            const isValidPassword = bcrypt.compareSync(credentials.password, userFound.password);
            if (!isValidPassword) {
              throw new Error('Contraseña incorrecta');
            }
            console.log('userFound:::', userFound);
            return {
              id: userFound.iduser.toString(),
              email: userFound.email,
              name: userFound.name || null, 
              image: userFound.image || null
            } as NextAuthUser;
          } else {
            throw new Error('Usuario no encontrado');
          }
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(`Error al autenticar: ${error.message}`);
          } else {
            throw new Error('Error desconocido al autenticar');
          }
        }
      }
    })
  ],
  pages: {
    signIn: "/auth/login",
    error: "/auth/error"
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
        };
      }
      return session;
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };