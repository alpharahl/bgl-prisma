import discordRequest from "@/lib/discord/discord-request";
import {getGuildMember} from "@/lib/discord/routes";

export default async (memberId: string) => {
  const {data: member} = await discordRequest({
    url: getGuildMember(process.env.GUILD_ID!, memberId)
  })
  return member;
}