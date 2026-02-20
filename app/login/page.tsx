'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie'; // นำเข้า js-cookie

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
                // ✅ 1. เก็บข้อมูล User ทั้งหมดใน Cookie (เผื่อใช้หน้า Client)
                // ตั้งค่า expires: 1 คือเก็บไว้ 1 วัน
                Cookies.set('user', JSON.stringify(data.user), { expires: 1 });

                // ✅ 2. เก็บ role แยกไว้เพื่อให้ Middleware อ่านค่าได้ง่ายและเร็วขึ้น
                Cookies.set('user_role', data.user.role, { expires: 1 });

                await Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: `Welcome, ${data.user.username}!`,
                    timer: 1500,
                    showConfirmButton: false,
                });

                // ตรวจสอบ Role จากข้อมูลที่ได้มาจาก API
                if (data.user.role === 'admin') {
                    router.push('/admin');
                } else {
                    router.push('/');
                }
                
                // บังคับ Refresh เล็กน้อยเพื่อให้ Middleware/Layout รับรู้ค่า Cookie ใหม่
                router.refresh();

            } else {
                await Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: data.message || 'Invalid email or password.',
                    confirmButtonText: 'Try Again',
                });
            }
        } catch (error) {
            console.error("Login Error:", error);
            Swal.fire('Error', 'Something went wrong. Please try again later.', 'error');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-200 p-6">
            <div className="w-full max-w-md bg-white p-10 rounded-[32px] shadow-sm border border-slate-100">
                <div className="text-center mb-8">
                    <div className="w-12 h-12 bg-indigo-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-indigo-100 shadow-lg">
                        <a href="/ "><span className="text-white font-bold text-xl">M</span> </a>
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
                            className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3.5 text-slate-700 placeholder:text-slate-300 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                            placeholder="name@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500 ml-1">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3.5 text-slate-700 placeholder:text-slate-300 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                        Sign In
                    </button>
                </form>

                <p className="text-center text-sm text-slate-500 mt-8">
                    {"Don't have an account?"} <a href="/register" className="text-indigo-600 font-semibold hover:underline">Sign up</a>
                </p>
            </div>
        </div>
    );
}