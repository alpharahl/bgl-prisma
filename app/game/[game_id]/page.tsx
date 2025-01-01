import React from 'react';
import {PrismaClient} from "@prisma/client";

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
  return (
    <div>
      <div>Name: {game.name}</div>
      <div>Leagues: {JSON.stringify(game.League)}</div>
    </div>
  )
}

export default Page