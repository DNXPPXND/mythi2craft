"use client";

import Navbar from "@/components/Navbar";

export default function AboutPage() {
  return (
   <>
   <Navbar />
   <div className="min-h-screen bg-gray-50 px-6 py-20">
        
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
          About Mythic Craft
        </h1>

        <p className="text-lg text-gray-600 leading-relaxed mb-8">
          Mythic Craft is a premium Art Toy brand inspired by mythology,
          creativity, and modern collectible culture. We design characters
          that blend ancient legends with futuristic imagination.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-12">

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-3 text-indigo-600">Our Vision</h3>
            <p className="text-gray-600">
              To become a global art toy brand that tells powerful mythological
              stories through collectible design.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-3 text-indigo-600">Our Craft</h3>
            <p className="text-gray-600">
              Every figure is carefully crafted with premium materials and
              detailed sculpting to ensure uniqueness and quality.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-3 text-indigo-600">Our Community</h3>
            <p className="text-gray-600">
              We build a creative community of collectors, artists, and dreamers
              who love mythology and design.
            </p>
          </div>

        </div>

      </div>
    </div>
   </> 
    
  );
}
