import { z } from 'zod';
export const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .min(0)
    .max(100)
    .describe("percentage match between resume or self-description and job description"),
  technicalQuestion: z
    .array(
      z.object({
        question: z
          .string()
          .describe("Technical question based on job description"),
        intention: z.string().describe("What skill or knowledge interviewer is testing"),
        answer: z.string().describe("Ideal answer to the technical question"),
      }),
    )
    .describe("Exactly 10 technical questions"),

  behavioralQuestion: z
    .array(
      z.object({
        question: z
          .string()
          .describe("Behavioral question based on job description"),
        intention: z.string().describe("what the interviewer is trying to assess with this question"),
        answer: z.string().describe("Ideal answer to the behavioral question"),
      }),
    )
    .describe("Exactly 10 behavioral questions"),

  skillGap: z
    .array(
      z.object({
        skill: z.string().describe("Skill that is missing from resume but required in job description"),
        severity: z
          .enum(["low", "medium", "high"])
          .describe("Severity of the skill gap"),
      }),
    )
    .describe("Skills missing from resume but required in job description"),

  preparationPlan: z
    .array(
      z.object({
        day: z.number().describe("Day number in the preparation plan"),
        focus: z.string().describe("Main focus of the day in the preparation plan"),
        task: z
          .array(z.string())
          .describe("List of tasks to be completed on that day in the preparation plan"),
      }),
    )
    .describe("7 day preparation plan"),
    title:z.string().describe("Title of the interview report"),
    
});
