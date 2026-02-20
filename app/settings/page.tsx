'use client';

import { useSyncExternalStore, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie'; // ✅ นำเข้า Cookies

// 1. Helper สำหรับเช็คสถานะ Client
const subscribe = () => () => {};
const useIsClient = () => useSyncExternalStore(subscribe, () => true, () => false);

export default function SettingsPage() {
    const isClient = useIsClient();
    const router = useRouter();

    // 2. อ่านข้อมูล User จาก Cookie แทน localStorage
    const getUser = () => {
        const saved = Cookies.get('user');
        try {
            return saved ? JSON.parse(saved) : null;
        } catch {
            return null;
        }
    };

    const user = isClient ? getUser() : null;

    // 3. ตรวจสอบสิทธิ์ (ถ้าเป็น Client แล้วไม่มี User ให้เด้งไป Login)
    useEffect(() => {
        if (isClient && !user) {
            router.push('/login');
        }
    }, [isClient, user, router]);

    // 4. Logout Function (เปลี่ยนมาลบ Cookie)
    const handleLogout = async () => {
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You will be logged out of your account.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#4f46e5', // Indigo-600
        cancelButtonColor: '#f1f5f9',  // Slate-100
        confirmButtonText: 'Yes, Logout',
        // ✅ แก้ไข: ใช้ customClass แทน borderRadius ที่ Error
        customClass: {
            popup: 'rounded-[32px]',      // ปรับความโค้งของกล่อง
            confirmButton: 'rounded-2xl',  // ปรับความโค้งของปุ่มยืนยัน
            cancelButton: 'rounded-2xl text-slate-600' // ปรับความโค้งของปุ่มยกเลิก
        }
    });

    if (result.isConfirmed) {
        Cookies.remove('user');
        Cookies.remove('user_role');
        router.push('/');
        router.refresh();
    }
};

    // ป้องกันการเห็นหน้าเว็บก่อนเช็คสิทธิ์เสร็จ
    if (!isClient || !user) {
        return <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center text-slate-400">Loading Realm...</div>;
    }

    return (
        <div className="min-h-screen bg-[#f8fafc]">
            <Navbar />
            <main className="max-w-4xl mx-auto py-12 px-6">
                <h1 className="text-3xl font-black text-slate-900 mb-8 uppercase tracking-tight">Settings</h1>
                
                <div className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-sm">
                    {/* Profile Section */}
                    <div className="p-8 border-b border-slate-50 flex items-center gap-6">
                        <div className="w-20 h-20 rounded-3xl bg-indigo-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-indigo-100">
                            {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-800">{user.username}</h2>
                            <p className="text-slate-400 text-sm font-medium">{user.email || 'Member of Mythic Craft'}</p>
                            <span className="inline-block mt-2 px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase rounded-full">
                                {user.role || 'User'}
                            </span>
                        </div>
                    </div>

                    {/* Settings Options */}
                    <div className="p-4 space-y-2">
                        <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-all group">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-white transition-colors">
                                    👤
                                </div>
                                <span className="font-bold text-slate-700">Account Information</span>
                            </div>
                            <span className="text-slate-300 group-hover:translate-x-1 transition-transform">→</span>
                        </button>

                        <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-all group">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-white transition-colors">
                                    🔒
                                </div>
                                <span className="font-bold text-slate-700">Privacy & Security</span>
                            </div>
                            <span className="text-slate-300 group-hover:translate-x-1 transition-transform">→</span>
                        </button>

                        <div className="my-4 border-t border-slate-50 mx-4"></div>

                        {/* Logout Tab */}
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-between p-4 hover:bg-red-50 rounded-2xl transition-all group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center group-hover:bg-white transition-colors">
                                    🚪
                                </div>
                                <span className="font-bold text-red-600">Logout from Realm</span>
                            </div>
                            <span className="text-red-200 group-hover:text-red-400 group-hover:translate-x-1 transition-transform">→</span>
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}