'use client';

import { useState } from 'react';
import Navbar from "@/components/Navbar";

export default function ContactPage() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Message sent successfully!');
        setForm({ name: '', email: '', message: '' });
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            
            <main className="relative px-6 py-20 overflow-hidden">
                {/* 🎨 Background Elements (ตกแต่งให้ดูทันสมัย) */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50 -z-10 animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-50 -z-10"></div>

                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        
                        {/* ℹ️ Left Side: Info */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-indigo-600 font-bold tracking-widest uppercase text-sm mb-3">
                                    Contact Us
                                </h2>
                                <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-tight">
                                    Let’s Build <br /> 
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                                        Something Mythic.
                                    </span>
                                </h1>
                                <p className="mt-6 text-lg text-slate-600 max-w-md leading-relaxed">
                                    มีคำถามเกี่ยวกับสินค้าหรือต้องการสั่งทำพิเศษ? ทักมาคุยกับทีมงาน Mythic Craft ได้เลยครับ
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-xl">📍</div>
                                    <div>
                                        <p className="font-bold text-slate-900">Our Sanctum</p>
                                        <p className="text-slate-500">Bangkok, Thailand</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-xl">📧</div>
                                    <div>
                                        <p className="font-bold text-slate-900">Email Us</p>
                                        <p className="text-slate-500">support@mythiccraft.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ✉️ Right Side: Modern Form Card */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-indigo-600/5 blur-2xl rounded-[40px] -z-10"></div>
                            <form 
                                onSubmit={handleSubmit} 
                                className="bg-white/80 backdrop-blur-xl border border-white p-8 md:p-10 rounded-[32px] shadow-2xl shadow-slate-200/50 space-y-5"
                            >
                                <div className="grid md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-wider text-slate-400 ml-1">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Your name"
                                            value={form.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-300"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-wider text-slate-400 ml-1">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="your@email.com"
                                            value={form.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-300"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-wider text-slate-400 ml-1">Message</label>
                                    <textarea
                                        name="message"
                                        placeholder="How can we help you?"
                                        value={form.message}
                                        onChange={handleChange}
                                        required
                                        rows={4}
                                        className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-300 resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-slate-200 hover:bg-indigo-600 hover:shadow-indigo-200 active:scale-[0.98] transition-all"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}