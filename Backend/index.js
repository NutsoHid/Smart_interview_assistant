import express from "express";
import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.listen(process.env.PORT || 3000, (req, res) => {
  console.log(`Server started at ${process.env.PORT}`);
});

try {
  const ai = new GoogleGenAI({});
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "1+1",
  });

  console.log(response.text);
} catch (error) {
  console.log(error);
}
