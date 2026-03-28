import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const questionGenerate = async (formattedConversation) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
You are an interviewer.

Conversation:
${formattedConversation}

Generate exactly one next technical interview question.
Output only question.
`,
    });

    return response.text || "Can you explain further?";
  } catch {
    return "Can you explain further?";
  }
};

export default questionGenerate;
