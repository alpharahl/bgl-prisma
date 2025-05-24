import axios from 'axios';
import {discordHeaders} from "@/lib/discord/discord-request";

axios.defaults.baseURL = process.env.DISCORD_API_BASE_URL;
axios.defaults.headers.options = discordHeaders;

export default axios;