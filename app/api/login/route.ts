import { NextResponse } from 'next/server';
import { pool } from '@/app/lib/db';
import bcrypt from 'bcryptjs';
import { RowDataPacket } from 'mysql2'; 

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM users WHERE email = ?', 
      [email]
    );
    
    const user = rows[0];

    if (!user) {
      return NextResponse.json({ error: "ไม่พบอีเมลนี้ในระบบ" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return NextResponse.json({ error: "รหัสผ่านไม่ถูกต้อง" }, { status: 401 });
    }

    return NextResponse.json({
      message: "Login Success",
      user: { 
        id: user.id, 
        username: user.username, 
        email: user.email, 
        role: user.role 
      }
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Login Error:', error); 
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}