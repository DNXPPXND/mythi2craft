'use client';

import { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Link from 'next/link';
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image_url: string;
  category: string;
  is_new_collection: number;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true);
        const res = await fetch('/api/products');
        const data = await res.json();

        const newArrivals = data.filter(
          (p: Product) => p.is_new_collection === 1
        );

        setProducts(newArrivals);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />

      <main>
        <div className="py-20 text-center"><h1 className="text-4xl font-black text-gray-800">New Arrivals</h1>
          <p className="text-gray-400 mt-2">Discover our latest art toys collection!</p>
        </div>

      </main>

      <footer className="border-t border-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-400 text-[10px] uppercase font-bold">
          © 2026 Mythic Craft. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
