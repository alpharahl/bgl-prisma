import {DefaultSession} from "next-auth";
import {DefaultJWT} from "@auth/core/jwt";
import {DefaultUser} from "@auth/core/src/types";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      discordId: string;
      discordUserName: string;
      admin: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    customData: {
      discordId: string;
      discordUserName: string;
    } & DefaultUser;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    customData: {
      discordId: string;
      discordUserName: string;
      admin: boolean;
    } & DefaultJWT
  }
}