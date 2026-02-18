'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Cookies from 'js-cookie';
import Link from 'next/link';

// 1. สร้าง Hook สำหรับเช็คว่าเป็น Client หรือยัง (ไม่ต้องใช้ useEffect/setState)
const subscribe = () => () => {};
const useIsClient = () => useSyncExternalStore(subscribe, () => true, () => false);

interface User {
    username: string;
    role: string;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const isClient = useIsClient(); // จะเป็น true เมื่ออยู่บนเบราว์เซอร์ [cite: 2026-02-18]
    const router = useRouter();
    const pathname = usePathname();

    // 2. ใช้ Lazy Initializer อ่านจาก Cookie เหมือนเดิม
    const [user] = useState<User | null>(() => {
        const saved = Cookies.get('user');
        return saved ? JSON.parse(saved) : null;
    });

    useEffect(() => {
        // 3. เช็คสิทธิ์เฉพาะเมื่อเป็น Client แล้วและข้อมูลพร้อม
        // เราไม่เรียก setIsMounted(true) ในนี้แล้ว จึงไม่ติด Error
        if (isClient) {
            if (!user || user.role !== 'admin') {
                router.push('/login');
            }
        }
    }, [isClient, user, router]);

    const handleLogout = () => {
        Cookies.remove('user');
        Cookies.remove('user_role');
        router.push('/login');
    };

    // 4. ใช้ isClient แทน isMounted เพื่อป้องกัน Hydration Error
    if (!isClient || !user || user.role !== 'admin') {
        return <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center text-slate-400 font-bold">
            Checking Permissions...
        </div>;
    }

    return (
        <div className="flex min-h-screen bg-[#f8fafc]">
            {/* Sidebar UI */}
            <aside className="w-64 bg-white border-r border-slate-100 p-6 fixed h-full flex flex-col z-50">
                <div className="font-black text-xl text-indigo-600 mb-8 uppercase tracking-tighter">Mythic Admin</div>
                <nav className="flex-1 space-y-2">
                    <Link href="/admin" className={`block p-4 rounded-2xl font-bold transition-all ${pathname === '/admin' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-500 hover:bg-slate-50'}`}>Dashboard</Link>
                    <Link href="/admin/users" className={`block p-4 rounded-2xl font-bold transition-all ${pathname === '/admin/users' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-500 hover:bg-slate-50'}`}>Users List</Link>
                </nav>
                <button onClick={handleLogout} className="p-4 bg-red-50 text-red-500 font-bold hover:bg-red-500 hover:text-white rounded-2xl transition-all">Logout</button>
            </aside>
            <main className="flex-1 ml-64 p-10">{children}</main>
        </div>
    );
}