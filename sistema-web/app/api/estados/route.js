import { NextResponse } from 'next/server';
import { getConnection } from '@/lib/db';

// GET /api/estados?filtro=PR
export async function GET(request) {
  let conn;
  try {
    conn = await getConnection();

    const { searchParams } = new URL(request.url);
    const filtro = searchParams.get('filtro') || '';

    let sql = `
      SELECT 
        e.id_estado,
        e.estado,
        e.uf,
        e.id_pais,
        p.pais,
        p.sigla
      FROM estados e
      JOIN paises p ON p.id_pais = e.id_pais
      WHERE 1 = 1
    `;
    const params = [];

    if (filtro) {
      sql += ` AND (e.estado LIKE ? OR e.uf LIKE ?)`;
      params.push(`%${filtro}%`, `%${filtro}%`);
    }

    sql += ` ORDER BY p.pais, e.estado`;

    const [rows] = await conn.execute(sql, params);

    // mantém compatível com seu padrão antigo (array simples)
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error('Erro ao listar estados:', error);
    return NextResponse.json(
      { message: 'Erro ao listar estados.' },
      { status: 500 }
    );
  } finally {
    if (conn) {
      await conn.end();
    }
  }
}

// POST /api/estados
export async function POST(request) {
  let conn;
  try {
    const body = await request.json();
    const { estado, uf, id_pais } = body;

    if (!estado || !uf || !id_pais) {
      return NextResponse.json(
        { message: 'Informe estado, UF e país.' },
        { status: 400 }
      );
    }

    conn = await getConnection();

    await conn.execute(
      'INSERT INTO estados (estado, uf, id_pais) VALUES (?, ?, ?)',
      [estado, uf, Number(id_pais)]
    );

    return NextResponse.json(
      { message: 'Estado cadastrado com sucesso.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erro ao cadastrar estado:', error);
    return NextResponse.json(
      { message: 'Erro ao cadastrar estado.' },
      { status: 500 }
    );
  } finally {
    if (conn) {
      await conn.end();
    }
  }
}