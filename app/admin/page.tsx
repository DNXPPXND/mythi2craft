export default function AdminDashboardPage() {
    return (
        <div>
            <h1 className="text-2xl font-black text-slate-800 mb-8">System Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                    <p className="text-slate-400 font-bold text-sm uppercase tracking-wider">Active Users</p>
                    <h2 className="text-4xl font-black text-slate-800 mt-2">1,248</h2>
                </div>
                {/* เพิ่ม Card อื่นๆ ได้ที่นี่ */}
            </div>
        </div>
    );
}