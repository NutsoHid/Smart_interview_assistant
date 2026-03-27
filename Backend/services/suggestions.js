function generateSuggestions(metrics) {
  let suggestions = [];

  if (metrics.filler_word > 5) {
    suggestions.push("Reduce filler words like 'um', 'uh', 'like'.");
  }

  if (metrics.speed > 160) {
    suggestions.push("Speak slower for better clarity.");
  }

  if (metrics.speed < 100) {
    suggestions.push("Try to speak a bit faster to maintain engagement.");
  }

  if (metrics.confidence < 60) {
    suggestions.push("Work on confidence — speak clearly and firmly.");
  }

  if (suggestions.length === 0) {
    suggestions.push("Great performance! Keep it up!");
  }
  return suggestions;
}

export { generateSuggestions };