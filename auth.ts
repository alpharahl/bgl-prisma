import NextAuth from "next-auth"
import Discord from "@auth/core/providers/discord";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Discord(
      {
        clientId: process.env.NEXT_PRIVATE_AUTH_DISCORD_ID,
        clientSecret: process.env.NEXT_PRIVATE_AUTH_DISCORD_SECRET,
      })
  ],
  secret: process.env.NEXT_PRIVATE_AUTH_SECRET,
})