import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

async function apiCall(content) {
  try {
    const ai = new GoogleGenAI({});

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: content,
    });

    return response.text;
  } catch (error) {
    console.log("API Error:", error);
    return null;
  }
}

export default apiCall;
