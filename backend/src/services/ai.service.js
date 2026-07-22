import Groq from "groq-sdk";
import { interviewReportSchema } from "../validators/interviewReport.validator.js";
import puppeteer from "puppeteer";
import z from "zod";
// interviewReportSchema
export const generateInterviewReport = async ({
  jobDescription,
  selfDescription,
  resume,
}) => {
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });
  const prompt = `
    You are an expert interview coach.
    Job Description: ${jobDescription}
    Resume: ${resume}
    Self Description: ${selfDescription}
  follow this schema:
  ${JSON.stringify(z.toJSONSchema(interviewReportSchema), null, 2)}
    `;
  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    response_format: {
      type: "json_object",
    },
  });
  const rawResult = JSON.parse(response.choices[0].message.content || "{}");
  const result = interviewReportSchema.parse(rawResult);
  return result;
};
export const generatePdfFromHtml = async ({ htmlContent }) => {
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/google-chrome",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: "networkidle0" });
  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true, 
    margin: {
      top: "20mm",
      bottom: "20mm",
      left: "15mm",
      right: "15mm",
    },
  });
  await browser.close();
  return pdfBuffer;
};
export const generateResumePdf = async ({
  selfDescription,
  jobDescription,
  resume,
}) => {
  const resumePdfSchema = z.object({
    html: z
      .string()
      .describe("The HTML content of the resume, which can be converted to PDF using any library like puppeteer"),
  });
const prompt = `
    You are a professional resume designer.
    Job Description: ${jobDescription}
    Resume: ${resume}
    Self Description: ${selfDescription}

   the response should be a json object with a single field "html" which contains the HTML content of the resume. The HTML should be well-structured and formatted for a professional resume.The content of the resume should be based on the provided job description, self description, and resume. The HTML should be suitable for conversion to PDF using libraries like puppeteer.
`;
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });
  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content:
          "You are a professional resume designer. Return ONLY valid JSON with html field.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    response_format: {
      type: "json_object",
    },
  });
  const rawResult = JSON.parse(response.choices[0].message.content || "{}");
  const result = resumePdfSchema.parse(rawResult);
  console.log(result); // ← ye add karo

  return result;
};