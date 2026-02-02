import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateArchitectResponse = async (userPrompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: `You are the AI digital twin of a Master Web Architect. 
        Your persona is sophisticated, minimalist, and visionary. 
        You speak in the style of Swiss design manifestos mixed with cyberpunk futurism. 
        Keep responses concise, enigmatic but helpful. 
        You are embedded in a portfolio website featuring a Möbius strip logic.
        Refer to the user as "Traveler" or "Visionary".`,
      }
    });
    
    return response.text || "The system is recalibrating...";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Signal lost due to atmospheric interference.";
  }
};