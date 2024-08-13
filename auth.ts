import NextAuth from "next-auth";
import EntraIDProvider from "next-auth/providers/microsoft-entra-id";

import { getUserProfile } from "@/lib/profile";
import { getEnv } from "./lib/utils";
import { PostPermissionsResponse } from "./app/api/permissions/route";

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
    // Check if user is on official roster and authorized to access
    async signIn({ profile }) {
      if (!profile?.email) {
        console.error("Email does not exist in profile");
        return false;
      }

      const isAuthorized = await fetch(
        `${process.env.APP_URL}/api/permissions`,
        {
          method: "POST",
          body: JSON.stringify({
            email: profile.email,
          }),
        },
      )
        .then((response) => response.json())
        .then((response) => response.isAuthorized);

      console.debug(isAuthorized ? "User authorized" : "User not authorized");

      return isAuthorized;
    },
    // Add extra properties to the JWT token
    async jwt({ token, user, account, profile }) {
      if (user) {
        // Fetch additional user data from Microsoft Graph
        const graphProfile = await getUserProfile(
          account?.access_token as string,
        );

        // Get user role
        const role = await fetch(`${process.env.APP_URL}/api/permissions`, {
          method: "POST",
          body: JSON.stringify({
            email: user.email,
          }),
        })
          .then((response) => response.json())
          .then((response: PostPermissionsResponse) => response?.data?.role);

        // Enrich token with user details
        token.user = {
          name: user.name,
          email: user.email,
          image: user.image,
          nuid: graphProfile.nuid,
          role: role || "member",
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
