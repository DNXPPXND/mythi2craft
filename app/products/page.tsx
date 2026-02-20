'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";

interface Product {
  id: number;
  name: string;
  price: number;
  series: string;
  image_url: string;
  stock_status: string;
}

interface Category {
  id: string | number;
  name: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const [prodRes, catRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/categories')
        ]);
        const prodData = await prodRes.json();
        const catData = await catRes.json();
        
        setProducts(prodData);
        setCategories([{ id: 'all-category', name: 'ALL' }, ...catData]);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        // ให้ Skeleton แสดงผลอย่างน้อย 600ms เพื่อความสมูท
        setTimeout(() => setIsLoading(false), 600);
      }
    }
    fetchData();
  }, []);

  const filteredProducts = selectedCategory === "ALL" 
    ? products 
    : products.filter(p => p.series === selectedCategory);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />
      
      <main className="max-w-[1400px] mx-auto px-6 py-12">
        {/* หัวข้อหน้า */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-black italic uppercase tracking-tighter text-gray-900 leading-none mb-4">
            Mythic Vault
          </h1>
          <div className="flex items-center gap-3">
             <span className="h-1 w-12 bg-black"></span>
             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">
               Curated Art Toys / {selectedCategory}
             </p>
          </div>
        </motion.div>

        {/* 1. แก้ไขหมวดหมู่ (Category Grid) ตามแบบ */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={`cat-btn-${cat.id}`} // แก้ปัญหา Key ซ้ำ
              onClick={() => setSelectedCategory(cat.name)}
              className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 group ${
                selectedCategory === cat.name 
                ? "bg-black border-black text-white shadow-xl" 
                : "bg-white border-gray-100 text-gray-600 hover:border-gray-300"
              }`}
            >
              <span className="text-[11px] font-black uppercase tracking-tight">{cat.name}</span>
              <div className={`w-1.5 h-1.5 rounded-full transition-colors ${selectedCategory === cat.name ? "bg-white" : "bg-gray-200 group-hover:bg-gray-400"}`} />
            </button>
          ))}
        </div>

        {/* 2. รายการสินค้าพร้อมลูกเล่น Animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-20">
          <AnimatePresence mode='wait'>
            {isLoading ? (
              // Skeleton Loading ปรับปรุงใหม่
              [...Array(8)].map((_, i) => (
                <div key={`skeleton-${i}`} className="animate-pulse">
                  <div className="aspect-square bg-gray-200 rounded-[3rem] mb-6"></div>
                  <div className="h-3 bg-gray-200 rounded-full w-1/4 mb-4"></div>
                  <div className="h-5 bg-gray-200 rounded-full w-3/4"></div>
                </div>
              ))
            ) : (
              filteredProducts.map((product, index) => (
                <motion.div
                  key={`prod-card-${product.id}-${index}`} // มั่นใจว่า Key ไม่ซ้ำแน่นอน
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                >
                  <Link href={`/products/${product.id}`} className="group block">
                    {/* Image Wrapper */}
                    <div className="relative aspect-square mb-8 overflow-hidden rounded-[3rem] bg-white shadow-sm border border-gray-50 transition-all duration-700 group-hover:shadow-2xl group-hover:-translate-y-2">
                      <Image
                        src={product.image_url || "/placeholder.png"}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 25vw"
                      />
                      
                      {product.stock_status === 'out_of_stock' && (
                        <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] flex items-center justify-center">
                          <span className="bg-black text-white text-[9px] font-black px-5 py-2.5 rounded-full tracking-widest uppercase shadow-lg">Sold Out</span>
                        </div>
                      )}
                    </div>

                    <div className="px-2">
                      <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <span className="w-4 h-[1px] bg-blue-600"></span>
                        {product.series}
                      </p>
                      <h3 className="text-lg font-bold text-gray-900 line-clamp-1 mb-2 group-hover:text-blue-600 transition-colors uppercase italic tracking-tighter">
                        {product.name}
                      </h3>
                      <p className="text-xl font-black text-gray-900 tracking-tighter">
                        ฿{Number(product.price).toLocaleString()}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}