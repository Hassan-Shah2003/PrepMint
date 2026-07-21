import React, { useState } from 'react'
import LoadingThreeDotsJumping from '../components/LoadingThreeDots'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import FullScreenLoader from '../../../components/FullScreenLoader';
import { toast } from 'react-toastify';

const login = () => {
    const { loading, handleLogin } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const validForm = () => {
        if (!usernameOrEmail.trim()) {
            toast.error("Username or Email is required");
            return false;
        }
        if (!password.trim()) {
            toast.error("Password is required");
            return false;
        }
        return true;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validForm()) {
            return;
        }
        try {
            await handleLogin({ usernameOrEmail, password });
            navigate('/');
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed. Please try again.");
        }
    }
    if (loading) {
        return (
            <FullScreenLoader
                title="Signing you in..."
                description="Preparing your interview workspace."
            />
        );
    }
    return (
        <main className='bg-[#242124] h-screen text-white flex justify-center items-center'>
            <div className='w-full max-w-md p-8 h-auto rounded-2xl bg-[#1a181a] shadow-2xl'>
                <h1 className='text-center text-4xl font-bold mb-15'>Login</h1>
                <form onSubmit={handleSubmit} className='flex flex-col'>
                    <div className='flex flex-col gap-1 mb-6'>
                        <label className='text-xl font-bold'>Username or Email</label>
                        <input type="text" className='p-2 rounded-md bg-[#2d2a2d] text-white placeholder:text-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='please enter your username or email' value={usernameOrEmail} onChange={(e) => setUsernameOrEmail(e.target.value)} />
                    </div>
                    <div className='flex flex-col gap-1 mb-6'>
                        <label className='text-xl font-bold'>Password</label>
                        <input type="password" className='p-2 rounded-md bg-[#2d2a2d] text-white placeholder:text-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='please enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <button
                            disabled={loading}
                            className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 w-full py-4 rounded-md font-bold text-lg cursor-pointer shadow-lg shadow-red-600/20"
                            type="submit"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Logging in...</span>
                                </>
                            ) : (
                                "Login"
                            )}
                        </button>

                    </div>
                    <p className='text-center text-gray-400 mt-6 text-sm'>
                        Don't have an account?{' '}
                        <Link to="/register" className='text-red-500 hover:text-red-400 font-semibold transition-colors duration-200'>
                            Sign up
                        </Link>
                    </p>
                </form>
            </div>
        </main>
    )
}

export default login