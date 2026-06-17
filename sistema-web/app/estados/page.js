'use client';

import { useEffect, useState } from 'react';

export default function EstadosPage() {
  const [estado, setEstado] = useState('');
  const [uf, setUf] = useState('');
  const [idPais, setIdPais] = useState('');
  const [paises, setPaises] = useState([]);
  const [estados, setEstados] = useState([]);

  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const [filtro, setFiltro] = useState('');

  const [modo, setModo] = useState('consulta');

  async function carregarPaises() {
    try {
      const resp = await fetch('/api/paises');
      const data = await resp.json();

      if (Array.isArray(data)) {
        setPaises(data);
      } else if (data.success && Array.isArray(data.data)) {
        setPaises(data.data);
      } else {
        console.error('Resposta inesperada de /api/paises:', data);
        setPaises([]);
      }
    } catch (e) {
      console.error('Erro ao carregar países:', e);
      setPaises([]);
    }
  }

  async function carregarEstados(filtroLocal = '') {
    try {
      let url = '/api/estados';
      if (filtroLocal) {
        const params = new URLSearchParams();
        params.append('filtro', filtroLocal);
        url += `?${params.toString()}`;
      }

      const resp = await fetch(url);
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

  useEffect(() => {
    carregarPaises();
    carregarEstados();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setMensagem('');
    setErro('');

    try {
      const resp = await fetch('/api/estados', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          estado,
          uf,
          id_pais: Number(idPais),
        }),
      });

      const data = await resp.json();

      if (!resp.ok) {
        setErro(data.message || 'Erro ao salvar.');
        return;
      }

      setMensagem('Estado cadastrado com sucesso!');
      setEstado('');
      setUf('');
      setIdPais('');
      await carregarEstados();
    } catch (error) {
      console.error(error);
      setErro('Erro de conexão com o servidor.');
    }
  }

  function limparFormulario() {
    setEstado('');
    setUf('');
    setIdPais('');
    setMensagem('');
    setErro('');
  }

  function limparFiltro() {
    setFiltro('');
    carregarEstados('');
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
        {/* TÍTULO + BOTÕES (mesmo modelo de Países) */}
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
              Estados
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
                Estados cadastrados
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
                Cadastrar novo estado
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
                backgroundColor: modo === 'consulta' ? '#ffffff' : '#ffffff',
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
              Cadastrar estado
            </button>
          </div>
        </div>

        {/* LINHA DIVISÓRIA */}
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
                gridTemplateColumns: '2fr 1fr 1fr',
                gap: '14px 18px',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <label
                  htmlFor="id_pais"
                  style={{ fontSize: 13, color: '#111111', fontWeight: 500 }}
                >
                  País
                </label>
                <select
                  id="id_pais"
                  name="id_pais"
                  required
                  value={idPais}
                  onChange={(e) => setIdPais(e.target.value)}
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
                  {paises.map((p) => (
                    <option key={p.id_pais ?? p.idpais} value={p.id_pais ?? p.idpais}>
                      {p.pais} ({p.sigla})
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <label
                  htmlFor="estado"
                  style={{ fontSize: 13, color: '#111111', fontWeight: 500 }}
                >
                  Nome do Estado
                </label>
                <input
                  type="text"
                  id="estado"
                  name="estado"
                  maxLength={50}
                  required
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
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
                  htmlFor="uf"
                  style={{ fontSize: 13, color: '#111111', fontWeight: 500 }}
                >
                  UF
                </label>
                <input
                  type="text"
                  id="uf"
                  name="uf"
                  maxLength={2}
                  required
                  value={uf}
                  onChange={(e) => setUf(e.target.value.toUpperCase())}
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
              Estados cadastrados
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
                placeholder="Digite o nome ou a UF para consultar..."
                value={filtro}
                onChange={(e) => {
                  const valor = e.target.value;
                  setFiltro(valor);
                  carregarEstados(valor);
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
                      UF
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {estados.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        style={{
                          padding: 8,
                          color: '#6b7280',
                          fontStyle: 'italic',
                        }}
                      >
                        Nenhum estado cadastrado.
                      </td>
                    </tr>
                  )}
                  {estados.map((e) => (
                    <tr key={e.id_estado}>
                      <td
                        style={{
                          borderBottom: '1px solid #e5e7eb',
                          padding: 8,
                          color: '#111827',
                        }}
                      >
                        {e.id_estado}
                      </td>
                      <td
                        style={{
                          borderBottom: '1px solid #e5e7eb',
                          padding: 8,
                          color: '#111827',
                        }}
                      >
                        {e.pais}
                      </td>
                      <td
                        style={{
                          borderBottom: '1px solid #e5e7eb',
                          padding: 8,
                          color: '#111827',
                        }}
                      >
                        {e.estado}
                      </td>
                      <td
                        style={{
                          borderBottom: '1px solid #e5e7eb',
                          padding: 8,
                          color: '#111827',
                        }}
                      >
                        {e.uf}
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