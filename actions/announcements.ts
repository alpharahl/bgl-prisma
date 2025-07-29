'use server'

import { auth } from "@/auth";
import isAdmin from "@/lib/isAdmin";
import { getAnnouncementChannelMessages, isAnnouncementChannel, type DiscordMessage } from "@/lib/discord/announcements";
import { parse } from "path";
import { parseChampionshipData } from "./parseChampionship";
import prisma from "@/lib/prisma";

export async function fetchAnnouncements(channelId: string, championshipId: number): Promise<void> {
  'use server'
  const session = await auth();
  
  if (!session || !session.user) {
    throw new Error('Unauthorized');
  }

  if (await !isAdmin()) {
    throw new Error('Access denied');
  }

  try {
    // Validate the channel first
    // const isValidChannel = await isAnnouncementChannel(channelId);
    // if (!isValidChannel) {
    //   throw new Error('Invalid announcement channel');
    // }

    // Fetch messages
    const messages = await getAnnouncementChannelMessages(channelId);
    // console.log('Discord messages:', JSON.stringify(messages, null, 2));
    const text = messages.flatMap(message => {
      return message.content
    });
    const res = await parseChampionshipData(text.join('\n'), championshipId);
    console.log('Parsed championship data:', res);
    //@ts-ignore
    await prisma.championship.update({
      where: { id: championshipId },
      data: {
        //@ts-ignore
        sections: res.data?.sections || null,
        //@ts-ignore
        description: res.data?.description || null,
        //@ts-ignore
        schedule: res.data?.schedule || null
      }
    })
  } catch (error) {
    console.error('Error fetching announcements:', error);
    throw new Error('Failed to fetch announcements');
  }
}
