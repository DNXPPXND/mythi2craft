'use client';

import { useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const subscribe = () => () => { };
const useIsClient = () => useSyncExternalStore(subscribe, () => true, () => false);

export default function Navbar() {
    const isClient = useIsClient();
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const user = isClient ? (() => {
        const saved = Cookies.get('user');
        try { return saved ? JSON.parse(saved) : null; } catch { return null; }
    })() : null;

    const onLogout = () => {
        Cookies.remove('user');
        Cookies.remove('user_role');
        setIsOpen(false);
        router.push('/login');
        router.refresh();
    };

    const baseLinks = [
        { name: 'Home', href: '/' },
        { name: 'Products', href: '/products' },
        { name: 'About Us', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];

    const navLinks = user?.role === 'admin'
        ? [...baseLinks, { name: 'Admin Panel', href: '/admin' }]
        : user ? [...baseLinks, { name: 'Settings', href: '/settings' }] : baseLinks;

    return (
        <nav className="sticky top-0 z-100 bg-white border-b border-gray-100 px-6 py-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">

                {/* Logo Section */}
                <Link href="/" className="flex items-center gap-2 z-110">
                    <h1 className={`text-xl font-bold transition-colors ${isOpen ? 'text-white' : 'text-gray-900'}`}>
                        Mythic Craft
                    </h1>
                </Link>

                {/* Mobile Toggle Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden z-110 relative text-2xl focus:outline-none"
                >
                    {isOpen ? (
                        <span className="text-white text-3xl">✕</span>
                    ) : (
                        <div className="flex flex-col gap-1.5">
                            <span className="w-6 h-0.5 bg-gray-900"></span>
                            <span className="w-6 h-0.5 bg-gray-900"></span>
                            <span className="w-6 h-0.5 bg-gray-900"></span>
                        </div>
                    )}
                </button>

                {/* ✅ Mobile Menu */}
                <div className={`fixed inset-0 bg-slate-950 z-90 flex flex-col p-8 pt-28 transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                    } md:hidden`}>
                    <div className="grow">
                        <ul className="flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <li key={link.href} onClick={() => setIsOpen(false)}>
                                    <Link href={link.href} className="text-3xl font-bold text-white hover:text-indigo-400">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <div className="mt-auto border-t border-white/10 pt-6">
                        {user ? (
                            <div className="space-y-4">
                                <div className="text-sm text-slate-400">
                                    User: <span className="text-white font-medium">{user.username}</span>
                                </div>
                                <button
                                    onClick={onLogout}
                                    className="w-full bg-red-600 text-white py-4 rounded-xl font-bold active:bg-red-700"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                onClick={() => setIsOpen(false)}
                                className="block w-full text-center bg-indigo-600 text-white py-4 rounded-xl font-bold"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>

                {/* ✅ Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    <ul className="flex gap-8">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link href={link.href} className="text-sm font-bold text-gray-600 hover:text-indigo-600 transition-colors">
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* ✅ Login Button with Arrow Animation (Only shown if not logged in) */}
                    {!user && (
                        <Link 
                            href="/login" 
                            className="group flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-indigo-700 transition-all duration-300"
                        >
                            <span>Login</span>
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                strokeWidth={2.5} 
                                stroke="currentColor" 
                                className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </Link>
                    )}

                    
                </div>
            </div>
        </nav>
    );
}