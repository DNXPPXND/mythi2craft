import { NextResponse } from 'next/server';
import { pool } from '@/app/lib/db';

export async function GET() {
  try {
    // ดึงข้อมูล series_id และ series_name จาก Database
    const [rows] = await pool.query(`
      SELECT series_id as id, series_name as name 
      FROM series 
      ORDER BY series_name ASC
    `);

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}