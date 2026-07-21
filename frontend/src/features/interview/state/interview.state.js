export const MAX_JOB_DESCRIPTION_LENGTH = 5000;
export const MAX_RESUME_SIZE_BYTES = 5 * 1024 * 1024;
export const ALLOWED_RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const initialInterviewState = {
  jobDescription: "",
  selfDescription: "",
  resumeFile: null,
  report: null,
  status: "idle",
};

export const formatResumeFileName = (file) => {
  if (!file) return "Drag & drop your resume here";
  return `${file.name}`;
};
