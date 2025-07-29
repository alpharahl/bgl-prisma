import discordRequest, { discordHeaders } from './discord-request';

export type DiscordMessage = {
  id: string;
  content: string;
  timestamp: string;
  author: {
    id: string;
    username: string;
    global_name: string;
  };
  attachments: {
    id: string;
    url: string;
    filename: string;
  }[];
  embeds: any[];
};

/**
 * Fetches messages from a Discord announcement channel
 * @param channelId The ID of the announcement channel
 * @param limit Optional number of messages to fetch (default: 50, max: 100)
 * @returns Array of messages from the announcement channel
 */
export async function getAnnouncementChannelMessages(channelId: string, limit: number = 50): Promise<DiscordMessage[]> {
  try {
    // Ensure limit is within Discord's constraints
    const messageLimit = Math.min(Math.max(1, limit), 100);
    
    const response = await discordRequest({
      url: `/channels/${channelId}/messages?limit=${messageLimit}`
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching announcement messages:', error);
    throw new Error('Failed to fetch announcement messages');
  }
}

/**
 * Validates if a channel is an announcement channel
 * @param channelId The ID of the channel to check
 * @returns boolean indicating if the channel is an announcement channel
 */
export async function isAnnouncementChannel(channelId: string): Promise<boolean> {
  try {
    const response = await discordRequest({
      url: `/channels/${channelId}`
    });
    
    // type 5 is an announcement channel in Discord's API
    return response.data.type === 5;
  } catch (error) {
    console.error('Error validating announcement channel:', error);
    throw new Error('Failed to validate announcement channel');
  }
}
