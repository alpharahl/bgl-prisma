"use server";

import { parseChampionshipText } from "@/lib/gemini";

export async function parseChampionshipData(text: string, id: number) {
  try {
    const championships = await parseChampionshipText(text, id);
    return { success: true, data: championships };
  } catch (error) {
    console.error("Error parsing championship data:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error occurred" 
    };
  }
}
