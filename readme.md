# Smart Interview

## Description

Smart Interview is an AI-based interview analysis system designed to evaluate candidate responses using transcript data. The system analyzes communication quality and generates structured metrics such as speaking speed, filler words, technical relevance, confidence, and overall performance score.

## Problem Statement

To develop an AI-based system that analyzes interview responses and provides instant feedback on communication quality, technical relevance, confidence, and speaking performance.

## Features

- Transcript-based interview response analysis
- AI-powered evaluation using Gemini API
- Speaking speed and word count calculation
- Filler word detection
- Technical relevance scoring
- Confidence estimation
- Overall performance scoring

## Workflow

1. Transcript data is received in JSON format.
2. Metrics such as word count and speaking speed are calculated.
3. AI evaluates the response for relevance, confidence, and speaking quality.
4. Final structured JSON output is returned for frontend display.

## Output Example

```json
{
  "word_count": 42,
  "speed_wpm": 126,
  "filler_words": 3,
  "technical_relevance": 8,
  "speaking_quality": 7,
  "confidence": "medium",
  "overall_score": 7.8
}
```

## Tech Stack

- Node.js
- Gemini API
- JavaScript

## Goal

To help candidates receive instant interview feedback and improve communication performance through AI-assisted analysis.

```

```
