import "dotenv/config";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function generateFeedback(transcript) {
  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `You are a strict  technical interviewer reviewing a candidate's answer.
Be direct, critical, and professional. Do not sugarcoat.

Return ONLY raw JSON in exactly this structure. No markdown. No explanation. No extra text.

{
  "key_points": [
    "point 1",
    "point 2", 
    "point 3",
    "point 4"
  ],
  "Feedback": "A direct paragraph pointing out what was weak, what was missing, and exactly what the candidate should work on to meet high class  standards."
}

Rules:
- key_points: exactly 3-4 sentences, each highlighting a main topic or concept from the answer
- improvements: one solid paragraph, strict and specific, no fluff`,
        },
        {
          role: "user",
          content: `Transcript: "${transcript}"`,
        },
      ],
      temperature: 0.3,
    });

    const text = response.choices[0].message.content;

    console.log("Raw AI response:", text);

    const cleaned = (text || "").replace(/```json|```/g, "").trim();

    return JSON.parse(cleaned);
  } catch (error) {
    console.log("Groq Error:", error.message);
    return ["Feedback unavailable."];
  }
}

export { generateFeedback };
