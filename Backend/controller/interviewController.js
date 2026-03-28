import metrics from "../utils/metrics.js";
import questionGenerate from "../utils/questionGenerate.js";
import { generateFeedback } from "../services/ai.js";
import { generateSuggestions } from "../services/suggestions.js";
import { analyzeBehavior } from "../services/behavior.js";

const fixedQuestions = [
  "Tell me briefly about yourself and your background.",
  "What are your main technical skills or areas of interest?",
  "Describe one project you are currently working on or recently completed.",
];

export const interviewHandler = async (req, res) => {
  try {
    const { answer, duration, conversation = [] } = req.body;

    if (!answer) {
      return res.status(400).json({
        error: "Answer is required",
      });
    }

    let currentQuestion;

    if (conversation.length < fixedQuestions.length) {
      currentQuestion = fixedQuestions[conversation.length];
    } else {
      currentQuestion = conversation[conversation.length - 1].nextQuestion;
    }

    const updatedConversation = [
      ...conversation,
      {
        question: currentQuestion,
        answer,
      },
    ];

    const score = await metrics({
      transcript: answer,
      duration,
    });

    let nextQuestion;

    if (updatedConversation.length < fixedQuestions.length) {
      nextQuestion = fixedQuestions[updatedConversation.length];
    } else {
      const formattedConversation = updatedConversation
        .map(
          (item, index) =>
            `Q${index + 1}: ${item.question}\nA${index + 1}: ${item.answer}`,
        )
        .join("\n");

      nextQuestion = await questionGenerate(formattedConversation);
    }

    updatedConversation[updatedConversation.length - 1].nextQuestion =
      nextQuestion;

    const feedback = await generateFeedback(answer);
    const suggestions = generateSuggestions(score);
    const behavior = analyzeBehavior(score);

    res.json({
      currentQuestion,
      nextQuestion,
      metrics: score,
      feedback,
      suggestions,
      behavior,
      conversation: updatedConversation,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Server error",
    });
  }
};
