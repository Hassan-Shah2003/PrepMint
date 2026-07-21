import { useNavigate } from "react-router-dom";

const themeStyles = {
  home: {
    wrapper: "bg-gradient-to-br from-[#1f1120] via-[#26132d] to-[#321c3f]",
    icon: "text-pink-400",
    title: "text-[#ff88bb]",
    subtitle: "text-gray-300",
  },
  interview: {
    wrapper: "bg-gradient-to-br from-[#120f18] via-[#1c1221] to-[#261a2f]",
    icon: "text-emerald-300",
    title: "text-[#a78bfa]",
    subtitle: "text-gray-300",
  },
};

const NotFound = ({ theme = "home", message }) => {
  const navigate = useNavigate();
  const styles = themeStyles[theme] || themeStyles.home;

  return (
    <main className={`min-h-screen px-4 py-12 text-white ${styles.wrapper}`}>
      <section className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-8 rounded-4xl border border-white/10 bg-white/5 p-10 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)] backdrop-blur-xl">
        <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-white/5 text-4xl shadow-lg shadow-black/30">
          <span className={styles.icon}>🔍</span>
        </div>
        <div className="space-y-4 text-center">
          <h1 className={`text-5xl font-black uppercase tracking-[0.25em] ${styles.title}`}>Page Not Found</h1>
          <p className={`max-w-xl text-sm leading-7 ${styles.subtitle}`}>
            {message || "We couldn't find the interview page you were looking for. Check the ID or return to the home screen."}
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="rounded-full bg-[#ff4d8d] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#ff2f7e]"
        >
          Go back to Home
        </button>
      </section>
    </main>
  );
};

export default NotFound;
