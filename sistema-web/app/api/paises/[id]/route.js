import { NextResponse } from 'next/server';
import { getConnection } from '@/lib/db';

export async function PUT(request, context) {
  try {
    const { id } = await context.params; // <- desestrutura com await
    const numId = Number(id);

    if (!numId || Number.isNaN(numId)) {
      return NextResponse.json({ message: 'ID inválido.' }, { status: 400 });
    }

    const body = await request.json();
    const { pais, sigla } = body;

    if (!pais || !sigla) {
      return NextResponse.json(
        { message: 'Informe país e sigla.' },
        { status: 400 }
      );
    }

    const conn = await getConnection();
    const [result] = await conn.execute(
      'UPDATE paises SET pais = ?, sigla = ? WHERE id_pais = ?',
      [pais, sigla, numId]
    );
    await conn.end();

    if (!result || result.affectedRows === 0) {
      return NextResponse.json(
        { message: 'País não encontrado.' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'País atualizado com sucesso.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao atualizar país:', error);
    return NextResponse.json(
      { message: 'Erro ao atualizar país.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, context) {
  try {
    const { id } = await context.params; // <- desestrutura com await
    const numId = Number(id);

    if (!numId || Number.isNaN(numId)) {
      return NextResponse.json({ message: 'ID inválido.' }, { status: 400 });
    }

    const conn = await getConnection();
    const [result] = await conn.execute(
      'DELETE FROM paises WHERE id_pais = ?',
      [numId]
    );
    await conn.end();

    if (!result || result.affectedRows === 0) {
      return NextResponse.json(
        { message: 'País não encontrado.' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'País excluído com sucesso.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao excluir país:', error);
    return NextResponse.json(
      { message: 'Erro ao excluir país.' },
      { status: 500 }
    );
  }
}