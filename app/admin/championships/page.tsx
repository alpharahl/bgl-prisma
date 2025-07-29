import { auth } from "@/auth";
import isAdmin from "@/lib/isAdmin";
import { redirect } from "next/navigation";
import ChampionshipList from "./championship-list";
import { getAllChampionships } from "@/actions/championships";

export default async function ChampionshipsAdminPage() {
  const session = await auth();
  if (!session || !await isAdmin()) {
    redirect("/");
  }

  const championships = await getAllChampionships();

  return (
    <main className="min-h-screen py-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-7 text-gray-900">Championships</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all championships in the system. You can add, edit, or remove championships.
            </p>
          </div>
        </div>
        <div className="mt-8">
          <ChampionshipList championships={championships} />
        </div>
      </div>
    </main>
  );
}
