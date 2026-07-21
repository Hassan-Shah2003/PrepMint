import React from 'react';
import { useInterview } from '../hooks/useInterview';
import { useNavigate, useParams } from 'react-router-dom';
import NotFound from '../../../components/NotFound';
import LoadingOverlay from '../../../components/LoadingOverlay';
import LogoutButton from '../../auth/components/LogoutButton';

const statusColor = {
  low: "bg-emerald-500/20 text-emerald-200",
  medium: "bg-amber-500/20 text-amber-200",
  high: "bg-red-500/20 text-red-200",
};

const Interview = () => {
  const { report, getReportById, loading, loadingAction, getResumePdf, error } = useInterview()
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = React.useState("technical");
  const [expandedQuestion, setExpandedQuestion] = React.useState(null);
  const { interviewId } = useParams();

  if (loading) {
    return (
      <main className="min-h-screen bg-[#181318] text-white px-4 py-8 sm:px-6 md:px-10">
        <div className="mx-auto w-full max-w-4xl">
          <LoadingOverlay
            title={loadingAction === 'downloadingPdf' ? 'Building your PDF...' : 'Loading your interview plan...'}
            description={loadingAction === 'downloadingPdf'
              ? 'Preparing your resume PDF file. This may take a few moments.'
              : 'Fetching your personalized interview strategy and report.'
            }
            steps={loadingAction === 'downloadingPdf'
              ? [
                  { icon: '📄', label: 'Create PDF', description: 'Compile your resume into a downloadable file.' },
                  { icon: '✅', label: 'Download Ready', description: 'Your AI-powered PDF is almost ready.' },
                ]
              : [
                  { icon: '🔎', label: 'Analyzing report', description: 'Checking your interview prompt and notes.' },
                  { icon: '🚀', label: 'Preparing plan', description: 'Loading questions, answers, and roadmap.' },
                ]
            }
            activeIndex={0}
          />
        </div>
      </main>
    );
  }

  if (!report && !loading) {
    return <NotFound theme="interview" message="This interview ID does not exist or is invalid." />;
  }
  const sectionMap = {
    technical: {
      title: "Technical Questions",
      description: "Prepare for the exact engineering topics you need to know.",
      list: report?.technicalQuestion,
      badge: `${report?.technicalQuestion?.length} questions`,
      type: "Technical",
    },
    behavioral: {
      title: "Behavioral Questions",
      description: "Practice storytelling for teamwork, debugging, and feedback scenarios.",
      list: report?.behavioralQuestion || [],
      badge: `${report?.behavioralQuestion?.length || 0} questions`,
      type: "Behavioral",
    },
    roadmap: {
      title: "Preparation Road Map",
      description: "Follow this week-long plan to close skill gaps and prepare for your interview.",
      list: report?.preparationPlan || [],
      badge: `${report?.preparationPlan?.length || 0} days`,
      type: "Roadmap",
    },
  };

  const active = sectionMap[activeSection];

  return (
    <main className="min-h-screen bg-[#181318] text-white px-4 py-8 sm:px-6 md:px-10">
      <section className="mx-auto w-full max-w-[1400px]">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-[#1b171d]/90 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_30px_-12px_rgba(0,0,0,0.8)] backdrop-blur transition hover:border-[#ff4d8d]/60 hover:bg-[#23151f] hover:text-[#ff88bb] cursor-pointer"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2a1b2a] text-lg transition group-hover:-translate-x-1">
              ←
            </span>
            <span>Back to Home</span>
          </button>
          <LogoutButton label="Sign out" className="min-w-[160px] cursor-pointer " />
        </div>

        <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-white/10 bg-[#1b171d]/90 p-8 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
          <div>
            <h1 className="text-5xl text-center font-black uppercase text-[#ff88bb]">Interview Overview</h1>
            {/* <h1 className="mt-3 text-xl font-black text-white">Your post-application readiness dashboard</h1> */}
            <p className="mt-2 text-center text-base leading-8 text-gray-200">Review skill gaps, technical and behavioral questions, and a week-long preparation plan based on your current match score.</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1.7fr)_360px]">
          <aside className="order-2 flex flex-col items-stretch justify-between space-y-6 rounded-3xl border border-white/10 bg-[#1b171d]/90 p-5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] lg:order-1 lg:sticky lg:top-8 lg:h-fit xl:h-[calc(100vh-8rem)]">
            <div className="rounded-3xl border border-white/10 bg-[#0f0b13] p-6">
              <div className="mb-5 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2a1b2a] text-[#ff88bb]">
                  <span className="text-xl">⚡</span>
                </div>
                <div>
                  {/* <p className="text-sm uppercase tracking-[0.3em] text-[#ff88bb]">Jump to</p> */}
                  <h2 className="text-lg font-bold tracking-[0.2em]"><span className='text-[#ff88bb]'>Quick</span> Navigation</h2>
                </div>
              </div>
              <div className="space-y-3 text-sm text-gray-300">
                {[
                  { key: "technical", label: "Technical questions", icon: "💻" },
                  { key: "behavioral", label: "Behavioral questions", icon: "💬" },
                  { key: "roadmap", label: "Road map", icon: "🗺️" },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => {
                      setActiveSection(item.key);
                      setExpandedQuestion(null);
                    }}
                    className={`w-full rounded-2xl px-4 py-3 text-left text-base font-semibold transition flex items-center gap-3 cursor-pointer ${activeSection === item.key
                      ? "border border-[#ff4d8d] bg-[#29131f] text-white shadow-lg shadow-[#ff4d8d]/10"
                      : "border border-white/10 bg-[#17101b] text-gray-200 hover:border-[#ff4d8d] hover:text-white"
                      }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
            <button
              className="w-full rounded-2xl px-4 py-3 text-base font-semibold transition flex items-center gap-3 cursor-pointer bg-[#ff0b64] text-gray-200 text-center hover:border-[#ff4d8d] hover:text-white"
              onClick={() => getResumePdf(interviewId)}
            >
              <svg className='h-8 mr-3' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17.0007 1.20825 18.3195 3.68108 20.7923 4.99992 18.3195 6.31876 17.0007 8.79159 15.6818 6.31876 13.209 4.99992 15.6818 3.68108 17.0007 1.20825ZM8.00065 4.33325 10.6673 9.33325 15.6673 11.9999 10.6673 14.6666 8.00065 19.6666 5.33398 14.6666.333984 11.9999 5.33398 9.33325 8.00065 4.33325ZM19.6673 16.3333 18.0007 13.2083 16.334 16.3333 13.209 17.9999 16.334 19.6666 18.0007 22.7916 19.6673 19.6666 22.7923 17.9999 19.6673 16.3333Z"></path></svg>
              Download Resume Ai
            </button>

          </aside>

          <main className="order-1 space-y-6 lg:order-2">
            <section className="space-y-4 rounded-3xl border border-white/10 bg-[#1b171d]/90 p-5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{activeSection === "technical" ? "💻" : activeSection === "behavioral" ? "💬" : "🗺️"}</span>
                    <h2 className="text-2xl font-semibold">{active.title}</h2>
                  </div>
                  <p className="mt-2 text-sm leading-7 text-gray-300">{active.description}</p>
                </div>
                <div className="rounded-2xl bg-[#17101b] px-5 py-2 text-sm text-gray-100">{active.badge}</div>
              </div>

              {activeSection === "roadmap" ? (
                <div className="relative flex gap-8">
                  {/* Timeline */}
                  <div className="relative w-full flex-1">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#ff4d8d]"></div>
                    <div className="space-y-8">
                      {(active.list || []).map((item, index) => (
                        <div key={item.day} className="relative flex gap-8">
                          {/* Circle Node */}
                          <div className="flex flex-col items-center pt-1">
                            <div className="relative z-10 w-9 h-9 rounded-full bg-[#ff4d8d] border-4 border-[#181318] flex items-center justify-center">
                              <span className="text-xs font-bold text-white">{index + 1}</span>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1 pb-4">
                            <div className="rounded-2xl border border-white/10 bg-[#0f0b13] p-6">
                              <div className="flex items-start justify-between gap-4 mb-4">
                                <div>
                                  <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#ff88bb]">Day {item.day}</p>
                                  <h3 className="text-xl font-semibold text-white mt-2">{item.focus}</h3>
                                </div>
                              </div>
                              <ul className="list-disc space-y-2 pl-5">
                                {item.task.map((task, taskIndex) => (
                                  <li key={taskIndex} className="text-sm text-gray-300">{task}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {active.list.map((item, index) => (
                    <article key={index} className="rounded-2xl border border-white/10 bg-[#0f0b13] overflow-hidden">
                      <button
                        onClick={() => setExpandedQuestion(expandedQuestion === index ? null : index)}
                        className="w-full text-left px-6 py-4 hover:bg-[#17101b] transition flex items-center cursor-pointer justify-between gap-4 "
                      >
                        <div className="flex items-start gap-4 flex-1">
                          <span className="rounded-full bg-[#ff4d8d] text-white font-bold w-8 h-8 flex items-center justify-center shrink-0 text-sm">
                            {activeSection === "technical" ? index + 1 : index + 1}
                          </span>
                          <div className="flex-1">
                            <h3 className="text-base font-semibold text-white">{item.question}</h3>
                          </div>
                        </div>
                        <svg className={`w-5 h-5 text-[#ff88bb] transition-transform shrink-0 ${expandedQuestion === index ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </button>

                      {expandedQuestion === index && (
                        <div className="border-t border-white/10 px-6 py-4 space-y-4 bg-[#0a0708]">
                          <div>
                            <p className="text-xs font-bold uppercase tracking-[0.15em] text-blue-400 mb-2">Intention</p>
                            <p className="text-sm text-gray-300 leading-relaxed">{item.intention}</p>
                          </div>
                          <div>
                            <p className="text-xs font-bold uppercase tracking-[0.15em] text-emerald-400 mb-2">Model Answer</p>
                            <p className="text-sm text-gray-200 leading-relaxed">{item.answer}</p>
                          </div>
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              )}
            </section>
          </main>

          <aside className="order-3 space-y-6 rounded-3xl border border-white/10 bg-[#1b171d]/90 p-5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] lg:sticky lg:top-8 lg:self-start xl:h-fit">
            <div className="rounded-3xl border border-white/10 bg-[#0f0b13] p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-2xl">🎯</span>
                <p className="text-xs uppercase tracking-[0.15em] text-gray-400">Match Score</p>
              </div>
              <div className="flex justify-center mb-4">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
                    <circle
                      cx="60"
                      cy="60"
                      r="54"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="6"
                      strokeDasharray={`${(report.matchScore / 100) * 339.3} 339.3`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-black text-white">{report.matchScore}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-emerald-400 font-semibold">Strong match for this role</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#0f0b13] p-5">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📊</span>
                <h2 className="text-xl font-semibold text-white">Skill Gaps</h2>
              </div>
              <div className="mt-4 space-y-3">
                {report.skillGap.map((item, index) => (
                  <div key={index} className="rounded-2xl bg-[#17101b] p-4 transition hover:border hover:border-white/10">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-base font-semibold text-white">{item.skill}</p>
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase ${statusColor[item.severity]}`}>
                        {item.severity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default Interview;
