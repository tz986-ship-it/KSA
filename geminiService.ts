
import { GoogleGenAI, Type } from "@google/genai";
import { Question, KSAPhase, Scorecard } from "./types";

// Always use process.env.API_KEY directly as a named parameter as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateAssessment = async (sector: string, phase: KSAPhase): Promise<Question[]> => {
  const prompt = `Generate 10 tricky multiple-choice questions for a KSA assessment in the sector "${sector}" at the "${phase}" phase. 
  Focus on Knowledge, Skills, and Abilities. 
  Ensure questions are level-appropriate yet challenging.
  Each question must have 4 options and one clear correct answer.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.INTEGER },
            text: { type: Type.STRING },
            options: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
            correctAnswer: { type: Type.INTEGER, description: "Index 0-3" },
            explanation: { type: Type.STRING }
          },
          required: ["id", "text", "options", "correctAnswer", "explanation"]
        }
      }
    }
  });

  try {
    // Access response.text directly (it's a property, not a method)
    return JSON.parse(response.text || "[]");
  } catch (e) {
    console.error("Failed to parse AI response", e);
    return [];
  }
};

export const evaluateAssessment = async (
  sector: string, 
  phase: KSAPhase, 
  questions: Question[], 
  answers: Record<number, number>
): Promise<Scorecard> => {
  let score = 0;
  questions.forEach((q) => {
    if (answers[q.id] === q.correctAnswer) {
      score += 10;
    }
  });

  const passed = score >= 70;

  const prompt = `Based on a score of ${score}/100 in the "${sector}" ${phase} KSA assessment, provide:
  1. A detailed gap analysis (what they missed).
  2. Prescriptions for leveling up (online courses, offline bootcamps/mentoring).
  Format as JSON.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          gapAnalysis: { type: Type.STRING },
          prescriptions: {
            type: Type.OBJECT,
            properties: {
              online: { type: Type.ARRAY, items: { type: Type.STRING } },
              offline: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
          }
        }
      }
    }
  });

  // Access response.text directly (it's a property, not a method)
  const aiResult = JSON.parse(response.text || "{}");

  return {
    assessmentId: Math.random().toString(36).substr(2, 9),
    score,
    passed,
    gapAnalysis: aiResult.gapAnalysis || "Review your basic concepts in the areas of missed questions.",
    prescriptions: aiResult.prescriptions || { online: [], offline: [] }
  };
};
