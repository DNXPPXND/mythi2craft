'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();

            if (res.ok) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: 'Welcome back!',
                    timer: 1500,
                    showConfirmButton: false,
                });

                localStorage.setItem('user', JSON.stringify(data.user));
                router.push('/');
            } else {
                await Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: 'Invalid email or password. Please try again.',
                    confirmButtonText: 'Try Again',
                });
            }
        } catch { /* error handling */ }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-200 p-6">
            <div className="w-full max-w-100 bg-white p-10 rounded-4xl shadow-sm border border-slate-100">
                <div className="text-center mb-8">
                    <div className="w-12 h-12 bg-blue-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-blue-100 shadow-lg">
                        <span className="text-white font-bold text-xl">M</span>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">Welcome Back</h2>
                    <p className="text-slate-400 text-sm mt-1">Please enter your details</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500 ml-1">Email</label>
                        <input
                            type="email"
                            required
                            className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3.5 text-slate-700 placeholder:text-slate-300 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                            placeholder="name@company.com"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500 ml-1">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3.5 text-slate-700 placeholder:text-slate-300 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                            placeholder="••••••••"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                        Sign In
                    </button>
                </form>

                <p className="text-center text-sm text-slate-500 mt-8">
                    {"Don't have an account?"} <a href="/register" className="text-blue-600 font-semibold hover:underline">Sign up</a>
                </p>
            </div>
        </div>
    );
}