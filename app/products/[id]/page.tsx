'use client';
import { useState, useEffect } from 'react';
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useParams } from 'next/navigation';

interface ProductImage {
  image_url: string;
  is_main: number;
}

interface ProductDetail {
  id: number;
  name: string;
  description: string;
  price: number;
  series_name: string;
  stock_status: string;
  images: ProductImage[];
}

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id;

  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [mainImage, setMainImage] = useState<string>("");

  const getHighResUrl = (url: string) => url.split('?')[0];

  useEffect(() => {
    if (!id) return;

    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then((data: ProductDetail) => {
        setProduct(data);
        if (data.images?.length > 0) {
          setMainImage(getHighResUrl(data.images[0].image_url));
        }
      });
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-sm tracking-widest text-gray-400 uppercase">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

          {/* LEFT - IMAGE */}
          <div className="space-y-6">

            <div className="relative aspect-square bg-gray-50 rounded-3xl overflow-hidden">
              <Image
                src={mainImage}
                alt={product.name}
                fill
                className="object-contain"
                priority
                quality={100}
              />
            </div>

            {/* thumbnails */}
            <div className="flex gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(getHighResUrl(img.image_url))}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border transition ${
                    mainImage === getHighResUrl(img.image_url)
                      ? "border-black"
                      : "border-gray-200 opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={getHighResUrl(img.image_url)}
                    alt="thumbnail"
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT - INFO */}
          <div className="flex flex-col justify-center space-y-8">

            <div>
              <p className="text-xs tracking-widest text-gray-400 uppercase mb-3">
                {product.series_name}
              </p>

              <h1 className="text-4xl font-semibold text-black leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Price */}
            <div>
              <p className="text-3xl font-medium text-black">
                ฿{Number(product.price).toLocaleString()}
              </p>
            </div>

            {/* Description */}
            <p className="text-gray-500 leading-relaxed text-sm max-w-md">
              {product.description ||
                "A collectible art toy designed for collectors who appreciate minimal and iconic design."}
            </p>

            {/* CTA */}
            <div className="pt-6 space-y-4">

              <button
                disabled={product.stock_status === 'out_of_stock'}
                className={`w-full py-4 rounded-full text-sm tracking-widest font-medium transition ${
                  product.stock_status === 'out_of_stock'
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                {product.stock_status === 'out_of_stock'
                  ? "OUT OF STOCK"
                  : "ADD TO CART"}
              </button>

              <button className="w-full py-4 rounded-full border border-gray-300 text-sm tracking-widest font-medium hover:bg-gray-50 transition">
                ADD TO WISHLIST
              </button>

              <p className="text-xs text-gray-400 tracking-widest uppercase text-center">
                Free shipping over ฿5,000
              </p>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}