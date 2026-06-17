import { NextResponse } from 'next/server';
import { getConnection } from '@/lib/db';

export async function GET() {
  try {
    const conn = await getConnection();
    const [rows] = await conn.execute(
      `SELECT f.*, cid.cidade
       FROM fornecedores f
       JOIN cidades cid ON cid.id_cidade = f.id_cidade
       ORDER BY f.fornecedor`
    );
    await conn.end();
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error('Erro ao listar fornecedores:', error);
    return NextResponse.json(
      { message: 'Erro ao listar fornecedores.' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      fornecedor,
      nome_fantasia,
      documento,
      registro_geral,
      email,
      telefone,
      site,
      logradouro,
      numero,
      bairro,
      cep,
      id_cidade,
    } = body;

    if (!fornecedor || !documento || !id_cidade) {
      return NextResponse.json(
        { message: 'Preencha os campos obrigatórios.' },
        { status: 400 }
      );
    }

    const conn = await getConnection();
    await conn.execute(
      `INSERT INTO fornecedores
       (fornecedor, nome_fantasia, documento, registro_geral,
        email, telefone, site, logradouro, numero, bairro, cep, id_cidade)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        fornecedor,
        nome_fantasia || null,
        documento,
        registro_geral || null,
        email || null,
        telefone || null,
        site || null,
        logradouro || null,
        numero || null,
        bairro || null,
        cep || null,
        id_cidade,
      ]
    );
    await conn.end();

    return NextResponse.json(
      { message: 'Fornecedor cadastrado com sucesso.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erro ao cadastrar fornecedor:', error);
    return NextResponse.json(
      { message: 'Erro ao cadastrar fornecedor.' },
      { status: 500 }
    );
  }
}