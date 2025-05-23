// /app/api/analyze-flight/route.ts
import { NextResponse } from "next/server"
import { OpenAI } from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  const { chartData } = await req.json()

  const prompt = `
You're a flight analyst. Here's the telemetry data over time (each second):
${chartData.map(d => `Pitch: ${d.pitch}, Roll: ${d.roll}, Speed: 0, Yaw: ${d.yaw}`).join("\n")}

Analyze the performance, point out any anomalies, and give a summary of flight behavior.
`

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
  })

  return NextResponse.json({ analysis: response.choices[0].message.content })
}
