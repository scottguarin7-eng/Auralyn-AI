// FILE: src/app/api/chat/route.ts

import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    const model = process.env.GEMINI_MODEL || "gemini-3.8-flash";

    if (!apiKey) {
      return NextResponse.json(
        {
          error: "Missing GOOGLE_GENERATIVE_AI_API_KEY",
        },
        { status: 500 },
      );
    }

    const body = await request.json();

    const messages = body.messages as Array<{
      role: "user" | "assistant";
      content: string;
    }>;

    const conversation = messages
      .slice(-12)
      .map((message) => `${message.role}: ${message.content}`)
      .join("

");

    const ai = new GoogleGenAI({
      apiKey,
    });

    const response = await ai.models.generateContent({
      model,
      contents: `
You are Auralyn AI, a helpful assistant for developers and creators.

Answer clearly, accurately, and practically.
Use Markdown when useful.
If uncertain, say so.

Conversation:
${conversation}
`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 1800,
      },
    });

    return NextResponse.json({
      text: response.text || "No response generated.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "AI request failed",
      },
      { status: 500 },
    );
  }
}
