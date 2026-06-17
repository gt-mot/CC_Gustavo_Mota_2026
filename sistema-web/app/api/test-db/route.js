import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    
    return NextResponse.json({
      success: true,
      message: 'Conexão com MySQL funcionando!',
      data: rows[0]
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Erro ao conectar com MySQL',
      error: error.message
    }, { status: 500 });
  }
}