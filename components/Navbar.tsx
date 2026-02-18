'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface NavbarProps {
    user: { username: string } | null;
    onLogout: () => void;
}

export default function Navbar({ user, onLogout }: NavbarProps) {
    ;

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-3">
            <div className="max-w-7xl mx-auto flex justify-between items-center">

                {/* Logo Section */}
                <Link
                    href="/"
                    className="flex items-center gap-2 cursor-pointer group"
                >
                    
                    <h1 className="text-xl text-gray-700 font-extrabold bg-clip-text tracking-tight">
                        Mythic Craft
                    </h1>
                </Link>

                <ul className="hidden md:flex gap-6">
                    <li>
                        <Link
                            href="/"
                            className="relative text-sm font-medium text-gray-700 hover:text-indigo-600 transition after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-indigo-600 after:transition-all after:duration-300 hover:after:w-full"
                        >
                            Home
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/products"
                            className="relative text-sm font-medium text-gray-700 hover:text-indigo-600 transition after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-indigo-600 after:transition-all after:duration-300 hover:after:w-full"
                        >
                            Products
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/about"
                            className="relative text-sm font-medium text-gray-700 hover:text-indigo-600 transition after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-indigo-600 after:transition-all after:duration-300 hover:after:w-full"
                        >
                            About Us
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/contact"
                            className="relative text-sm font-medium text-gray-700 hover:text-indigo-600 transition after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-indigo-600 after:transition-all after:duration-300 hover:after:w-full"
                        >
                            Contact
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/settings"
                            className="relative text-sm font-medium text-gray-700 hover:text-indigo-600 transition after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-indigo-600 after:transition-all after:duration-300 hover:after:w-full"
                        >
                            Settings
                        </Link>
                    </li>
                </ul>
                
            </div>
        </nav>
    );
}
