import {signOut} from "@/auth";

export async function signOutAction() {
  "use server"; // This tells Next.js that this is a server action
  await signOut({
    redirect: true,
    redirectTo: "/",
  });
}

const signOutButton = () => {
  return (
    <form
      action={signOutAction}
    >
      <button type="submit">Sign Out</button>
    </form>
  )
}

export default signOutButton