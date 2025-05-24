import axios from "axios";

type discordRequestProps = {
  url: string
}

export const discordHeaders = {
  Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`
}

export default async ({url}: discordRequestProps) => {
  console.log(process.env.DISCORD_API_BASE_URL + url)
  return await axios(process.env.DISCORD_API_BASE_URL + url, {
    method: "GET",
    headers: discordHeaders
  })
}