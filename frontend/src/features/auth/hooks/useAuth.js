import { useContext, useEffect } from "react";
import { authContext } from "../context/auth.context.jsx";
import { register, login, logout, getCurrentUser } from "../services/auth.api";
import { toast } from "react-toastify";
export const useAuth = () => {
  const context = useContext(authContext);
  const { user, setUser, loading, setLoading } = context;

  const handleRegister = async ({ username, email, password }) => {
    try {
      setLoading(true);
      const data = await register({ username, email, password });
      setUser(data.user);
      toast.success("Account created successfully 🎉");
      // setLoading(false);
    } catch (error) {
      toast.error("Registration failed ❌");
      // setLoading(false);
      throw error.response?.data?.message || "Registration failed";
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async ({ usernameOrEmail, password }) => {
    try {
      setLoading(true);
      const data = await login({ usernameOrEmail, password });
    //   await new Promise((resolve) => setTimeout(resolve, 5000));
      setUser(data.user);
      toast.success("Login successful 🎉");
      // setLoading(false);
    } catch (error) {
      toast.error("Invalid credentials ❌");
      // setLoading(false);
      throw error.response?.data?.message || "Login failed";
    } finally {
      setLoading(false);
    }
  };
  const handleLogout = async () => {
    try {
      setLoading(true);
      const data = await logout();
      setUser(null);
      toast.info("Logged out successfully 👋");
      // setLoading(false);
    } catch (error) {
      toast.error("");
      // setLoading(false);
      throw error.response?.data?.message || "Logout failed";
    } finally {
      setLoading(false);
    }
  };
  const handleGetCurrentUser = async () => {
    try {
      // setLoading(true);
      const data = await getCurrentUser();
      // console.log(data);
      setUser(data.user);
      // setLoading(false);
    } catch (error) {
      setLoading(false);
      // console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleGetCurrentUser();
  }, []);

  return {
    user,
    setUser,
    setLoading,
    loading,
    handleRegister,
    handleLogin,
    handleLogout,
    handleGetCurrentUser,
  };
};
