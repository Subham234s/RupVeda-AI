
import { GoogleGenAI, Modality, Part } from "@google/genai";
import { GenerationSettings } from "../types";

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateAvatar = async (prompt: string, imagePart: Part, settings: GenerationSettings) => {
    const { aspectRatio, styleIntensity, negativePrompt } = settings;

    let intensityDescription = 'a balanced artistic interpretation';
    if (styleIntensity <= 25) {
      intensityDescription = 'a subtle artistic interpretation, staying very close to the original photo structure';
    } else if (styleIntensity >= 75) {
      intensityDescription = 'a vivid and highly stylized artistic interpretation, taking creative liberties';
    }

    let fullPrompt = `Based on the user's photo, create a new artistic image in the following style: "${prompt}".
The image should have an aspect ratio of ${aspectRatio}.
The style should be applied with ${intensityDescription}.`;

    if (negativePrompt.trim()) {
      fullPrompt += `\nCRITICAL: Avoid including the following elements: "${negativePrompt}".`;
    }

    fullPrompt += `\nThe output must be an image only. Do not include any text, borders, or annotations on the image.`;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
            parts: [
                imagePart,
                { text: fullPrompt },
            ],
        },
        config: {
            responseModalities: [Modality.IMAGE],
        },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
            return part.inlineData.data;
        }
    }
    return null;
  } catch (error) {
    console.error("Error generating avatar:", error);
    throw new Error("Failed to generate avatar with Gemini API.");
  }
};