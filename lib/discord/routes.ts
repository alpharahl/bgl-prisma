export const getGuildMember = (guildId: string, userId: string) => {
  return `/guilds/${guildId}/members/${userId}`;
}