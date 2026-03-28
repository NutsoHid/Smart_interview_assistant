import Groq from "groq-sdk";
import "dotenv/config";

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
          content: `
Return ONLY JSON:

{
  "key_points": ["point1","point2","point3"],
  "improvements": "paragraph"
}
`,
        },
        {
          role: "user",
          content: transcript,
        },
      ],
    });

    return JSON.parse(
      response.choices[0].message.content.replace(/```json|```/g, "").trim(),
    );
  } catch {
    return {
      key_points: [],
      improvements: "Feedback unavailable.",
    };
  }
}

export { generateFeedback };
