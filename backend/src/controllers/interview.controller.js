import { success } from "zod";
import interviewReportModel from "../model/interviewReport.model.js";
import {
  generateInterviewReport,
  generatePdfFromHtml,
  generateResumePdf,
} from "../services/ai.service.js";
import { PDFParse } from "pdf-parse";

export const generateInterviewReportController = async (req, res) => {
  try {
    const { jobDescription, selfDescription } = req.body;
    if (!jobDescription) {
      return res.status(400).json({
        success: false,
        message: "Job Description is required.",
      });
    }
    if (!selfDescription && !req.file.buffer) {
      return res.status(400).json({
        success: false,
        message: "Please provide either Self Description or Resume PDF.",
      });
    }
    let resumeText = "";
    if (req.file && req.file.buffer) {
      const resumeBuffer = await new PDFParse(
        Uint8Array.from(req?.file?.buffer),
      ).getText();
      console.log(resumeBuffer.text);
      resumeText = resumeBuffer.text;
    }

    const interviewReportByAi = await generateInterviewReport({
      jobDescription: jobDescription,
      selfDescription: selfDescription,
      resume: resumeText,
    });

    const interviewReport = await interviewReportModel.create({
      user: req.user.id,
      jobDescription,
      selfDescription,
      resume: resumeText,
      ...interviewReportByAi,
    });
    return res.status(201).json({
      success: true,
      message: "report generate successfully",
      data: interviewReport,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getInterviewByIdController = async (req, res) => {
  try {
    const { interviewId } = req.params;
    const interviewReport = await interviewReportModel.findOne({
      _id: interviewId,
      user: req.user.id,
    });
    if (!interviewReport) {
      return res.status(404).json({
        message: "interview report not found",
      });
    }
    return res.status(200).json({
      message: "interview report fetch successfully",
      interviewReport,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getAllInterviewReportController = async (req, res) => {
  try {
    const interviewReport = await interviewReportModel
      .find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .select(
        "-resume -selfDescription -jobDescription -_v -technicalQuestion -behavioralQuestion -skillGap -preparationPlan",
      );
    return res.status(200).json({
      message: "interview report fetch successfully",
      interviewReport,
    });
  } catch (error) {}
};
export const generateResumePdfController = async (req, res) => {
  try {
    const { interviewReportId } = req.params;
    const interviewReport = await interviewReportModel.findOne({
      _id: interviewReportId,
      user: req.user.id,
    });
    if (!interviewReport) {
      return res.status(404).json({
        message: "interview report not found",
      });
    }
    const { resume, selfDescription, jobDescription } = interviewReport;
    const { html } = await generateResumePdf({
      selfDescription,
      jobDescription,
      resume,
    });
    const pdfBuffer = await generatePdfFromHtml({ htmlContent: html });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=resume_${interviewReportId}.pdf`,
    );
    return res.status(200).send(pdfBuffer);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
