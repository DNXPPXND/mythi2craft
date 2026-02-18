'use client';
import Navbar from '@/components/Navbar';

export default function ProductsPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar  />
            <div className="py-20 text-center">
                <h1 className="text-4xl font-black text-gray-800">Products Catalog</h1>
                <p className="text-gray-400 mt-2">New art toys are coming soon!</p>
            </div>
        </div>
    );
}