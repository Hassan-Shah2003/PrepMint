const FullScreenLoader = ({
  title = "Loading...",
  description = "Please wait while we prepare everything for you.",
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#242124]">
      <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#1a181a] p-10 shadow-2xl">
        <div className="flex flex-col items-center text-center">

          <div className="relative mb-8">
            <div className="h-20 w-20 rounded-full border-4 border-white/10"></div>

            <div className="absolute inset-0 h-20 w-20 rounded-full border-4 border-red-500 border-t-transparent animate-spin"></div>
          </div>

          <h1 className="text-3xl font-bold text-white">
            {title}
          </h1>

          <p className="mt-3 text-gray-400">
            {description}
          </p>

          <div className="mt-8 flex gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500 animate-bounce"></span>
            <span className="h-3 w-3 rounded-full bg-red-500 animate-bounce [animation-delay:0.2s]"></span>
            <span className="h-3 w-3 rounded-full bg-red-500 animate-bounce [animation-delay:0.4s]"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullScreenLoader;