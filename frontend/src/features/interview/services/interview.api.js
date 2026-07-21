import axios from "axios";

const INTERVIEW_API_URL = "http://localhost:5000/api/interview";

const api = axios.create({
  baseURL: INTERVIEW_API_URL,
  withCredentials: true,
});

export const generateInterviewReport = async ({ jobDescription, selfDescription, resumeFile }) => {
  const formData = new FormData();
  formData.append("jobDescription", jobDescription);
  formData.append("selfDescription", selfDescription);

  if (resumeFile) {
    formData.append("resume", resumeFile);
  }

  try {
    const response = await api.post("/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data.data);
    
    return response.data.data;
  } catch (error) {
    throw error.response?.data?.message || error.message || "Unable to generate interview report";
  }
};
export const getInterviewById=async(interviewId)=>{
    const response  = await api.get(`/report/${interviewId}`)

    return response.data
}
export const getAllInterviewReports=async()=>{
    const response =await api.get('/')
    return response.data
}
export const generateResumePdf=async({interviewId})=>{
    const response = await api.post(`/resume/pdf/${interviewId}`, null, {
        responseType:'blob'
    })
    return response.data
}