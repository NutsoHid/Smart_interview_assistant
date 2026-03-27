import apiCall from "./GoogleGemini.js";

const questionGenerate = async (formattedConversation) => {
  const question = await apiCall(`
You are an intelligent interviewer.

Conversation:
${formattedConversation}

Rules:
- Analyze answers deeply
- Generate exactly 1 next question
- Do not repeat previous questions
- Keep it short, natural, conversational
- Output only the question
`);

  return question;
};

export default questionGenerate;
