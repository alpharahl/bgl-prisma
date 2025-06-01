'use server'
import prisma from "@/lib/prisma";
import axios from "@/lib/axios";

export const classifyReport = async (report: String) => {
  'use server'
  const penalties = await prisma.penalty.findMany({})
  console.log('penalties', penalties);
  // await axios.post(
  //   process.env.GEMINI_API_URL,
  //   {
  //
  //   }
  // )
}