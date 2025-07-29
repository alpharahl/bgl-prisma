import { GoogleGenerativeAI } from "@google/generative-ai";

const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

interface Section {
  name: string;
  bullets: string[];
}

interface ChampionshipSection {
  name: string;
  description: string;
  requirements?: string[];
  schedule?: string;
  sections?: Section[];
}

export async function parseChampionshipText(text: string, championshipId: number): Promise<ChampionshipSection[]> {
  const model = gemini.getGenerativeModel({ model: "gemini-2.0-flash", generationConfig: {
    responseMimeType: "application/json",
    
  }});

  const prompt = `Parse the following text into championship sections. For each championship, extract:
  - Name of the championship
  - Description
  - Schedule (if any)
  - Sections (remaining sections)
  
  Instead of returning <#960689728095682610> return "Sporting Regulations"

  Return the data in a structured format that can be parsed as JSON. Format:
  [
    {
      "name": "Championship Name",
      "description": "Description text",
      "schedule": "Schedule text",
      "sections": [{
        "name": "Section Name",
        "bullets": ["html formatted bullet 1", "html formatted bullet 2"]
      }]
    }
  ]
  
  Text to parse:
  ${text}`;

  try {
    // console.log("Calling Gemini API with prompt:", prompt);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log("Parsed text:", text);
    try {
      return JSON.parse(text);
    } catch (e) {
      console.error("Failed to parse Gemini response as JSON:", e);
      throw new Error("Failed to parse championship sections");
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
}
