import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

async function apiCall(content) {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: content,
    });

    return response.text;
  } catch (error) {
    console.log("API Error:", error);
    return null;
  }
}

export default apiCall;
