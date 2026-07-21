import { useContext, useEffect } from "react";
import { InterviewContext } from "../context/interview.context";
import {
  generateInterviewReport,
  getAllInterviewReports,
  getInterviewById,
  generateResumePdf,
} from "../services/interview.api";
import { useParams } from "react-router-dom";

export const useInterview = () => {
  const context = useContext(InterviewContext);
  const {interviewId}=useParams();
  if (!context) {
    throw new Error("useInterview must be used within interviewProvider");
  }
  const { loading, setLoading, loadingAction, setLoadingAction, report, setReport, reports, setReports, error, setError } =
    context;

  const generateReport = async ({
    selfDescription,
    resumeFile,
    jobDescription,
  }) => {
    setLoading(true);
    setLoadingAction("generatingReport");
    setError(null);
    try {
      const response = await generateInterviewReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });
      console.log(response.behavioralQuestion,"response from useInterview");
      setReport(response);
      return response;
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong";
      setError(message);
      throw error;
    } finally {
      setLoading(false);
      setLoadingAction(null);
    }
  };

  const getReportById = async (interviewId) => {
    setLoading(true);
    setLoadingAction("fetchingReport");
    setError(null);
    setReport(null);
    try {
      const response = await getInterviewById(interviewId);
      setReport(response.interviewReport);
      return response.interviewReport;
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong";
      setError(message);
      throw error;
    } finally {
      setLoading(false);
      setLoadingAction(null);
    }
  };

  const getReports = async () => {
    setLoading(true);
    setLoadingAction("fetchingReports");
    setError(null);
    try {
      const response = await getAllInterviewReports();
      setReports(response.interviewReport || []);
      return response.interviewReport || [];
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong";
      setError(message);
      throw error;
    } finally {
      setLoading(false);
      setLoadingAction(null);
    }
  };
  const getResumePdf = async (interviewId) => {
    setLoading(true);
    setLoadingAction("downloadingPdf");
    setError(null);
    let response = null;
    try {
      response = await generateResumePdf({ interviewId });
      const blob = new Blob([response], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `resume_${interviewId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.log(error);
      const message = error?.response?.data?.message || "Something went wrong";
      setError(message);
      throw error;
    } finally {
      setLoading(false);
      setLoadingAction(null);
    }
  }
  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    } else {
      getReports();
    }
  }, [interviewId]);
  
  return {
    loading,
    loadingAction,
    report,
    reports,
    error,
    setError,
    generateReport,
    getReportById,
    getReports,
    getResumePdf,
  };
};