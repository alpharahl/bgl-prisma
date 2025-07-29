'use server'

import { auth } from "@/auth";
import isAdmin from "@/lib/isAdmin";
import { getAnnouncementChannelMessages, isAnnouncementChannel, type DiscordMessage } from "@/lib/discord/announcements";

export async function fetchAnnouncements(channelId: string): Promise<DiscordMessage[]> {
  const session = await auth();
  
  if (!session || !session.user) {
    throw new Error('Unauthorized');
  }

  try {
    // Validate the channel first
    const isValidChannel = await isAnnouncementChannel(channelId);
    if (!isValidChannel) {
      throw new Error('Invalid announcement channel');
    }

    // Fetch messages
    const messages = await getAnnouncementChannelMessages(channelId);
    return messages;
  } catch (error) {
    console.error('Error fetching announcements:', error);
    throw new Error('Failed to fetch announcements');
  }
}
