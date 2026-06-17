import { NextResponse } from 'next/server';
import { getConnection } from '@/lib/db';

export async function GET() {
  try {
    const conn = await getConnection();
    const [rows] = await conn.execute(
      `SELECT f.*, cid.cidade, car.cargo
       FROM funcionarios f
       JOIN cidades cid ON cid.id_cidade = f.id_cidade
       JOIN cargos car ON car.id_cargo = f.id_cargo
       ORDER BY f.funcionario`
    );
    await conn.end();
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error('Erro ao listar funcionários:', error);
    return NextResponse.json(
      { message: 'Erro ao listar funcionários.' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      funcionario,
      apelido,
      documento,
      registro_geral,
      data_nascimento,
      email,
      telefone,
      id_cargo,
      salario,
      logradouro,
      numero,
      bairro,
      cep,
      id_cidade,
      data_contratado,
      data_demitido,
    } = body;

    if (!funcionario || !documento || !id_cargo || !id_cidade) {
      return NextResponse.json(
        { message: 'Preencha os campos obrigatórios.' },
        { status: 400 }
      );
    }

    const conn = await getConnection();
    await conn.execute(
      `INSERT INTO funcionarios 
       (funcionario, apelido, documento, registro_geral, data_nascimento,
        email, telefone, id_cargo, salario,
        logradouro, numero, bairro, cep, id_cidade,
        data_contratado, data_demitido)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        funcionario,
        apelido || null,
        documento,
        registro_geral || null,
        data_nascimento || null,
        email || null,
        telefone || null,
        id_cargo,
        salario || null,
        logradouro || null,
        numero || null,
        bairro || null,
        cep || null,
        id_cidade,
        data_contratado || null,
        data_demitido || null,
      ]
    );
    await conn.end();

    return NextResponse.json(
      { message: 'Funcionário cadastrado com sucesso.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erro ao cadastrar funcionário:', error);
    return NextResponse.json(
      { message: 'Erro ao cadastrar funcionário.' },
      { status: 500 }
    );
  }
}