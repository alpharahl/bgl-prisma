import { auth } from "@/auth";
import { redirect } from "next/navigation";
import isAdmin from "@/lib/isAdmin";
import AnnouncementList from "./announcement-list";

export default async function AnnouncementsPage() {
  const session = await auth();
  
  if (!session?.user || !isAdmin()) {
    redirect("/");
  }

  return (
    <main className="min-h-screen container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-8">Discord Announcements</h1>
      <AnnouncementList />
    </main>
  );
}
