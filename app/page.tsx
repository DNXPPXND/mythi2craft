'use client';

import { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

const FEATURED_PRODUCTS = [
  {
    id: "Molly-01",
    name: "MEGA SPACE MOLLY 400% PREMIUM",
    price: "12,900",
    img: "https://prod-eurasian-res.popmart.com/default/20231031_145343_115543__1200x1200.jpg",
    collection: "Celestial Series",
    description: "A symbol of curiosity and exploration, the Mega Space Molly embodies the spirit of cosmic discovery with high-gloss finish and articulated suit mechanics."
  },
  {
    id: "Skull-02",
    name: "SKULLPANDA THE WINTER SOLSTICE",
    price: "3,290",
    img: "https://prod-thailand-res.popmart.com/default/20240807_093057_998470____4_____1200x1200.jpg",
    collection: "Ancient Winter",
    description: "Capturing the serene silence of falling snow, this edition explores the intersection of ethereal beauty and the chilling depths of winter's grace."
  },
  {
    id: "Cry-03",
    name: "CRYBABY DREAM SCAPE EDITION",
    price: "2,990",
    img: "https://prod-thailand-res.popmart.com/default/20241009_175417_020072____2_____1200x1200.jpg",
    collection: "Artist Signature",
    description: "An emotional masterpiece reflecting the vulnerability of dreams. Each tear is rendered with a translucent finish to symbolize clarity through sorrow."
  },
  {
    id: "Labu-04",
    name: "THE MONSTERS LABUBU HERITAGE",
    price: "3,490",
    img: "https://prod-eurasian-res.popmart.com/default/20240617_155353_857856____2_____1200x1200.jpg",
    collection: "Forest Legend",
    description: "A mischievous yet elegant interpretation of the forest spirit. Labubu features intricate fur-texturing and a gaze that captures ancient forest secrets."
  },
];

export default function HomePage() {
  return (
    <div className="bg-[#fcfcfc] min-h-screen text-[#1a1a1a] font-serif selection:bg-[#d4af37] selection:text-white">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative h-[90vh] w-full flex items-center justify-center bg-[#f3f1ed]">
        <Image 
          src="https://prod-thailand-res.popmart.com/default/20241114_154707_877955____20241114-153257_____1200x1200.jpg"
          alt="Luxury Campaign"
          fill
          className="object-cover opacity-90 transition-transform duration-[10s] hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 text-center text-white space-y-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
            <h1 className="text-7xl md:text-[10rem] font-light tracking-tighter leading-none italic mb-4">
              The <span className="font-serif not-italic">Vault</span>
            </h1>
            <p className="text-[10px] tracking-[0.6em] font-bold uppercase">Mythic Craft Heritage Drop 2026</p>
          </motion.div>
        </div>
      </section>

      {/* 2. COLLECTION PHILOSOPHY (Rich Text Section) */}
      <section className="py-32 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div className="space-y-8">
          <h2 className="text-4xl md:text-5xl font-light leading-tight italic">
            Where Modern Art <br /> Meets <span className="text-[#d4af37]">Collectibility.</span>
          </h2>
          <div className="space-y-6 text-[#8a817c] font-sans text-sm leading-loose tracking-wide">
            <p>
              <strong>MOLLY</strong> Driven by an insatiable curiosity, Molly has become an icon of the modern art toy movement. Her blank expression serves as a canvas for the collector Is own emotions, making her the most versatile artifact in our gallery.
            </p>
            <p>
              <strong>SKULLPANDA —</strong> A profound exploration of the self and the universe. Skullpanda represents the duality of existence, blending bold aesthetics with a delicate, almost haunting spiritual depth that resonates with global connoisseurs.
            </p>
            <p>
              <strong>LABUBU —</strong> The mischievous heart of the forest. Labubu represents the untamed creativity of the Monsters series, combining intricate craftsmanship with a narrative that spans across ancient folklore and modern pop culture.
            </p>
          </div>
          <Link href="/products" className="inline-block border-b border-black pb-2 text-xs font-bold uppercase tracking-widest hover:text-[#d4af37] transition-colors">
            Explore Full Archive →
          </Link>
        </div>
        <div className="relative aspect-[4/5] bg-gray-100 rounded-sm overflow-hidden shadow-2xl">
          <Image 
            src="https://prod-eurasian-res.popmart.com/default/20231031_145343_115543__1200x1200.jpg" 
            alt="Molly Detail" 
            fill 
            className="object-cover"
          />
        </div>
      </section>

      {/* 3. PRODUCT GRID: FULL BLEED CARDS */}
      <section className="py-24 bg-white">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="text-center mb-20 space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#d4af37]">Current Selection</h3>
            <h2 className="text-4xl font-light italic uppercase tracking-widest">Seasonal Masterpieces</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {FEATURED_PRODUCTS.map((product) => (
              <div key={product.id} className="group flex flex-col">
                {/* Image: FULL CARD BLEED */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[#f9f9f9]">
                  <Image
                    src={product.img}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-white/80 backdrop-blur-sm">
                    <button className="w-full py-4 text-[10px] font-black uppercase tracking-widest border border-black hover:bg-black hover:text-white transition-all">
                      Acquire Piece
                    </button>
                  </div>
                </div>

                {/* Rich Information Area */}
                <div className="pt-8 space-y-4 flex-1">
                  <div className="flex justify-between items-baseline border-b border-gray-100 pb-2">
                    <p className="text-[9px] font-black text-[#d4af37] uppercase tracking-[0.3em]">{product.collection}</p>
                    <p className="font-sans font-medium text-sm">฿{product.price}</p>
                  </div>
                  <h3 className="text-lg font-light tracking-wide uppercase leading-tight group-hover:italic transition-all">
                    {product.name}
                  </h3>
                  <p className="text-[11px] text-[#8a817c] leading-relaxed font-sans line-clamp-3 italic">
                    {product.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. LUXE NEWSLETTER */}
      <section className="bg-[#f3f1ed] py-32 border-y border-gray-200">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-10">
          <h2 className="text-3xl font-light italic uppercase tracking-tighter">Enter the Inner Circle</h2>
          <p className="text-sm text-[#8a817c] font-sans tracking-wide">
            Subscribe to receive exclusive insights into artist collaborations and early access to archival drops.
          </p>
          <div className="flex border-b border-black pb-4 group">
            <input 
              type="email" 
              placeholder="YOUR EMAIL ADDRESS" 
              className="bg-transparent flex-1 outline-none text-[11px] font-bold tracking-[0.3em] placeholder:text-gray-300" 
            />
            <button className="text-[11px] font-black uppercase tracking-widest hover:text-[#d4af37] transition-colors">Join</button>
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20 font-sans">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <h2 className="text-2xl font-serif italic tracking-tighter">Mythic Craft Archive</h2>
            <p className="text-xs text-[#8a817c] leading-loose uppercase tracking-widest">
              Bangkok • Tokyo • Paris <br />
              The Art of Global Collecting
            </p>
          </div>
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em]">Directory</h4>
            <ul className="text-[10px] space-y-4 text-[#8a817c] uppercase tracking-widest font-bold">
              <li><Link href="#" className="hover:text-black">Private Sales</Link></li>
              <li><Link href="#" className="hover:text-black">Shipping & Concierge</Link></li>
              <li><Link href="#" className="hover:text-black">Artist Portfolio</Link></li>
            </ul>
          </div>
          <div className="space-y-6 text-right">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em]">Legal</h4>
            <ul className="text-[10px] space-y-4 text-[#8a817c] uppercase tracking-widest font-bold">
              <li><Link href="#" className="hover:text-black">Terms of Heritage</Link></li>
              <li><Link href="#" className="hover:text-black">Privacy Protection</Link></li>
              <li><Link href="#" className="hover:text-black">Authenticity Guarantee</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-10 text-center text-[9px] font-bold text-gray-400 uppercase tracking-[0.5em]">
          © 2026 Mythic Craft Archive Group. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}