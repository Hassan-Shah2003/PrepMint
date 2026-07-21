import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const LogoutButton = ({ className = "", label = "Logout" }) => {
  const navigate = useNavigate();
  const { handleLogout, loading } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const onLogout = async () => {
    try {
      setIsLoggingOut(true);
      await handleLogout();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <button
      type="button"
      onClick={onLogout}
      disabled={loading || isLoggingOut}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ff4d8d] to-[#ff1d6c] px-5 py-3 text-sm font-semibold text-white shadow-[0_20px_60px_-30px_rgba(255,77,141,0.9)] transition duration-200 hover:scale-[1.02] hover:shadow-[#ff4d8d]/30 disabled:cursor-not-allowed disabled:opacity-70 ${className}`}
      aria-label={label}
    >
      <span className="text-base">⏻</span>
      {isLoggingOut ? "Signing out..." : label}
    </button>
  );
};

export default LogoutButton;
