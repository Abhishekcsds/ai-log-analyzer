import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

// ✅ Initialize safely
const genAI = process.env.GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

export const generateInsights = async (content) => {
  try {
    // ✅ Check API key first
    if (!genAI) {
      return "AI disabled (no API key)";
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash" // ✅ FIXED MODEL
    });

    const prompt = `
Analyze this log and return:

1. Summary (1 line)
2. Security risks
3. Key anomalies

Keep response SHORT.

Log:
${content}
`;

    const result = await model.generateContent({
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ]
    });

    const response = result.response;
    return response.text();

  } catch (error) {
    console.error("Gemini Error:", error);
    return "AI temporarily unavailable";
  }
};