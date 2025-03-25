import {iracingAuth} from "@/utils/iracing/auth";

export const GET = async () => {
  await iracingAuth();
}