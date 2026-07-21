import React, { use, useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import FullScreenLoader from '../../../components/FullScreenLoader';
import { toast } from 'react-toastify';
const Register = () => {
    const { loading, handleRegister } = useAuth();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const validEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    useEffect(() => {
        if (location.state?.from) {
            toast.info("Please sign in to continue.", { toastId: 'auth-required' });
        }
    }, []);
    const validForm =()=>{
        if(!username.trim()){
            toast.error("Username is required");
            return false;
        }
        if(!email.trim()||!validEmail(email)){
            toast.error("Please enter a valid email address");
            return false;
        }
        if(!password.trim()){
            toast.error("Password is required");
            return false;
        }
        return true;
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        if(!validForm()){
            return;
        }
        try {
            await handleRegister({ username, email, password });
            navigate('/ ');
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed. Please try again.");
        }
    }
    if (loading) {
    return (
        <FullScreenLoader
            title="Creating your account..."
            description="Setting up your profile securely."
        />
    );
}
    return (
        <main className='bg-[#242124] h-screen text-white flex justify-center items-center'>
            <div className='w-full max-w-md p-8 h-auto rounded-2xl bg-[#1a181a] shadow-2xl'>
                <h1 className='text-center text-4xl font-bold mb-15'>SignUp</h1>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-1 mb-6'>
                        <label className='text-xl font-bold'>Username</label>
                        <input type="text" className='p-2 rounded-md bg-[#2d2a2d] text-white placeholder:text-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='please enter username' value={username}
                            onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className='flex flex-col gap-1 mb-6'>
                        <label className='text-xl font-bold'>Email</label>
                        <input type="text" className='p-2 rounded-md bg-[#2d2a2d] text-white placeholder:text-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='please enter email' onChange={(e) => setEmail(e.target.value)} value={email} />
                    </div>
                    <div className='flex flex-col gap-1 mb-6'>
                        <label className='text-xl font-bold'>Password</label>
                        <input type="password" className='p-2 rounded-md bg-[#2d2a2d] text-white placeholder:text-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='please enter password' onChange={(e) => setPassword(e.target.value)} value={password} />
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
                                    <span>signing up...</span>
                                </>
                            ) : (
                                "Sign Up"
                            )}
                        </button>

                    </div>
                    <p className='text-center text-gray-400 mt-6 text-sm'>
                        Already have an account?{' '}
                        <Link to="/login" className='text-red-500 hover:text-red-400 font-semibold transition-colors duration-200'>
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </main>
    )
}

export default Register