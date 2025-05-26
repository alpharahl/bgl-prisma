import {Session} from "next-auth";
import getMember from "@/lib/discord/api/guild/get-member";
import {auth} from "@/auth";

export default async () => {
  const session = await auth();
  if (!session?.user?.discordId){return false};
  const member = await getMember(session?.user.discordId!);
  if (!member){return false};
  if (member.roles.includes(process.env.WEB_ROLE_ID)){
    return true;
  }
  return false;
}