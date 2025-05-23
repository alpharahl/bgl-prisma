import NextAuth from "next-auth"
import Discord from "@auth/core/providers/discord";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Discord({
      authorization: {
        url: "https://discord.com/api/oauth2/authorize",
        params: { scope: "identify email openid" },

      },
      issuer: "https://discord.com",
    })
  ]
})