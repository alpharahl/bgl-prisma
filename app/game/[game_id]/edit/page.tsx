
import React from 'react';
import Edit from "@/app/game/[game_id]/edit/edit";
import {PrismaClient} from "@prisma/client";

import {handler} from "./actions";

const Page = async ({params}: {params: {game_id: string}}) => {
  const prisma = new PrismaClient();
  const game = await prisma.game.findUniqueOrThrow({
    where: {
      id: parseInt(params.game_id)
    }
  })


  console.log(game)
  return (
    <div>
      <Edit game={game} handler={handler} />
    </div>
  )
}

export default Page