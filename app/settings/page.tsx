'use client';

import { useSyncExternalStore, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Swal from 'sweetalert2';

// 1. Helper function สำหรับอ่านค่าจาก localStorage (External Store)
const subscribe = (callback: () => void) => {
    window.addEventListener('storage', callback);
    return () => window.removeEventListener('storage', callback);
};

const getSnapshot = () => localStorage.getItem('user');
const getServerSnapshot = () => null;

export default function SettingsPage() {
    const router = useRouter();

    // 2. ใช้ useSyncExternalStore แทนการใช้ useEffect + setState
    // วิธีนี้จะไม่อ่านค่าจนกว่าจะถึงฝั่ง Client ทำให้ไม่เกิด Hydration Mismatch
    const storedUserRaw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

    // แปลงข้อมูล User
    const user = storedUserRaw ? JSON.parse(storedUserRaw) : null;

    // 3. Logout Function
    const handleLogout = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3b82f6',
            confirmButtonText: 'Yes, Logout',
        });

        if (result.isConfirmed) {
            localStorage.removeItem('user');
            // บังคับเปลี่ยนหน้า (router.push จะทำงานฝั่ง client อยู่แล้ว)
            router.push('/login');
            router.refresh();
        }
    };

    // 4. ถ้าไม่มี User และอยู่บน Client แล้ว ให้ส่งไปหน้า Login
    // เราใช้การเช็คในระดับการ Render แทนการใช้ Effect
    if (typeof window !== 'undefined' && !user) {
        router.push('/login');
        return null;
    }

    // ถ้ายังเป็นฝั่ง Server (StoredUserRaw เป็น null) ให้คืนค่าว่างเพื่อเลี่ยง Mismatch
    if (!storedUserRaw && typeof window === 'undefined') return null;

    return (
        <div className="min-h-screen bg-[#f8fafc]">
            <Navbar user={user} onLogout={handleLogout} />
            <main className="max-w-4xl mx-auto py-12 px-6">
                <h1 className="text-3xl font-bold text-slate-900 mb-8">Settings</h1>
                <div className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-sm">
                    {/* Profile Section */}
                    <div className="p-8 border-b border-slate-50 flex items-center gap-6">
                        <div className="w-20 h-20 rounded-3xl bg-blue-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-blue-100">
                            {user.username.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-800">{user.username}</h2>
                            <p className="text-slate-400 text-sm">{user.email || 'Member of Mythic Craft'}</p>
                        </div>
                    </div>

                    {/* Settings Options */}
                    <div className="p-4">
                        <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-colors group">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-white transition-colors">
                                    👤
                                </div>
                                <span className="font-semibold text-slate-700">Account Information</span>
                            </div>
                            <span className="text-slate-300">→</span>
                        </button>

                        <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-colors group">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-white transition-colors">
                                    🔔
                                </div>
                                <span className="font-semibold text-slate-700">Notifications</span>
                            </div>
                            <span className="text-slate-300">→</span>
                        </button>

                        <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-colors group">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-white transition-colors">
                                    🔒
                                </div>
                                <span className="font-semibold text-slate-700">Privacy & Security</span>
                            </div>
                            <span className="text-slate-300">→</span>
                        </button>

                        <div className="my-4 border-t border-slate-50"></div>

                        {/* Logout Tab */}
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-between p-4 hover:bg-red-50 rounded-2xl transition-colors group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center group-hover:bg-white transition-colors">
                                    🚪
                                </div>
                                <span className="font-semibold text-red-600">Logout from Realm</span>
                            </div>
                            <span className="text-red-200 group-hover:text-red-400 transition-colors">→</span>
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}