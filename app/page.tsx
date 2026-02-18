'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from "@/components/Navbar";
import Swal from 'sweetalert2';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

export default function HomePage() {
  const router = useRouter();



  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Leaving so soon?',
      text: 'You are about to sign out from ArtToy Shop.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, log me out',
      cancelButtonText: 'Stay logged in'
    });


    if (result.isConfirmed) {
      localStorage.removeItem('user');
      setUser(null);

      await Swal.fire({
        title: 'See you again!',
        text: 'You have been signed out successfully.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });


      router.push('/login');
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar user={user} onLogout={handleLogout} />
      <main className="flex-1 flex items-center justify-center">
        <h2 className="text-3xl font-bold text-gray-800">
          Welcome to Mythic Craft
        </h2>
      </main>
      {/* --- Footer --- */}
      <footer className="border-t border-slate-100 bg-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-400 text-sm">
          © 2026 Mythic Craft. All rights reserved.
        </div>
      </footer>

    </div>
  );
}
