const LoadingOverlay = ({ title, description, steps, activeIndex }) => {
  return (
    <section className="relative rounded-3xl border border-white/10 bg-[#1b171d]/90 p-8 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[#ff4d8d]/20 bg-[#0f0b13] text-4xl text-[#ff88bb] shadow-[0_20px_60px_-30px_rgba(255,77,141,0.8)]">
          ✨
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white">{title}</h2>
          <p className="mt-2 max-w-2xl text-sm text-gray-300">{description}</p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {steps.map((step, index) => (
          <div
            key={step.label}
            className={`rounded-3xl border p-5 transition ${index === activeIndex ? "border-[#ff4d8d] bg-[#29131f] text-white shadow-lg shadow-[#ff4d8d]/20" : "border-white/10 bg-[#0f0b13] text-gray-300"}`}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#2a1b2a] text-xl text-[#ff88bb]">
                {step.icon}
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-gray-400">Step {index + 1}</p>
                <h3 className="mt-2 text-lg font-semibold">{step.label}</h3>
              </div>
            </div>
            <p className="mt-3 text-sm leading-6 text-gray-400">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LoadingOverlay;
