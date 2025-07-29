import axios from "axios";

type discordRequestProps = {
  url: string
}

// Discord Intents
const INTENTS = {
  GUILDS: 1 << 0,
  GUILD_MESSAGES: 1 << 9,
  MESSAGE_CONTENT: 1 << 15,
};

// Calculate total intents
const TOTAL_INTENTS = INTENTS.GUILDS | INTENTS.GUILD_MESSAGES | INTENTS.MESSAGE_CONTENT;

export const discordHeaders = {
  Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
  'X-Discord-Intents': TOTAL_INTENTS.toString()
}

export default async ({url}: discordRequestProps) => {
  const fullUrl = process.env.DISCORD_API_BASE_URL + url;
  console.log('Making Discord request to:', fullUrl);
  const response = await axios(fullUrl, {
    method: "GET",
    headers: discordHeaders
  });
  console.log('Discord response status:', response.status);
  console.log('Discord response data:', JSON.stringify(response.data, null, 2));
  return response;
}