'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        first_name: '',
        last_name: ''
    });
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            return Swal.fire({
                icon: 'error',
                title: 'Password Mismatch',
                text: 'Passwords do not match.',
                confirmButtonColor: '#3b82f6'
            });
        }

        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Your account has been created.',
                    timer: 1500,
                    showConfirmButton: false,
                });
                router.push('/login');
            } else {
                const data = await res.json();
                Swal.fire({ icon: 'error', title: 'Registration Failed', text: data.error });
            }
        } catch {
            Swal.fire({ icon: 'error', title: 'Error', text: 'Something went wrong.' });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-200 p-6">
            <div className="w-full max-w-137.5 bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
                <div className="text-center mb-10">
                    <h2 className="text-2xl font-bold text-slate-800">Create Account</h2>
                    <p className="text-slate-400 text-sm mt-1">Join Mythic Craft today</p>
                </div>

                <form onSubmit={handleRegister} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 space-y-1">
                            <label className="text-xs font-semibold text-slate-500 ml-1">Username</label>
                            <input
                                name="username"
                                required
                                className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3.5 text-slate-700 placeholder:text-slate-300 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                placeholder="Choose a username"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-span-2 space-y-1">
                            <label className="text-xs font-semibold text-slate-500 ml-1">Email Address</label>
                            <input
                                name="email"
                                type="email"
                                required
                                className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3.5 text-slate-700 placeholder:text-slate-300 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                placeholder="name@example.com"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500 ml-1">First Name</label>
                            <input
                                name="first_name"
                                required
                                className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3.5 text-slate-700 placeholder:text-slate-300 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                placeholder="First Name"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500 ml-1">Last Name</label>
                            <input
                                name="last_name"
                                required
                                className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3.5 text-slate-700 placeholder:text-slate-300 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                placeholder="Last Name"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500 ml-1">Password</label>
                            <input
                                name="password"
                                type="password"
                                required
                                minLength={6}
                                maxLength={10}
                                className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3.5 text-slate-700 placeholder:text-slate-300 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                placeholder="••••••••"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500 ml-1">Confirm Password</label>
                            <input
                                name="confirmPassword"
                                type="password"
                                required
                                minLength={6}
                                maxLength={10}
                                className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3.5 text-slate-700 placeholder:text-slate-300 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                placeholder="••••••••"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                        Create Account
                    </button>
                </form>

                <p className="text-center text-sm text-slate-500 mt-8">
                    Already have an account? <a href="/login" className="text-blue-600 font-semibold hover:underline">Log in</a>
                </p>
            </div>
        </div>
    );
}