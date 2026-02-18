'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface NavbarProps {
    user: { username: string } | null;
    onLogout: () => void;
}

export default function Navbar({ user, onLogout }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const baseLinks = [
        { name: 'Home', href: '/' },
        { name: 'Products', href: '/products' },
        { name: 'About Us', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];

    const navLinks = user
        ? [...baseLinks, { name: 'Settings', href: '/settings' }]
        : baseLinks;

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-3">
            <div className="max-w-7xl mx-auto flex justify-between items-center">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group z-50">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 group-hover:scale-105 transition-transform">
                        <span className="text-white font-black text-xl">M</span>
                    </div>
                    <h1 className="text-xl font-extrabold text-gray-800 tracking-tight">Mythic Craft</h1>
                </Link>

                {/* Desktop Menu */}
                <ul className="hidden md:flex gap-8">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className="text-sm font-semibold text-gray-600 hover:text-indigo-600 transition-colors"
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Desktop Auth */}
                <div className="hidden md:flex items-center gap-4">
                    {user ? (
                        <>
                            <span className="text-sm font-bold text-gray-700">
                                {user.username}
                            </span>

                            <button
                                onClick={onLogout}
                                className="bg-red-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-md hover:bg-red-700 transition-all"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link
                            href="/login"
                            className="bg-indigo-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-md hover:bg-indigo-700 transition-all"
                        >
                            Login
                        </Link>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden z-50"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="w-6 h-0.5 bg-gray-600 mb-1.5"></div>
                    <div className="w-6 h-0.5 bg-gray-600 mb-1.5"></div>
                    <div className="w-6 h-0.5 bg-gray-600"></div>
                </button>

                {/* Mobile Menu */}
                <div
                    className={`fixed inset-0 bg-white z-40 flex flex-col p-10 transition-transform duration-300 md:hidden ${
                        isOpen ? 'translate-y-0' : '-translate-y-full'
                    }`}
                >
                    <ul className="mt-16 flex flex-col gap-6 text-2xl font-bold">
                        {navLinks.map((link) => (
                            <li key={link.href} onClick={() => setIsOpen(false)}>
                                <Link href={link.href}>{link.name}</Link>
                            </li>
                        ))}
                    </ul>

                    {/* Mobile Auth */}
                    <div className="mt-10">
                        {user ? (
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    onLogout();
                                }}
                                className="w-full bg-red-600 text-white py-3 rounded-xl font-bold"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link
                                href="/login"
                                onClick={() => setIsOpen(false)}
                                className="block w-full text-center bg-indigo-600 text-white py-3 rounded-xl font-bold"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
