import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import conn from '@/libs/mysql';
import bcrypt from 'bcryptjs';
import { User } from '@/interface/login'

const authOptions = {
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
          
          if (Array.isArray(results)) {
            const userFound = results[0] as User; 
            if (!userFound) {
              throw new Error('Usuario no encontrado');
            }
            const isValidPassword = bcrypt.compareSync(credentials.password, userFound.password);
            if (!isValidPassword) {
              throw new Error('Contraseña incorrecta');
            }

            return {
              id: userFound.iduser.toString(),
              username: userFound.email,
              email: userFound.email || null
            };
          } else {
            throw new Error('Error al obtener datos del usuario');
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
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };