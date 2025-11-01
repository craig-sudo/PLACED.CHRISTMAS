import { GoogleGenAI } from "@google/genai";
import { ServiceType } from '../types';

// Singleton instance to avoid reinitializing for every call
let aiInstance: GoogleGenAI | null = null;

interface GeneratedContent {
  success: boolean;
  content: string;
  model: string;
  timestamp: number;
}

interface MockupPromptConfig {
  lightingStyle: "classic" | "modern" | "custom";
  colorScheme: string;
  roofLinearFeet: number;
  homeSize: string;
}

/**
 * Initialize Gemini AI with lazy loading pattern
 * Prevents multiple initializations and handles missing API keys gracefully
 */
const getAIInstance = (): GoogleGenAI | null => {
  if (aiInstance) return aiInstance;

  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    console.error("❌ API_KEY environment variable not set");
    return null;
  }

  try {
    aiInstance = new GoogleGenAI({ apiKey });
    console.log("✅ Gemini AI initialized successfully");
    return aiInstance;
  } catch (error) {
    console.error("❌ Failed to initialize Gemini AI:", error);
    return null;
  }
};

/**
 * Generate personalized follow-up message for quote requests
 * Used in confirmation emails and quote callback
 */
export const generateFollowUpMessage = async (
  service: ServiceType,
  customerName?: string
): Promise<GeneratedContent> => {
  const ai = getAIInstance();
  
  const fallbackMessage = `Thank you for your request! We've received your details and will be in touch within 24 hours to finalize your quote. We look forward to working with you!`;

  if (!ai) {
    return {
      success: false,
      content: fallbackMessage,
      model: "fallback",
      timestamp: Date.now(),
    };
  }

  const greetingName = customerName ? `, ${customerName.split(" ")[0]}` : "";

  const prompt = `Generate a short, friendly, and reassuring follow-up message for a potential customer${greetingName} who just requested a quote for our "${service}" service. 

Company: PLACED (Your Christmas, Our Hands) — Premium Christmas light installation, gutter cleaning, and roof inspections in Quispamsis/Saint John, NB.

Requirements:
- Tone: Professional, welcoming, confidence-inspiring
- Length: Under 60 words
- Include: We've received their request, will contact within 24 hours, thank you
- End with: "We look forward to creating holiday magic at your home!"

Generate ONLY the message, no quotes or formatting.`;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    const textContent = response.text.trim();

    return {
      success: true,
      content: textContent || fallbackMessage,
      model: "gemini-2.5-flash",
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error("❌ Error generating follow-up message:", error);
    return {
      success: false,
      content: fallbackMessage,
      model: "fallback",
      timestamp: Date.now(),
    };
  }
};

/**
 * Generate AI-powered DALL-E mockup prompt from customer property details
 * Used by admin to quickly generate custom light design mockups
 */
export const generateMockupPrompt = async (
  config: MockupPromptConfig,
  propertyAddress?: string
): Promise<GeneratedContent> => {
  const ai = getAIInstance();

  const fallbackPrompt = `Create a photorealistic mockup of professional Christmas light installation on a residential home. Show warm white LED lights evenly spaced along rooflines and peaks, with professional landscape lighting. Style: ${config.lightingStyle}. Colors: ${config.colorScheme}.`;

  if (!ai) {
    return {
      success: false,
      content: fallbackPrompt,
      model: "fallback",
      timestamp: Date.now(),
    };
  }

  const addressContext = propertyAddress ? `Address/style: ${propertyAddress}` : "";
  const prompt = `Create a detailed DALL-E 3 prompt for generating a photorealistic mockup of Christmas light installation.

Property Details:
- Home Size: ${config.homeSize}
- Roof Linear Feet: ${config.roofLinearFeet} ft
- Lighting Style: ${config.lightingStyle}
- Color Scheme: ${config.colorScheme}
${addressContext}

DALL-E Prompt Requirements:
- Photorealistic rendering (NOT cartoon or illustration)
- Professional LED lights, evenly spaced (12-18 inches apart)
- Lights follow architectural lines precisely
- Warm glow, no harsh shadows
- Snowy winter evening setting
- Clear view of entire home facade
- Street view perspective
- Premium installation quality (NOT amateur)

Generate ONLY a concise, highly detailed DALL-E prompt (max 150 words). No explanations or meta-commentary.`;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    const textContent = response.text.trim();

    return {
      success: true,
      content: textContent || fallbackPrompt,
      model: "gemini-2.5-flash",
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error("❌ Error generating mockup prompt:", error);
    return {
      success: false,
      content: fallbackPrompt,
      model: "fallback",
      timestamp: Date.now(),
    };
  }
};

