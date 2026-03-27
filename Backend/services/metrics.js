import apiCall from "./GoogleGemini.js";

const metrics = async (data) => {
  if (!data || !data.transcript || !data.duration) {
    return {
      error: "Invalid input data",
    };
  }

  const transcript = data.transcript.toLowerCase();

  const words = transcript.trim().split(/\s+/);
  const wordCount = words.length;

  const speedWpm = data.duration > 0 ? wordCount / (data.duration / 60) : 0;

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
    const cleaned = (response || "").replace(/json|/g, "").trim();
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