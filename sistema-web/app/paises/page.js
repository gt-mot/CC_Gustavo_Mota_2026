'use client';

import { useEffect, useState } from 'react';

export default function PaisesPage() {
  const [paises, setPaises] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [mostrarConsulta, setMostrarConsulta] = useState(false);

  const [modo, setModo] = useState('novo'); // 'novo' | 'editar'
  const [paisEdicao, setPaisEdicao] = useState(null);

  const [pais, setPais] = useState('');
  const [sigla, setSigla] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [mostrarForm, setMostrarForm] = useState(false);

  async function carregarPaises() {
    try {
      const resp = await fetch('/api/paises');
      const data = await resp.json();
      if (Array.isArray(data)) {
        setPaises(data);
      } else {
        setPaises([]);
      }
    } catch (e) {
      console.error('Erro ao carregar países:', e);
      setPaises([]);
    }
  }

  useEffect(() => {
    carregarPaises();
  }, []);

  function abrirNovo() {
    setModo('novo');
    setPaisEdicao(null);
    setPais('');
    setSigla('');
    setMensagem('');
    setMostrarForm(true);
  }

  function abrirEdicao(reg) {
    setModo('editar');
    setPaisEdicao(reg);
    setPais(reg.pais);
    setSigla(reg.sigla);
    setMensagem('');
    setMostrarForm(true);
  }

  function fecharForm() {
    setMostrarForm(false);
    setPais('');
    setSigla('');
    setPaisEdicao(null);
    setMensagem('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMensagem('');

    try {
      if (modo === 'novo') {
        const resp = await fetch('/api/paises', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pais, sigla }),
        });
        const data = await resp.json();
        if (!resp.ok) {
          setMensagem(data.message || 'Erro ao salvar.');
          return;
        }
      } else if (modo === 'editar' && paisEdicao) {
        const resp = await fetch(`/api/paises/${paisEdicao.id_pais}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pais, sigla }),
        });
        const data = await resp.json();
        if (!resp.ok) {
          setMensagem(data.message || 'Erro ao atualizar.');
          return;
        }
      }

      await carregarPaises();
      fecharForm();
    } catch (error) {
      console.error(error);
      setMensagem('Erro de conexão com o servidor.');
    }
  }

  async function excluirPais(reg) {
    if (!confirm(`Confirma excluir o país "${reg.pais}"?`)) return;

    try {
      const resp = await fetch(`/api/paises/${reg.id_pais}`, {
        method: 'DELETE',
      });
      const data = await resp.json();
      if (!resp.ok) {
        alert(data.message || 'Erro ao excluir país.');
        return;
      }
      await carregarPaises();
    } catch (error) {
      console.error(error);
      alert('Erro de conexão ao excluir.');
    }
  }

  // FILTRO (consulta) pelo nome ou sigla
  const paisesFiltrados = paises.filter((p) => {
    if (!filtro.trim()) return true;
    const texto = filtro.trim().toLowerCase();
    return (
      p.pais.toLowerCase().includes(texto) ||
      p.sigla.toLowerCase().includes(texto)
    );
  });

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#e5e7eb',
        minHeight: '100vh',
        margin: 0,
        padding: 24,
      }}
    >
      <h1
        style={{
          textAlign: 'center',
          marginBottom: 28,
          color: '#111827',
        }}
      >
        Cadastros - Sistema da Loja
      </h1>

      <div
        style={{
          background: '#ffffff',
          maxWidth: 1100,
          margin: '0 auto 32px auto',
          padding: '24px 28px',
          borderRadius: 8,
          boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
        }}
      >
        {/* TOPO: título + botões Consulta e Cadastrar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 18,
            gap: 16,
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: 22,
              color: '#111827',
            }}
          >
            Países
          </h2>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button
              type="button"
              onClick={() => setMostrarConsulta((v) => !v)}
              style={{
                padding: '8px 16px',
                fontSize: 14,
                borderRadius: 4,
                border: '1px solid #2563eb',
                cursor: 'pointer',
                backgroundColor: '#ffffff',
                color: '#2563eb',
              }}
            >
              Consulta
            </button>
            <button
              type="button"
              onClick={abrirNovo}
              style={{
                padding: '8px 16px',
                fontSize: 14,
                borderRadius: 4,
                border: 'none',
                cursor: 'pointer',
                backgroundColor: '#2563eb',
                color: '#ffffff',
              }}
            >
              Cadastrar país
            </button>
          </div>
        </div>

        {/* CAIXA DE CONSULTA (busca) */}
        {mostrarConsulta && (
          <div
            style={{
              marginBottom: 16,
              display: 'flex',
              gap: 8,
              alignItems: 'center',
            }}
          >
            <input
  type="text"
  placeholder="Digite o nome ou a sigla para consultar..."
  value={filtro}
  onChange={(e) => setFiltro(e.target.value)}
  style={{
    padding: '6px 8px',
    fontSize: 14,
    borderRadius: 4,
    border: '1px solid #9ca3af',
    minWidth: 320,
    color: '#000000',          // texto digitado preto
    backgroundColor: '#ffffff' // fundo branco
  }}
/>
            <button
              type="button"
              onClick={() => setFiltro('')}
              style={{
                padding: '6px 12px',
                fontSize: 13,
                borderRadius: 4,
                border: 'none',
                cursor: 'pointer',
                backgroundColor: '#6b7280',
                color: '#ffffffff',
              }}
            >
              Limpar
            </button>
          </div>
        )}

        {/* FORMULÁRIO (abre só quando clicar em Cadastrar ou Editar) */}
        {mostrarForm && (
          <form
            onSubmit={handleSubmit}
            style={{
              marginBottom: 24,
              padding: 16,
              border: '1px solid #d1d5db',
              borderRadius: 6,
              backgroundColor: '#f9fafb',
            }}
          >
            <h3
              style={{
                marginTop: 0,
                marginBottom: 12,
                fontSize: 18,
                color: '#111827',
              }}
            >
              {modo === 'novo' ? 'Novo país' : 'Editar país'}
            </h3>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr',
                gap: '14px 18px',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <label
                  htmlFor="pais"
                  style={{ fontSize: 13, color: '#111111', fontWeight: 500 }}
                >
                  Nome do País
                </label>
                <input
                  type="text"
                  id="pais"
                  name="pais"
                  maxLength={60}
                  required
                  value={pais}
                  onChange={(e) => setPais(e.target.value)}
                  style={{
                    padding: '6px 8px',
                    fontSize: 14,
                    border: '1px solid #9ca3af',
                    borderRadius: 4,
                    outline: 'none',
                    color: '#000000',
                    backgroundColor: '#ffffff',
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <label
                  htmlFor="sigla"
                  style={{ fontSize: 13, color: '#111111', fontWeight: 500 }}
                >
                  Sigla
                </label>
                <input
                  type="text"
                  id="sigla"
                  name="sigla"
                  maxLength={3}
                  required
                  value={sigla}
                  onChange={(e) =>
                    setSigla(e.target.value.toUpperCase())
                  }
                  style={{
                    padding: '6px 8px',
                    fontSize: 14,
                    border: '1px solid #9ca3af',
                    borderRadius: 4,
                    outline: 'none',
                    color: '#000000',
                    backgroundColor: '#ffffff',
                  }}
                />
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 8,
                marginTop: 16,
              }}
            >
              <button
                type="button"
                onClick={fecharForm}
                style={{
                  padding: '8px 16px',
                  fontSize: 14,
                  borderRadius: 4,
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: '#6b7280',
                  color: '#ffffff',
                }}
              >
                Cancelar
              </button>
              <button
                type="submit"
                style={{
                  padding: '8px 16px',
                  fontSize: 14,
                  borderRadius: 4,
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: '#2563eb',
                  color: '#ffffff',
                }}
              >
                Salvar
              </button>
            </div>

            {mensagem && (
              <p style={{ marginTop: 12, fontSize: 14, color: '#111827' }}>
                {mensagem}
              </p>
            )}
          </form>
        )}

        {/* TABELA DE PAÍSES */}
        <h3
          style={{
            marginTop: 0,
            marginBottom: 12,
            fontSize: 18,
            borderBottom: '1px solid #d1d5db',
            paddingBottom: 6,
            color: '#111827',
          }}
        >
          Países cadastrados
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: 14,
            }}
          >
            <thead>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>País</th>
                <th style={thStyle}>Sigla</th>
                <th style={thStyle}>Data inclusão</th>
                <th style={thStyle}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {paisesFiltrados.length === 0 && (
                <tr>
                  <td colSpan={5} style={tdEmptyStyle}>
                    Nenhum país encontrado.
                  </td>
                </tr>
              )}
              {paisesFiltrados.map((p) => (
                <tr key={p.id_pais}>
                  <td style={tdStyle}>{p.id_pais}</td>
                  <td style={tdStyle}>{p.pais}</td>
                  <td style={tdStyle}>{p.sigla}</td>
                  <td style={tdStyle}>
                    {p.data_inclusao
                      ? new Date(p.data_inclusao).toLocaleString()
                      : ''}
                  </td>
                  <td style={tdStyle}>
                    <button
                      type="button"
                      onClick={() => abrirEdicao(p)}
                      style={{
                        padding: '4px 8px',
                        fontSize: 12,
                        marginRight: 4,
                        borderRadius: 4,
                        border: 'none',
                        cursor: 'pointer',
                        backgroundColor: '#3b82f6',
                        color: '#ffffff',
                      }}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => excluirPais(p)}
                      style={{
                        padding: '4px 8px',
                        fontSize: 12,
                        borderRadius: 4,
                        border: 'none',
                        cursor: 'pointer',
                        backgroundColor: '#ef4444',
                        color: '#ffffff',
                      }}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const thStyle = {
  borderBottom: '1px solid #d1d5db',
  textAlign: 'left',
  padding: 8,
  color: '#111827',
  fontWeight: 600,
};

const tdStyle = {
  borderBottom: '1px solid #e5e7eb',
  padding: 8,
  color: '#111827',
};

const tdEmptyStyle = {
  padding: 8,
  color: '#6b7280',
  fontStyle: 'italic',
};