import metrics from "../utils/metrics.js";
import questionGenerate from "../utils/questionGenerate.js";

let conversation = [];

const fixedQuestions = [
  "Tell me briefly about yourself and your background.",
  "What are your main technical skills or areas of interest?",
  "Describe one project you are currently working on or recently completed.",
];

export const interviewHandler = async (req, res) => {
  try {
    const { answer, duration } = req.body;

    if (!answer) {
      return res.status(400).json({
        error: "Answer is required",
      });
    }

    let currentQuestion;

    if (conversation.length < fixedQuestions.length) {
      currentQuestion = fixedQuestions[conversation.length];
    } else {
      currentQuestion = conversation[conversation.length - 1].question;
    }

    conversation.push({
      question: currentQuestion,
      answer,
    });

    const score = await metrics({
      transcript: answer,
      duration,
    });

    let nextQuestion;

    if (conversation.length < fixedQuestions.length) {
      nextQuestion = fixedQuestions[conversation.length];
    } else {
      const formattedConversation = conversation
        .map(
          (item, index) =>
            `Q${index + 1}: ${item.question}\nA${index + 1}: ${item.answer}`,
        )
        .join("\n");

      nextQuestion = await questionGenerate(formattedConversation);
    }

    res.json({
      currentQuestion,
      nextQuestion,
      score,
      conversation,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Server error",
    });
  }
};
