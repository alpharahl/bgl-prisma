
import React, {ReactNode} from 'react';
import Edit from "@/app/game/[game_id]/edit/edit";
import {PrismaClient} from "@prisma/client";

import {handler} from "./actions";
import prisma from "@/lib/prisma";

type editProps = {
  params: Promise<{
    game_id: string
  }>
}

const Page = async ({params}: editProps) => {
  const game_id = (await params).game_id;
  const game = await prisma.game.findUniqueOrThrow({
    where: {
      id: parseInt(game_id)
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