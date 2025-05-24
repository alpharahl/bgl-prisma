import axios from "@/lib/axios";


export default async () => {
  const roles = await axios(
    `/guilds/${process.env.GUILD_ID}/roles`,
    {
      method: 'GET'
    },
  )
  console.log('roles', roles);
}