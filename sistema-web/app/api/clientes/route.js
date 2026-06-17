import { NextResponse } from 'next/server';
import { getConnection } from '@/lib/db';

// GET /api/clientes?filtro=joao
export async function GET(request) {
  let conn;
  try {
    conn = await getConnection();

    const { searchParams } = new URL(request.url);
    const filtro = searchParams.get('filtro') || '';

    let sql = `
      SELECT 
        c.cliente,
        c.tipo,
        c.logradouro,
        c.numero,
        c.complemento,
        c.bairro,
        c.cep,
        c.idcidade,
        c.email,
        c.telefone,
        c.cpfcnpj,
        c.rginsest,
        c.datanascimento,
        c.idcondicaopagamento,
        c.limitecredito,
        c.status,
        c.observacoes,
        cid.cidade,
        e.estado,
        e.uf,
        p.pais,
        p.sigla
      FROM clientes c
      LEFT JOIN cidades cid ON cid.idcidade = c.idcidade
      LEFT JOIN estados e ON e.idestado = cid.idestado
      LEFT JOIN paises p ON p.idpais = e.idpais
      WHERE 1 = 1
    `;
    const params = [];

    if (filtro) {
      sql += ` AND (c.cliente LIKE ? OR c.email LIKE ? OR c.cpfcnpj LIKE ?)`;
      params.push(`%${filtro}%`, `%${filtro}%`, `%${filtro}%`);
    }

    sql += ` ORDER BY c.cliente`;

    const [rows] = await conn.execute(sql, params);

    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error('Erro ao listar clientes:', error);
    return NextResponse.json(
      { message: 'Erro ao listar clientes.' },
      { status: 500 }
    );
  } finally {
    if (conn) {
      await conn.end();
    }
  }
}

// POST /api/clientes
export async function POST(request) {
  let conn;
  try {
    const body = await request.json();

    const {
      tipo,
      cliente,
      logradouro,
      numero,
      complemento,
      bairro,
      cep,
      idcidade,
      email,
      telefone,
      cpfcnpj,
      rginsest,
      datanascimento,
      idcondicaopagamento,
      limitecredito,
      status,
      observacoes,
    } = body;

    if (!tipo || !cliente || !cpfcnpj) {
      return NextResponse.json(
        { message: 'Informe tipo, nome e CPF/CNPJ do cliente.' },
        { status: 400 }
      );
    }

    conn = await getConnection();

    const sql = `
      INSERT INTO clientes (
        tipo,
        cliente,
        logradouro,
        numero,
        complemento,
        bairro,
        cep,
        idcidade,
        email,
        telefone,
        cpfcnpj,
        rginsest,
        datanascimento,
        idcondicaopagamento,
        limitecredito,
        status,
        observacoes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      tipo,
      cliente,
      logradouro || null,
      numero || null,
      complemento || null,
      bairro || null,
      cep || null,
      idcidade ? Number(idcidade) : null,
      email || null,
      telefone || null,
      cpfcnpj,
      rginsest || null,
      datanascimento || null,
      idcondicaopagamento ? Number(idcondicaopagamento) : null,
      limitecredito !== undefined && limitecredito !== null
        ? Number(limitecredito)
        : 0,
      status || 'ATIVO',
      observacoes || null,
    ];

    await conn.execute(sql, params);

    return NextResponse.json(
      { message: 'Cliente cadastrado com sucesso.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erro ao cadastrar cliente:', error);
    return NextResponse.json(
      { message: 'Erro ao cadastrar cliente.' },
      { status: 500 }
    );
  } finally {
    if (conn) {
      await conn.end();
    }
  }
}