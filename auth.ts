import NextAuth from "next-auth";
import EntraIDProvider from "next-auth/providers/microsoft-entra-id";

import { getUserProfile } from "@/lib/profile";
import { getEnv } from "./lib/utils";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    EntraIDProvider({
      clientId: getEnv("AUTH_MICROSOFT_ENTRA_ID_ID"),
      clientSecret: getEnv("AUTH_MICROSOFT_ENTRA_ID_SECRET"),
      tenantId: getEnv("AUTH_MICROSOFT_ENTRA_ID_TENANT_ID"),
      authorization: {
        params: {
          scope: "openid email profile User.Read",
        },
      },
    }),
  ],
  callbacks: {
    // Add extra properties to the JWT token
    async jwt({ token, user, account, profile }) {
      if (user) {
        // Fetch additional user data from Microsoft Graph
        const graphProfile = await getUserProfile(
          account?.access_token as string
        );

        // Fetch additional user data from Microsoft Graph
        // const isAdmin = await fetchIsAdmin(user.email as string);

        // Enrich token with user details
        token.user = {
          name: user.name,
          email: user.email,
          image: user.image,
          nuid: graphProfile.nuid,
          isAdmin: true,
        };
      }
      return token;
    },
    session({ session, token }) {
      if (!token.user) throw new Error("No user data");

      // Add properties to session
      session.user = token.user as any;

      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
});
