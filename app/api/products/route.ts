import { NextResponse } from 'next/server';
import {pool} from '@/app/lib/db';

export async function GET() {
    try {
        const result = await pool.query('SELECT * FROM products WHERE is_new_collection = true ORDER BY created_at DESC LIMIT 3');
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
}