
import { signIn } from "@/auth"

export default function SignInWithDiscord() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("discord")
      }}
    >
      <button type="submit">Sign In</button>
    </form>
  )
} 