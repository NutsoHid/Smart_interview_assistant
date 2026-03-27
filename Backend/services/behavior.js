function analyzeBehavior(metrics) {
  let behavior = "Neutral";

  if (metrics.filler_word > 8) {
    behavior = "Nervous";
  } else if (metrics.confidence > 80) {
    behavior = "Confident";
  }

  return behavior;
}

export { analyzeBehavior };