import React, {ReactNode} from 'react';
import {PrismaClient, Game} from "@prisma/client";
import {arrayBufferToString} from "next/dist/server/app-render/encryption-utils";
function arrayBufferToBase64(buffer: Uint8Array) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const length = bytes.length;

  for (let i = 0; i < length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return btoa(binary);
}

type pageProps = {
  params: Promise<{
    game_id: string
  }>
}
const Page = async ({params}: pageProps): Promise<ReactNode> => {
  const prisma = new PrismaClient();
  const game_id = (await params).game_id;
  const game = await prisma.game.findUniqueOrThrow({
    where: {
      id: parseInt(game_id)
    },
    include: {
      League: true
    }
  })
  console.log(game)
  return (
    <div>
      <div>Name: {game.name}</div>
      <div>Leagues: {JSON.stringify(game.League)}</div>

    </div>
  )
}

export default Page