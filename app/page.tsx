import prisma from "@/lib/prisma";
import NewReportForm from "@/app/new-report-form";
import { auth } from '@/auth';
import SignInWithDiscord from "@/components/sign-in-button";

const Page = async () => {
  const [series, session] = await Promise.all([
    prisma.series.findMany({
      include: {
        Event: true,
      },
    }),
    auth(),
  ]);

  return (
    <main className={"max-w-4xl mx-auto w-full flex flex-col gap-5 min-h-screen py-8"}>
      {session?.user ? (
        <>
          <h1 className="text-2xl font-semibold">Submit an Incident Report</h1>
          <NewReportForm series={series} />
        </>
      ) : (
        <div className="flex flex-col items-start gap-4">
          <h1 className="text-2xl font-semibold">Sign in to submit a report</h1>
          <SignInWithDiscord />
        </div>
      )}
    </main>
  );
};

export default Page;