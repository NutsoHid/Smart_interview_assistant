function analyzeBehavior(metrics) {
  if (metrics.filler_word > 8) return "Nervous";
  if (metrics.confidence > 80) return "Confident";
  return "Neutral";
}

export { analyzeBehavior };
