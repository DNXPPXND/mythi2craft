import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/app/lib/db';

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    return NextResponse.json(rows);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    console.error('Database Error:', error);
    return NextResponse.json({ 
      error: errorMessage 
    }, { status: 500 });
  }
}