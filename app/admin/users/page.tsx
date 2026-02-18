'use client';

import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

interface UserData {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
    created_at: string;
}

export default function AdminUsersPage() {
    const [users, setUsers] = useState<UserData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const res = await fetch('/api/user'); // เรียก API ที่แยกโฟลเดอร์แล้ว
            if (!res.ok) throw new Error('Failed to fetch');
            const data = await res.json();
            setUsers(data);
        } catch (error) {
            Swal.fire('Error', 'ไม่สามารถดึงข้อมูลผู้ใช้ได้', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (isLoading) return <div className="p-10 text-center text-slate-400">Loading system data...</div>;

    // แยกกลุ่มข้อมูลตาม Role
    const admins = users.filter(u => u.role === 'admin');
    const customers = users.filter(u => u.role !== 'admin');

    // Reusable Component สำหรับตารางเพื่อความสะอาดของโค้ด
    const UserTable = ({ title, data, accentColor }: { title: string, data: UserData[], accentColor: string }) => (
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full">
            <div className={`p-6 border-b border-slate-50 flex justify-between items-center ${accentColor === 'indigo' ? 'bg-indigo-50/30' : 'bg-emerald-50/30'}`}>
                <h2 className={`font-black text-lg ${accentColor === 'indigo' ? 'text-indigo-800' : 'text-emerald-800'}`}>
                    {title} ({data.length})
                </h2>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="text-slate-400 text-[11px] uppercase tracking-wider">
                        <tr>
                            <th className="p-6 font-bold">User / Email</th>
                            <th className="p-6 font-bold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 text-sm">
                        {data.map((u) => (
                            <tr key={u.id} className="hover:bg-slate-50/30 transition-colors">
                                <td className="p-6">
                                    <div className="font-bold text-slate-700">{u.username}</div>
                                    <div className="text-[12px] text-slate-400">{u.email}</div>
                                </td>
                                <td className="p-6 text-right space-x-2">
                                    <button className="text-slate-400 hover:text-indigo-600 transition-colors font-bold text-xs">Edit</button>
                                    <button className="text-slate-300 hover:text-red-500 transition-colors font-bold text-xs">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div className="p-2 md:p-6 space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-slate-800">User Management</h1>
                    <p className="text-slate-400 text-sm mt-1">Manage system administrators and customers.</p>
                </div>
                <button className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg">
                    + Create Account
                </button>
            </div>

            {/* Grid Layout: แบ่งซ้ายขวา */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* กล่องซ้าย: Admin Role */}
                <UserTable title="Administrators" data={admins} accentColor="indigo" />

                {/* กล่องขวา: Customer/User Role */}
                <UserTable title="Registered Users" data={customers} accentColor="emerald" />
            </div>
        </div>
    );
}