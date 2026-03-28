import Groq from "groq-sdk";
import "dotenv/config";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const metrics = async (data) => {
  if (!data || !data.transcript || data.duration === undefined) {
    return { error: "Invalid input data" };
  }

  const transcript = data.transcript.toLowerCase();
  const words = transcript.trim().split(/\s+/);
  const wordCount = words.length;

  const speedWpm = data.duration > 0 ? wordCount / (data.duration / 60) : 0;

  const prompt = `
Return ONLY raw JSON.

{
  "filler_word": number,
  "technical_relevance": number,
  "speaking": number,
  "confidence": number,
  "overall_score": number
}

Transcript: "${transcript}"
Duration: ${data.duration} seconds
`;

  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: "Return ONLY valid JSON.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.2,
    });

    const cleaned = response.choices[0].message.content
      .replace(/```json|```/g, "")
      .replace(/\n/g, "")
      .trim();

    const aiResult = JSON.parse(cleaned);

    return {
      word_count: wordCount,
      speed: Number(speedWpm.toFixed(2)),
      ...aiResult,
    };
  } catch {
    return {
      word_count: wordCount,
      speed: Number(speedWpm.toFixed(2)),
      filler_word: 0,
      technical_relevance: 0,
      speaking: 0,
      confidence: 50,
      overall_score: 0,
    };
  }
};

export default metrics;
