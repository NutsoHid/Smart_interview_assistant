import apiCall from "./GoogleGemini.js"; // keep Gemini
import Groq from "groq-sdk";
import "dotenv/config";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// 🔁 Switch between providers
const USE_GROQ = true; // change to false to use Gemini

async function groqCall(content) {
  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: "Return ONLY valid JSON."
        },
        {
          role: "user",
          content: content
        }
      ],
      temperature: 0.2,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.log("Groq Error:", error.message);
    return null;
  }
}

const metrics = async (data) => {
  if (!data || !data.transcript || !data.duration) {
    return { error: "Invalid input data" };
  }

  const transcript = data.transcript.toLowerCase();
  const words = transcript.trim().split(/\s+/);
  const wordCount = words.length;

  const speedWpm =
    data.duration > 0 ? wordCount / (data.duration / 60) : 0;

  const prompt = `
Return ONLY raw JSON. No markdown. No explanation.

{
  "filler_word": number,
  "technical_relevance": number,
  "speaking": number,
  "confidence": number,
  "overall_score": number
}

All values must be numbers between 0 and 100.

Transcript: "${transcript}"
Duration: ${data.duration} seconds
`;

  // 🔁 Choose provider
  const response = USE_GROQ
    ? await groqCall(prompt)
    : await apiCall(prompt);

  let aiResult = {};

  try {
    const cleaned = (response || "")
      .replace(/```json|```/g, "")
      .replace(/\n/g, "")
      .trim();

    aiResult = JSON.parse(cleaned);
  } catch (error) {
    console.log("JSON Parse Error:", error);

    aiResult = {
      filler_word: 0,
      technical_relevance: 0,
      speaking: 0,
      confidence: 50,
      overall_score: 0,
    };
  }

  return {
    word_count: wordCount,
    speed: Number(speedWpm.toFixed(2)), // ✅ fixed naming
    ...aiResult,
  };
};

export default metrics;