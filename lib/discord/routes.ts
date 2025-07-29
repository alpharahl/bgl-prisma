export const getGuildMember = (guildId: string, userId: string) => {
  return `/guilds/${guildId}/members/${userId}`;
}

export const getChannelMessages = (channelId: string) => {
  return `/channels/${channelId}/messages`;
}

export const getChannel = (channelId: string) => {
  return `/channels/${channelId}`;
}