import NextAuth from "next-auth"
import Discord from "@auth/core/providers/discord";
import axios from "@/lib/axios";
import getMember from "@/lib/discord/api/guild/get-member";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Discord({
      profile(profile) {
        if (profile.avatar === null) {
          const defaultAvatarNumber =
            profile.discriminator === "0"
              ? Number(BigInt(profile.id) >> BigInt(22)) % 6
              : parseInt(profile.discriminator) % 5
          profile.image_url = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`
        } else {
          const format = profile.avatar.startsWith("a_") ? "gif" : "png"
          profile.image_url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`
        }

        return {
          id: profile.id,
          name: profile.global_name ?? profile.username,
          email: profile.email,
          image: profile.image_url,
          customData: {
            discordId: profile.id,
            discordUserName: profile.username
          }
        }
      },
      authorization: {
        url: "https://discord.com/api/oauth2/authorize",
        params: { scope: "identify email openid" },
      },
      issuer: "https://discord.com",
    })
  ],

  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        if (!user.email) {
          throw new Error("Invalid User Account");
        }

        const member = await getMember(user.customData.discordId)
        const admin = !!member?.roles?.includes(process.env.WEB_ROLE_ID)
        token.customData = {
          discordId: user.customData.discordId,
          discordUserName: user.customData.discordUserName,
          admin,
        };
      }

      return token;
    },
    session: ({ session, token }) => {
      session.user.discordId = token.customData?.discordId;
      session.user.discordUserName = token.customData?.discordUserName;
      session.user.admin = token.customData?.admin;
      return session;
    },
  }
})