'use client';

import { useEffect, useState } from 'react';

export default function CidadesPage() {
  const [cidade, setCidade] = useState('');
  const [idEstado, setIdEstado] = useState('');
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);

  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const [filtro, setFiltro] = useState('');

  const [modo, setModo] = useState('consulta');

  async function carregarEstados() {
    try {
      const resp = await fetch('/api/estados');
      const data = await resp.json();

      if (Array.isArray(data)) {
        setEstados(data);
      } else if (data.success && Array.isArray(data.data)) {
        setEstados(data.data);
      } else {
        console.error('Resposta inesperada de /api/estados:', data);
        setEstados([]);
      }
    } catch (e) {
      console.error('Erro ao carregar estados:', e);
      setEstados([]);
    }
  }

  async function carregarCidades(filtroLocal = '') {
    try {
      let url = '/api/cidades';
      if (filtroLocal) {
        const params = new URLSearchParams();
        params.append('filtro', filtroLocal);
        url += `?${params.toString()}`;
      }

      const resp = await fetch(url);
      const data = await resp.json();

      if (Array.isArray(data)) {
        setCidades(data);
      } else if (data.success && Array.isArray(data.data)) {
        setCidades(data.data);
      } else {
        console.error('Resposta inesperada de /api/cidades:', data);
        setCidades([]);
      }
    } catch (e) {
      console.error('Erro ao carregar cidades:', e);
      setCidades([]);
    }
  }

  useEffect(() => {
    carregarEstados();
    carregarCidades();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setMensagem('');
    setErro('');

    try {
      const resp = await fetch('/api/cidades', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cidade,
          id_estado: Number(idEstado),
        }),
      });

      const data = await resp.json();

      if (!resp.ok) {
        setErro(data.message || 'Erro ao salvar.');
        return;
      }

      setMensagem('Cidade cadastrada com sucesso!');
      setCidade('');
      setIdEstado('');
      await carregarCidades();
    } catch (error) {
      console.error(error);
      setErro('Erro de conexão com o servidor.');
    }
  }

  function limparFormulario() {
    setCidade('');
    setIdEstado('');
    setMensagem('');
    setErro('');
  }

  function limparFiltro() {
    setFiltro('');
    carregarCidades('');
  }

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f3f4f6',
        minHeight: '100vh',
        margin: 0,
        padding: 24,
      }}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          maxWidth: 1100,
          margin: '0 auto',
          padding: '24px 28px',
          borderRadius: 8,
          boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
        }}
      >
        {/* TÍTULO + BOTÕES (igual Países/Estados) */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: 22,
                color: '#111827',
              }}
            >
              Cidades
            </h2>
            {modo === 'consulta' && (
              <p
                style={{
                  marginTop: 8,
                  marginBottom: 0,
                  fontSize: 14,
                  color: '#111827',
                }}
              >
                Cidades cadastradas
              </p>
            )}
            {modo === 'cadastro' && (
              <p
                style={{
                  marginTop: 8,
                  marginBottom: 0,
                  fontSize: 14,
                  color: '#111827',
                }}
              >
                Cadastrar nova cidade
              </p>
            )}
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button
              type="button"
              onClick={() => setModo('consulta')}
              style={{
                padding: '6px 12px',
                fontSize: 14,
                borderRadius: 4,
                border: modo === 'consulta' ? '1px solid #2563eb' : '1px solid #d1d5db',
                backgroundColor: '#ffffff',
                color: modo === 'consulta' ? '#2563eb' : '#111827',
                cursor: 'pointer',
              }}
            >
              Consulta
            </button>
            <button
              type="button"
              onClick={() => setModo('cadastro')}
              style={{
                padding: '6px 12px',
                fontSize: 14,
                borderRadius: 4,
                border: '1px solid #2563eb',
                backgroundColor: '#2563eb',
                color: '#ffffff',
                cursor: 'pointer',
              }}
            >
              Cadastrar cidade
            </button>
          </div>
        </div>

        <hr
          style={{
            border: 0,
            borderTop: '1px solid #e5e7eb',
            margin: '8px 0 16px 0',
          }}
        />

        {/* MODO CADASTRO */}
        {modo === 'cadastro' && (
          <form
            onSubmit={handleSubmit}
            style={{
              marginTop: 8,
              padding: 16,
              borderRadius: 8,
              backgroundColor: '#f9fafb',
              border: '1px solid #e5e7eb',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            {erro && (
              <div style={{ color: 'red', fontSize: 14 }}>{erro}</div>
            )}
            {mensagem && (
              <div style={{ color: 'green', fontSize: 14 }}>{mensagem}</div>
            )}

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 2fr',
                gap: '14px 18px',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <label
                  htmlFor="id_estado"
                  style={{ fontSize: 13, color: '#111111', fontWeight: 500 }}
                >
                  Estado
                </label>
                <select
                  id="id_estado"
                  name="id_estado"
                  required
                  value={idEstado}
                  onChange={(e) => setIdEstado(e.target.value)}
                  style={{
                    padding: '6px 8px',
                    fontSize: 14,
                    border: '1px solid #9ca3af',
                    borderRadius: 4,
                    outline: 'none',
                    color: '#000000',
                    backgroundColor: '#ffffff',
                  }}
                >
                  <option value="">Selecione...</option>
                  {estados.map((e) => (
                    <option key={e.id_estado} value={e.id_estado}>
                      {e.estado} - {e.uf}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <label
                  htmlFor="cidade"
                  style={{ fontSize: 13, color: '#111111', fontWeight: 500 }}
                >
                  Nome da cidade
                </label>
                <input
                  type="text"
                  id="cidade"
                  name="cidade"
                  maxLength={60}
                  required
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
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
                marginTop: 12,
              }}
            >
              <button
                type="button"
                onClick={limparFormulario}
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
                Limpar
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
          </form>
        )}

        {/* MODO CONSULTA */}
        {modo === 'consulta' && (
          <div style={{ marginTop: 8 }}>
            <h3
              style={{
                marginTop: 0,
                marginBottom: 12,
                fontSize: 16,
                color: '#111827',
              }}
            >
              Cidades cadastradas
            </h3>

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
                placeholder="Digite o nome da cidade para consultar..."
                value={filtro}
                onChange={(e) => {
                  const valor = e.target.value;
                  setFiltro(valor);
                  carregarCidades(valor);
                }}
                style={{
                  padding: '6px 8px',
                  fontSize: 14,
                  borderRadius: 4,
                  border: '1px solid #9ca3af',
                  minWidth: 320,
                  color: '#000000',
                  backgroundColor: '#ffffff',
                }}
              />
              <button
                type="button"
                onClick={limparFiltro}
                style={{
                  padding: '6px 12px',
                  fontSize: 13,
                  borderRadius: 4,
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: '#6b7280',
                  color: '#ffffff',
                }}
              >
                Limpar
              </button>
            </div>

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
                    <th
                      style={{
                        borderBottom: '1px solid #d1d5db',
                        textAlign: 'left',
                        padding: 8,
                        color: '#111827',
                        fontWeight: 600,
                      }}
                    >
                      ID
                    </th>
                    <th
                      style={{
                        borderBottom: '1px solid #d1d5db',
                        textAlign: 'left',
                        padding: 8,
                        color: '#111827',
                        fontWeight: 600,
                      }}
                    >
                      País
                    </th>
                    <th
                      style={{
                        borderBottom: '1px solid #d1d5db',
                        textAlign: 'left',
                        padding: 8,
                        color: '#111827',
                        fontWeight: 600,
                      }}
                    >
                      Estado
                    </th>
                    <th
                      style={{
                        borderBottom: '1px solid #d1d5db',
                        textAlign: 'left',
                        padding: 8,
                        color: '#111827',
                        fontWeight: 600,
                      }}
                    >
                      Cidade
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cidades.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        style={{
                          padding: 8,
                          color: '#6b7280',
                          fontStyle: 'italic',
                        }}
                      >
                        Nenhuma cidade cadastrada.
                      </td>
                    </tr>
                  )}
                  {cidades.map((c) => (
                    <tr key={c.id_cidade}>
                      <td
                        style={{
                          borderBottom: '1px solid #e5e7eb',
                          padding: 8,
                          color: '#111827',
                        }}
                      >
                        {c.id_cidade}
                      </td>
                      <td
                        style={{
                          borderBottom: '1px solid #e5e7eb',
                          padding: 8,
                          color: '#111827',
                        }}
                      >
                        {c.pais} ({c.sigla})
                      </td>
                      <td
                        style={{
                          borderBottom: '1px solid #e5e7eb',
                          padding: 8,
                          color: '#111827',
                        }}
                      >
                        {c.estado} - {c.uf}
                      </td>
                      <td
                        style={{
                          borderBottom: '1px solid #e5e7eb',
                          padding: 8,
                          color: '#111827',
                        }}
                      >
                        {c.cidade}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}