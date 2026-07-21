import { useMemo, useRef, useState } from "react";
import { useInterview } from "../hooks/useInterview";
import RecentPrep from "../components/RecentPrep";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingOverlay from "../../../components/LoadingOverlay";
import LogoutButton from "../../auth/components/LogoutButton";
import { MAX_JOB_DESCRIPTION_LENGTH, MAX_RESUME_SIZE_BYTES, ALLOWED_RESUME_TYPES, MAX_SELF_DESCRIPTION } from "../constants/interview.js"
const IconBadge = ({ children, className = "" }) => (
    <div className={`flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[#2a1b2a] text-[#ff88bb] shadow-lg shadow-[#ff88bb]/10 ${className}`}>
        {children}
    </div>
);

const Home = () => {
    const [jobDescription, setJobDescription] = useState('')
    const [selfDescription, setSelfDescription] = useState('')
    const [resumeFile, setResumeFile] = useState(null);
    const [status, setStatus] = useState("idle");
    const [error, setError] = useState(null);
    const resumeInputRef = useRef()
    const { loading, loadingAction, generateReport, report, reports } = useInterview()
    console.log(reports);

    const navigate = useNavigate()
    const completion = `${jobDescription.length}/${MAX_JOB_DESCRIPTION_LENGTH}`;

    const resumeLabel = useMemo(() => {
        if (!resumeFile) {
            return "Drag & drop your resume here";
        }
        return resumeFile.name;
    }, [resumeFile]);
    const isReady = useMemo(
        () => Boolean(jobDescription.trim() && (resumeFile || selfDescription.trim())),
        [jobDescription, resumeFile, selfDescription]
    );
    const handleJobDescriptionChange = (value) => {
        if (value.length <= MAX_JOB_DESCRIPTION_LENGTH) {
            setJobDescription(value);
        }
    };
    const handleSelfDescriptionChange = (value) => {
        setSelfDescription(value);
    };
    const handleClear = () => {
        setJobDescription("");
        setSelfDescription("");
        setResumeFile(null);
        // setReport(null);
        setStatus("idle");
        setError(null);
        if (resumeInputRef.current) {
            resumeInputRef.current.value = "";
        }
    };
    const handleResumeChange = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;


        if (!ALLOWED_RESUME_TYPES.includes(file.type)) {
            setResumeFile(null);
            event.target.value = "";
            toast.error("Only PDF or DOC/DOCX files are supported.");
            return;
        }

        if (file.size > MAX_RESUME_SIZE_BYTES) {
            toast.error("Resume must be 5MB or smaller.");
            event.target.value = "";
            return;
        }

        setResumeFile(file);
        setError(null)
    };
    const validateForm = () => {
        if (!jobDescription.trim()) {
            toast.error("Target job description is required.");
            return false;
        }

        if (!resumeFile && !selfDescription.trim()) {
            toast.error("Please upload a resume or enter a self description.");
            return false;
        }

        if (selfDescription.length > MAX_SELF_DESCRIPTION) {
            toast.error("Self description is too long.");
            return false;
        }

        return true;
    };
    const handleGenerateReport = async (e) => {
        e.preventDefault();
        if (loading) return;
        if (!validateForm()) {
            return;
        }
        try {
            setStatus("submitting");
            setError(null);
            // const resumeFile = resumeInputRef.current.files[0]
            const generatedReport = await generateReport({ jobDescription, selfDescription, resumeFile })
            console.log(generateReport, "generated report.........");

            setStatus("success")
            toast.success("Interview Report Generated Successfully")
            navigate(`/interview/${generatedReport._id}`)
        } catch (error) {
            console.error(error)
            setStatus("error")
            setError(
                error?.response?.data?.message ||
                error?.message ||
                "Something went wrong."
            );
            const message = error?.response?.data?.errors?.[0]?.message ||
                error?.response?.data?.message ||
                error?.message ||
                "Failed to generate interview report."
            toast.error(message);
        }
    };
    const prepItems = reports.map((report) => ({
        id: report._id || "no id",
        title: report.title || "No title",
        company: `Match Score: ${report.matchScore}%`,
        time: new Date(report.createdAt).toLocaleDateString()
    })) || [];

    if (loading && loadingAction === "generatingReport") {
        return (
            <main className="min-h-screen bg-[#181318] text-white px-6 py-35 md:px-10">
                <section className="mx-auto max-w-4xl">
                    <LoadingOverlay
                        title="Crafting your interview plan..."
                        description="Our AI is analyzing your job description and profile, and generating the best strategy for your interview."
                        steps={[
                            { icon: '🔍', label: 'Analyzing Profile', description: 'Reviewing your job and resume details.' },
                            { icon: '🚀', label: 'Building Plan', description: 'Preparing a personalized interview strategy.' },
                        ]}
                        activeIndex={0}
                    />
                </section>
            </main>
        )
    }

    return (
        <main className="min-h-screen  bg-[#181318] text-white px-6 py-35 md:px-10">
            <section className="mx-auto max-w-360 ">
                <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div className="w-full">
                        <div className="mb-5 flex flex-wrap items-center justify-center gap-3">
                            
                            <div className="rounded-full border border-white/10 bg-[#1b171d]/80 px-4 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#ff88bb] flex items-center gap-2 shadow-lg shadow-[#ff88bb]/10">
                                <img
                                    src="/favicon.jpg"
                                    alt="PrepMint Logo"
                                    className="h-5 w-5 object-contain"
                                />
                            
                                PrepMint
                            </div>
                        </div>
                        <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row sm:justify-between">
                            <div className="text-center sm:text-left">
                                <h1 className="text-4xl uppercase tracking-[0.2em] font-black text-white">
                                    <span>Create Your Custom </span>
                                    <span className="text-[#ff88bb]">Interview Plan</span>
                                </h1>
                                <p className="mt-3 text-4xl font-semibold text-gray-400 sm:text-xl">Let our Ai analyze the job requirments and your unique profile to build a wining strategory.</p>
                            </div>
                            <div className="flex justify-center  sm:justify-end">
                                <LogoutButton label="Sign out" className="min-w-[180px] cursor-pointer" />
                            </div>
                        </div>
                    </div>
                </header>

                <div className="grid gap-8 xl:grid-cols-[1.7fr_1fr]">
                    <div>
                        <h1>
                            {/* <span className="text-white">Create Your Custom </span> */}
                            {/* <span className="text-[#ff88bb]">Interview Plan</span> */}
                        </h1>
                        {/* <p className="mt-3 text-4xl font-semibold text-gray-400 sm:text-xl text-center">Let our Ai analyze the job requirments and your unique profile to build a wining strategory.</p> */}
                    </div>
                    {/* </header> */}
                </div>
                <div className="grid gap-8 xl:grid-cols-[1.7fr_1fr]">
                    <form
                        onSubmit={handleGenerateReport}
                        className="rounded-3xl border border-white/10 bg-[#1b171d]/90 p-6 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]"
                    >
                        <div className="mb-6 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <IconBadge className="h-10 w-10">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                                        <path d="M5 7.5A2.5 2.5 0 0 1 7.5 5h9A2.5 2.5 0 0 1 19 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 5 16.5v-9Z" />
                                        <path d="M8 8h8" />
                                        <path d="M8 12h5" />
                                    </svg>
                                </IconBadge>
                                <div>
                                    <h2 className="text-2xl font-semibold">Target Job Description</h2>
                                    <p className="mt-2 text-sm text-gray-400">Paste the full job description here...</p>
                                </div>
                            </div>
                            <span className="rounded-full bg-[#ff4d8d] px-3 py-1 text-sm font-semibold uppercase tracking-[0.2em] text-white">required</span>
                        </div>
                        <textarea
                            value={jobDescription}
                            onChange={(e) => handleJobDescriptionChange(e.target.value)}
                            placeholder="Paste the full job description here..."
                            className="h-105 w-full resize-none rounded-[28px] border border-white/10 bg-[#0f0b13] p-5 text-lg leading-7 text-white outline-none transition focus:border-[#ff4d8d] focus:ring-2 focus:ring-[#ff4d8d]/20"
                        />

                        <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
                            <div>{completion}</div>
                            <div>Max 5000</div>
                        </div>
                    </form>


                    <aside className="space-y-6 rounded-3xl border border-white/10 bg-[#1b171d]/90 p-6 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
                        <div className="flex items-start gap-3">
                            <IconBadge className="mt-1 h-10 w-10">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                                    <circle cx="12" cy="8" r="3.5" />
                                    <path d="M5 19a7 7 0 0 1 14 0" />
                                </svg>
                            </IconBadge>
                            <div>
                                <h3 className="text-2xl font-semibold">Your Profile</h3>
                                <p className="mt-2 text-sm text-gray-400">Either a resume or a self description is required for best results.</p>
                            </div>
                        </div>

                        <label className="group block cursor-pointer rounded-3xl border border-dashed border-white/20 bg-[#0f0b13] p-5 text-center transition hover:border-[#ff4d8d] hover:bg-[#181118]/80">
                            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#281728] text-[#ff88bb] shadow-lg shadow-[#ff88bb]/10">
                                <span className="text-4xl">⬆</span>
                            </div>
                            <input type="file" accept=".pdf,.doc,.docx" className="hidden" ref={resumeInputRef} onChange={handleResumeChange}
                            />
                            <div className="text-sm font-semibold text-white">Drag & drop your resume here</div>
                            <div className="mt-2 text-xs text-gray-500">PDF or DOCX, max 5MB</div>
                            <div className="mt-4 text-sm text-gray-300">{resumeLabel}</div>
                        </label>

                        <div className="flex items-center justify-center gap-3 text-sm text-gray-500">
                            <span className="h-px flex-1 bg-white/10" />
                            <span>or</span>
                            <span className="h-px flex-1 bg-white/10" />
                        </div>

                        <div className="rounded-[28px] border border-white/10 bg-[#0f0b13] p-5">
                            <label className="mb-3 block text-sm font-semibold text-white">Quick Self-Description</label>
                            <textarea
                                value={selfDescription}
                                onChange={(e) => handleSelfDescriptionChange(e.target.value)}
                                placeholder="Tell us about your experience and strengths..."
                                className="h-40 w-full resize-none rounded-3xl border border-white/10 bg-[#181318] p-4 text-sm text-white outline-none focus:border-[#ff4d8d] focus:ring-2 focus:ring-[#ff4d8d]/20"
                            />
                        </div>

                        <div className="rounded-3xl border border-white/10 bg-[#15121a] p-4">
                            <div className="flex items-center gap-3 text-sm text-gray-400">
                                <div className="h-2 w-2 rounded-full bg-emerald-400" />
                                <div>
                                    Either a Resume or a Self Description is required <span className="font-semibold text-emerald-300">best results</span>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-white/10 bg-[#15121a] p-4 text-sm text-gray-400">
                            <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[#9e9e9e]">
                                <span>AI Engine Standby</span>
                                <span className="text-emerald-400">●</span>
                            </div>
                            <p>Ready for strategy generation.</p>
                        </div>

                        <div className="mt-4">
                            <RecentPrep items={prepItems} />
                        </div>

                        <div className="flex flex-col gap-3">
                            {error && (
                                <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">{error}</div>
                            )}
                            <div>

                                <div className="grid gap-3 sm:grid-cols-2">
                                    <button
                                        type="button"
                                        onClick={handleClear}
                                        className="rounded-3xl border border-white/10 bg-[#0f0b13] px-5 py-4 text-sm font-semibold text-white transition hover:border-[#ff4d8d] hover:text-[#ff4d8d] cursor-pointer"
                                    >
                                        Clear All
                                    </button>
                                    <button
                                        type="submit"
                                        onClick={handleGenerateReport}
                                        disabled={!isReady || loading}
                                        className="rounded-3xl bg-linear-to-r from-[#ff4d8d] to-[#ff1d6c] px-5 py-4 text-sm font-semibold text-white transition disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
                                    >
                                        {loading ? "Generating…" : "Generate my interview strategy"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </aside>

                </div>

                {
                    status === "success" && report && (
                        <section className="mt-10 rounded-3xl border border-white/10 bg-[#1b171d]/90 p-6 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
                            <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                                <h2 className="text-2xl font-semibold">Generated Interview Strategy</h2>
                                <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-semibold text-emerald-300">Success</span>
                            </div>
                            <pre className="whitespace-pre-wrap rounded-3xl border border-white/10 bg-[#0f0b13] p-6 text-sm leading-7 text-gray-200">
                                {typeof report === "string" ? report : JSON.stringify(report, null, 2)}
                            </pre>
                        </section>
                    )
                }
            </section >
        </main >
    );
};

export default Home;
