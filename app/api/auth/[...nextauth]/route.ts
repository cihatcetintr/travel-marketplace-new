import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Burada gerçek bir API çağrısı yapılabilir
        if (credentials?.email === "test@example.com" && credentials?.password === "password") {
          return {
            id: "1",
            email: "test@example.com",
            name: "Test User"
          };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
  },
});

export { handler as GET, handler as POST }; 