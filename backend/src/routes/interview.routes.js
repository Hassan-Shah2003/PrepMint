import express from 'express'
import { authMiddleware } from '../middleware/auth.middleware.js';
// import { generateInterviewReport } from '../services/ai.service';
import { generateInterviewReportController, generateResumePdfController, getAllInterviewReportController, getInterviewByIdController } from '../controllers/interview.controller.js';
import upload from '../middleware/file.middleware.js';

const interviewRouter = express.Router();

interviewRouter.post("/",authMiddleware,upload.single("resume"),generateInterviewReportController);

interviewRouter.get("/report/:interviewId",authMiddleware,getInterviewByIdController)

interviewRouter.get("/",authMiddleware,getAllInterviewReportController);

interviewRouter.post("/resume/pdf/:interviewReportId",authMiddleware,generateResumePdfController);
export default interviewRouter
