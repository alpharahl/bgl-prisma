'use client';

import { Championship, Series } from '@prisma/client';
import ChampionshipPage from '@/components/championship';
import { use } from 'react';
import Link from 'next/link';
import Image from 'next/legacy/image';

interface OurLeaguesProps {
  championships: Promise<Championship[]>;
}

export default function OurLeagues({ championships }: OurLeaguesProps) {
  const championshipsList = use(championships);
  return (
    <div className="bg-white/50 p-4 rounded-md flex flex-col gap-4 mt-auto">
      <h1 className="text-primary text-lg md:text-4xl font-bold">Our Championships</h1>
      <ol className=" flex justify-around items-center flex-wrap gap-x-1 gap-y-3 ">
        {championshipsList.map((championship) => (
          <li className="text-lg hover:bg-accent bg-primary text-white hover:text-white p-2 rounded-md" key={championship.id}>
            <Link href={"/championships/" + championship.id}>
              {championship.name}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}