import React from 'react';
import {PrismaClient} from "@prisma/client";
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
const Page = async ({params}: {params: {game_id: string}}) => {
  const prisma = new PrismaClient();
  const game = await prisma.game.findUniqueOrThrow({
    where: {
      id: parseInt(params.game_id)
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
      {game.logo && <img src={`data:image/jpeg;base64,${arrayBufferToBase64(game.logo)}`}/>}
    </div>
  )
}

export default Page