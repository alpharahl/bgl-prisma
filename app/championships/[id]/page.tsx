import { ReactNode } from "react";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface ChampionshipPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function ChampionshipPage({ params }: ChampionshipPageProps): Promise<ReactNode> {
    const resolvedParams = await params;
    const championship = await prisma.championship.findUnique({
        where: {
            id: parseInt(resolvedParams.id)
        }
    });

    if (!championship) {
        notFound();
    }

    const championshipMeta: Record<string, { background: string; logo: string }> = {
        'Formula 4': {
            background: '/F4_Website_Vid.mov',
            logo: '/F4.png'
        }
    };

    const meta = championshipMeta[championship.name];

    return (
        <main className="min-h-screen p-10">
            <div className=" fixed inset-0 h-[100%] bg-cover -z-10  bg-fixed bg-no-repeat">
                <video
                    src={meta.background}
                    autoPlay
                    loop
                    muted
                    // width={400}
                    className="w-full h-full object-cover"
                // height={400}
                />
            </div>
            <div className="bg-white/50 p-4 rounded-md">
                <div className="flex justify-around w-full flex-wrap gap-10 items-center">
                    <div>
                        <Image
                            src={meta.logo}
                            alt={championship.name}
                            width={400}
                            height={400}
                        />
                    </div>
                    <div className="text-center">
                        <h1 className="text-3xl text-primary font-bold">{championship.name}</h1>
                        <div className="text-2xl text-primary">Championship</div>
                        <Link href={"https://discord.com/invite/bwrl"}
                            className={"flex mt-3 bg-primary p-2 rounded-md hover:bg-accent text-white items-center flex-wrap text-2xl gap-4"}>
                            <div>Sign Up To Race</div>

                        </Link>
                    </div>
                </div>

                <p className=" mx-auto mt-4 text-lg  max-w-xl mt-20">
                    {championship.description}
                </p>

            </div>
        </main>
    );
}
