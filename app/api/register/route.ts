import { NextResponse } from 'next/server';
// แก้ไข Path ตามโครงสร้างที่คุณมี
import { pool } from '@/app/lib/db'; 
import bcrypt from 'bcryptjs';
import { RowDataPacket } from 'mysql2';

export async function POST(request: Request) {
  try {
    const { username, password, email, first_name, last_name } = await request.json();

    const [existingUser] = await pool.query<RowDataPacket[]>(
      'SELECT id FROM users WHERE username = ? OR email = ?',
      [username, email]
    );

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: "ชื่อผู้ใช้หรืออีเมลนี้ถูกใช้ไปแล้ว" }, 
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      'INSERT INTO users (username, password, email, first_name, last_name) VALUES (?, ?, ?, ?, ?)',
      [username, hashedPassword, email, first_name, last_name]
    );

    return NextResponse.json(
      { message: "สมัครสมาชิกสำเร็จ" }, 
      { status: 201 }
    );

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Database Error:', error);
    
    return NextResponse.json({ 
      error: errorMessage 
    }, { status: 500 });
  }
}