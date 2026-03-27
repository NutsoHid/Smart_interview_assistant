import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

async function apiCall(content) {
  try {
    const ai = new GoogleGenAI({});

    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: content,
    });

    return response.text;
  } catch (error) {
    console.log("API Error:", error);
    return null;
  }
}

const metrics = async (data) => {
  if (!data || !data.transcript || !data.duration) {
    return {
      error: "Invalid input data",
    };
  }

  const transcript = data.transcript.toLowerCase();

  const words = transcript.trim().split(/\s+/);
  const wordCount = words.length;

  const speedWpm = wordCount / (data.duration / 60);

  const response = await apiCall(`
Return ONLY raw JSON. No markdown. No explanation.

Evaluate this interview answer:

{
  "filler_words": number,
  "technical_relevance": number,
  "speaking_quality": number,
  "confidence": "low | medium | high",
  "overall_score": number
}

Transcript: "${transcript}"
Duration: ${data.duration} seconds
`);

  let aiResult = {};

  try {
    const cleaned = (response || "").replace(/```json|```/g, "").trim();
    aiResult = JSON.parse(cleaned);
  } catch (error) {
    console.log("JSON Parse Error:", error);

    aiResult = {
      filler_words: 0,
      technical_relevance: 0,
      speaking_quality: 0,
      confidence: "unknown",
      overall_score: 0,
    };
  }

  return {
    word_count: wordCount,
    speed_wpm: Number(speedWpm.toFixed(2)),
    ...aiResult,
  };
};

export default metrics;
