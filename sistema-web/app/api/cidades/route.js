import { NextResponse } from 'next/server';
import { getConnection } from '@/lib/db';

// GET /api/cidades?filtro=Curitiba&id_estado=1
export async function GET(request) {
  let conn;
  try {
    conn = await getConnection();

    const { searchParams } = new URL(request.url);
    const filtro = searchParams.get('filtro') || '';
    const id_estado = searchParams.get('id_estado') || '';

    let sql = `
      SELECT 
        c.id_cidade,
        c.cidade,
        c.id_estado,
        e.estado,
        e.uf,
        e.id_pais,
        p.pais,
        p.sigla
      FROM cidades c
      JOIN estados e ON e.id_estado = c.id_estado
      JOIN paises p ON p.id_pais = e.id_pais
      WHERE 1 = 1
    `;
    const params = [];

    if (filtro) {
      sql += ` AND c.cidade LIKE ?`;
      params.push(`%${filtro}%`);
    }

    if (id_estado) {
      sql += ` AND c.id_estado = ?`;
      params.push(id_estado);
    }

    sql += ` ORDER BY p.pais, e.estado, c.cidade`;

    const [rows] = await conn.execute(sql, params);

    // compatível: devolve array simples
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error('Erro ao listar cidades:', error);
    return NextResponse.json(
      { message: 'Erro ao listar cidades.' },
      { status: 500 }
    );
  } finally {
    if (conn) {
      await conn.end();
    }
  }
}

// POST /api/cidades
export async function POST(request) {
  let conn;
  try {
    const body = await request.json();
    const { cidade, id_estado } = body;

    if (!cidade || !id_estado) {
      return NextResponse.json(
        { message: 'Informe cidade e estado.' },
        { status: 400 }
      );
    }

    conn = await getConnection();

    await conn.execute(
      'INSERT INTO cidades (cidade, id_estado) VALUES (?, ?)',
      [cidade, Number(id_estado)]
    );

    return NextResponse.json(
      { message: 'Cidade cadastrada com sucesso.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erro ao cadastrar cidade:', error);
    return NextResponse.json(
      { message: 'Erro ao cadastrar cidade.' },
      { status: 500 }
    );
  } finally {
    if (conn) {
      await conn.end();
    }
  }
}