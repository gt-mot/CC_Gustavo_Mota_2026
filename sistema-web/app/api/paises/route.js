import { NextResponse } from 'next/server';
import { getConnection } from '@/lib/db';

export async function GET() {
  try {
    const conn = await getConnection();
    const [rows] = await conn.execute(
      'SELECT id_pais, pais, sigla, data_inclusao FROM paises ORDER BY pais'
    );
    await conn.end();
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error('Erro ao listar países:', error);
    return NextResponse.json(
      { message: 'Erro ao listar países.' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { pais, sigla } = body;

    if (!pais || !sigla) {
      return NextResponse.json(
        { message: 'Informe país e sigla.' },
        { status: 400 }
      );
    }

    const conn = await getConnection();
    await conn.execute(
      'INSERT INTO paises (pais, sigla) VALUES (?, ?)',
      [pais, sigla]
    );
    await conn.end();

    return NextResponse.json(
      { message: 'País cadastrado com sucesso.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erro ao cadastrar país:', error);
    return NextResponse.json(
      { message: 'Erro ao cadastrar país.' },
      { status: 500 }
    );
  }
}