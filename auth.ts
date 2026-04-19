import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { compare, hash } from "bcryptjs";
import { createUser, getUserByEmail } from "@/lib/users";

const adminEmails = process.env.ADMIN_EMAILS?.split(",").map((email) => email.trim().toLowerCase()) ?? [];

const providers = [
  Credentials({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      const email = credentials?.email?.toString().toLowerCase().trim();
      const password = credentials?.password?.toString() ?? "";

      if (!email || !password) return null;

      const user = await getUserByEmail(email);
      if (!user) return null;

      const isValid = await compare(password, user.password);
      if (!isValid) return null;

      return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role ?? (adminEmails.includes(email) ? "admin" : "user"),
        image: user.image,
      };
    },
  }),
];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  );
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  pages: {
    signIn: "/auth",
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },
  cookies: {
    sessionToken: {
      name: "bagcase.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  callbacks: {
    async signIn({ user }) {
      if (user?.email) {
        const email = user.email.toLowerCase();
        const existing = await getUserByEmail(email);
        if (!existing) {
          await createUser({
            name: user.name ?? "BagCase User",
            email,
            password: await hash(Math.random().toString(36), 10),
            role: adminEmails.includes(email) ? "admin" : "user",
            provider: "google",
          });
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role =
          (user as { role?: string; email?: string }).role ??
          (token.email && adminEmails.includes(token.email.toLowerCase()) ? "admin" : "user");
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = (token.role as string) ?? "user";
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