/**
 * Generate AI FAQ responses from handbookData
 * Used by chatbot to answer common customer questions
 */
export const generateChatbotResponse = async (
  userQuestion: string,
  context?: string
): Promise<GeneratedContent> => {
  const ai = getAIInstance();

  const fallbackResponse =
    "Thanks for your question! Please contact our team at hello@placed.services or call (506) 123-XMAS for more details.";

  if (!ai) {
    return {
      success: false,
      content: fallbackResponse,
      model: "fallback",
      timestamp: Date.now(),
    };
  }

  const prompt = `You are a helpful customer service AI for PLACED, a premium Christmas light installation, gutter cleaning, and roof inspection company in New Brunswick, Canada.

Company Info:
- Service Area: Quispamsis, Rothesay, Saint John, NB
- Services: Christmas lights (rental/purchase), gutter cleaning, drone roof inspections
- Tagline: "Your Christmas, Our Hands"
- Insurance: $2M+ General Liability
- Quality: Premium, full-service, worry-free

Customer Question: "${userQuestion}"
${context ? `Context: ${context}` : ""}

Respond in 2-3 sentences, friendly and professional. If you don't know, suggest contacting the team directly. Keep it conversational.`;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    const textContent = response.text.trim();

    return {
      success: true,
      content: textContent || fallbackResponse,
      model: "gemini-2.5-flash",
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error("❌ Error generating chatbot response:", error);
    return {
      success: false,
      content: fallbackResponse,
      model: "fallback",
      timestamp: Date.now(),
    };
  }
};

/**
 * Batch generate content (for admin workflows)
 * Useful for creating multiple mockup prompts or follow-ups at once
 */
export const generateBatchContent = async (
  prompts: string[]
): Promise<GeneratedContent[]> => {
  const ai = getAIInstance();

  if (!ai || prompts.length === 0) {
    return prompts.map((prompt) => ({
      success: false,
      content: prompt,
      model: "fallback",
      timestamp: Date.now(),
    }));
  }

  try {
    const results = await Promise.all(
      prompts.map(async (prompt) => {
        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });
          const textContent = response.text.trim();

          return {
            success: true,
            content: textContent,
            model: "gemini-2.5-flash",
            timestamp: Date.now(),
          };
        } catch (error) {
          console.error("Error processing prompt:", error);
          return {
            success: false,
            content: prompt,
            model: "fallback",
            timestamp: Date.now(),
          };
        }
      })
    );

    return results;
  } catch (error) {
    console.error("❌ Batch generation error:", error);
    return prompts.map((prompt) => ({
      success: false,
      content: prompt,
      model: "fallback",
      timestamp: Date.now(),
    }));
  }
};

/**
 * Health check for Gemini AI service
 * Used in admin dashboard to monitor integration status
 */
export const checkGeminiHealth = async (): Promise<{
  status: "healthy" | "degraded" | "offline";
  message: string;
  timestamp: number;
}> => {
  const ai = getAIInstance();

  if (!ai) {
    return {
      status: "offline",
      message: "Gemini AI not initialized (missing API key)",
      timestamp: Date.now(),
    };
  }

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: "Say 'OK' only.",
    });
    const text = response.text.trim();

    if (text.includes("OK")) {
      return {
        status: "healthy",
        message: "Gemini API responding normally",
        timestamp: Date.now(),
      };
    } else {
      return {
        status: "degraded",
        message: "Gemini API responding but output unexpected",
        timestamp: Date.now(),
      };
    }
  } catch (error) {
    console.error("❌ Gemini health check failed:", error);
    return {
      status: "offline",
      message: `Gemini API error: ${error instanceof Error ? error.message : "Unknown"}`,
      timestamp: Date.now(),
    };
  }
};
