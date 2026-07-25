const express = require("express");
const Groq = require("groq-sdk");

const { trace, context } = require("@opentelemetry/api");

const tracer = trace.getTracer("interviewiq");
const router = express.Router();


router.post("/evaluate", async (req, res) => {
  if (!process.env.GROQ_API_KEY) {
  throw new Error("GROQ_API_KEY is missing");
}

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});
  const mainSpan = tracer.startSpan("Evaluate Interview");

  await context.with(trace.setSpan(context.active(), mainSpan), async () => {
    try {
    const { question, answer } = req.body;
const promptSpan = tracer.startSpan("Build Prompt");
    const prompt = `
You are an expert technical interviewer.

Evaluate the candidate's answer VERY STRICTLY.

Question:
${question}

Candidate Answer:
${answer}

Instructions:

- Judge ONLY based on correctness.
- Compare the answer against the expected answer for the question.
- Ignore answer length.
- Ignore grammar mistakes unless they affect meaning.
- A one-word answer can receive a high score ONLY if it completely answers the question.
- If the answer is incorrect, unrelated, or factually wrong, give a score between 0 and 10.
- Greetings such as "Hi", "Hello", "Nothing", "Okay", "Thanks", "I don't know" should receive 0.
- If the answer is partially correct, give 20-60.
- If the answer is mostly correct but misses some important points, give 60-85.
- If the answer is technically correct, complete, and well explained, give 85-100.
- Do NOT reward long answers if they are incorrect.
- Be a strict interviewer.

Return ONLY valid JSON.

{
  "score": 0,
  "strengths": [],
  "weaknesses": [],
  "feedback": ""
}
`;
promptSpan.end();
    const groqSpan = tracer.startSpan("Call Groq AI");
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3,
    });
groqSpan.end();
    const text = response.choices[0].message.content || "";

    console.log("Groq Response:", text);
const parseSpan = tracer.startSpan("Parse Response");
    const cleanText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const result = JSON.parse(cleanText);
parseSpan.end();


const returnSpan = tracer.startSpan("Return Result");

    res.json(result);
returnSpan.end();
      } catch (error) {
      mainSpan.recordException(error);

      console.error("Evaluation Error:", error);

      res.status(500).json({
        success: false,
        error: "AI evaluation failed",
      });
    } finally {
      mainSpan.end();
    }
  });
});

module.exports = router;