function generateSuggestions(metrics) {
  let suggestions = [];

  if (metrics.filler_word > 5) suggestions.push("Reduce filler words.");
  if (metrics.speed > 160) suggestions.push("Speak slower.");
  if (metrics.speed < 100) suggestions.push("Speak slightly faster.");
  if (metrics.confidence < 60) suggestions.push("Improve confidence.");

  if (suggestions.length === 0) {
    suggestions.push("Good performance.");
  }

  return suggestions;
}

export { generateSuggestions };
