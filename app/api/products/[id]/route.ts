import { NextResponse } from 'next/server';
import { pool } from '@/app/lib/db';
import { RowDataPacket } from 'mysql2';

interface ProductDetailRow extends RowDataPacket {
  id: number;
  name: string;
  description: string;
  price: number;
  series_name: string;
}

interface ImageRow extends RowDataPacket {
  image_url: string;
  is_main: number;
}

// ระบุ Type ให้ params
export async function GET(
  req: Request, 
  { params }: { params: Promise<{ id: string }> } // Next.js 15+ ต้องใช้ Promise
) {
  const { id } = await params;

  try {
    // 1. ดึงข้อมูลสินค้า
    const [products] = await pool.query<ProductDetailRow[]>(`
      SELECT p.*, s.series_name FROM products p 
      LEFT JOIN series s ON p.series_id = s.series_id 
      WHERE p.id = ?`, [id]);

    if (products.length === 0) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    // 2. ดึงรูปภาพทั้งหมด
    const [images] = await pool.query<ImageRow[]>(`
      SELECT image_url, is_main FROM product_images WHERE product_id = ? 
      ORDER BY is_main DESC`, [id]);

    return NextResponse.json({ ...products[0], images });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}