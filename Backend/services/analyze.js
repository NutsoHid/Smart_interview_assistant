import express from "express";
const router = express.Router();

import { generateFeedback } from "./ai.js";
import { generateSuggestions } from "./suggestions.js";
import { analyzeBehavior } from "./behavior.js";

router.post("/", async (req, res) => {
  const { transcript, metrics } = req.body;

  if (!transcript || !metrics) {
    return res.status(400).json({ error: "Transcript and metrics required" });
  }

  try {
    const aiFeedback = await generateFeedback(transcript);
    const suggestions = generateSuggestions(metrics);
    const behavior = analyzeBehavior(metrics);

    const fillerPenalty = Math.min(metrics.filler_word * 5, 30);

    const wpmScore =
      metrics.speed >= 120 && metrics.speed <= 160
        ? 100
        : metrics.speed < 120
        ? (metrics.speed / 120) * 100
        : Math.max(0, 100 - (metrics.speed - 160));

    const score = Math.max(
      0,
      Math.min(
        100,
        Math.round(
          metrics.confidence * 0.5 + wpmScore * 0.5 - fillerPenalty
        )
      )
    );

    res.json({
      filler_word: metrics.filler_word,
      speaking: metrics.speaking,
      word_count: metrics.word_count,
      speed: metrics.speed,
      confidence: metrics.confidence,
      score,
      feedback: aiFeedback,
      suggestions,
      behavior,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;