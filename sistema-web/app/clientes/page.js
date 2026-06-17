'use client';

import { useEffect, useState } from 'react';

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

export default function ClientesPage() {
  const [clientes, setClientes] = useState([]);
  const [cidades, setCidades] = useState([]);

  // campos principais do banco
  const [tipo, setTipo] = useState('FISICA');
  const [cliente, setCliente] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cep, setCep] = useState('');
  const [idCidade, setIdCidade] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpfcnpj, setCpfcnpj] = useState('');
  const [rginsest, setRginsest] = useState('');
  const [datanascimento, setDatanascimento] = useState('');
  const [limitecredito, setLimitecredito] = useState('0');
  const [statusCli, setStatusCli] = useState('ATIVO');

  // seletor CPF/CNPJ
  const [tipoDocumento, setTipoDocumento] = useState('CPF');

  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const [filtro, setFiltro] = useState('');

  const [modo, setModo] = useState('consulta');

  async function carregarCidades() {
    try {
      const resp = await fetch('/api/cidades');
      const data = await resp.json();

      if (Array.isArray(data)) {
        setCidades(data);
      } else if (data && Array.isArray(data.data)) {
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

  async function carregarClientes(filtroLocal = '') {
    try {
      let url = '/api/clientes';
      if (filtroLocal) {
        const params = new URLSearchParams();
        params.append('filtro', filtroLocal);
        url += `?${params.toString()}`;
      }

      const resp = await fetch(url);
      const data = await resp.json();

      // garante que sempre vira array, mesmo se vier {}
      if (Array.isArray(data)) {
        setClientes(data);
      } else if (data && Array.isArray(data.data)) {
        setClientes(data.data);
      } else {
        setClientes([]);
      }
    } catch (e) {
      console.error('Erro ao carregar clientes:', e);
      setClientes([]);
    }
  }

  useEffect(() => {
    carregarCidades();
    carregarClientes();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setMensagem('');
    setErro('');

    try {
      const resp = await fetch('/api/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tipo,
          cliente,
          logradouro,
          numero,
          complemento,
          bairro,
          cep,
          idcidade: idCidade ? Number(idCidade) : null,
          email,
          telefone,
          cpfcnpj,
          rginsest,
          datanascimento: datanascimento || null,
          idcondicaopagamento: null,
          limitecredito: limitecredito || '0',
          status: statusCli,
          observacoes: null,
        }),
      });

      const data = await resp.json();

      if (!resp.ok) {
        setErro(data.message || 'Erro ao salvar.');
        return;
      }

      setMensagem('Cliente cadastrado com sucesso!');
      limparFormulario();
      await carregarClientes();
    } catch (error) {
      console.error(error);
      setErro('Erro de conexão com o servidor.');
    }
  }

  function limparFormulario() {
    setTipo('FISICA');
    setCliente('');
    setLogradouro('');
    setNumero('');
    setComplemento('');
    setBairro('');
    setCep('');
    setIdCidade('');
    setEmail('');
    setTelefone('');
    setCpfcnpj('');
    setRginsest('');
    setDatanascimento('');
    setLimitecredito('0');
    setStatusCli('ATIVO');
    setTipoDocumento('CPF');
  }

  function limparFiltro() {
    setFiltro('');
    carregarClientes('');
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
        {/* TÍTULO + BOTÕES */}
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
              Clientes
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
                Clientes cadastrados
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
                Cadastrar novo cliente
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
                border:
                  modo === 'consulta'
                    ? '1px solid #2563eb'
                    : '1px solid #d1d5db',
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
              Cadastrar cliente
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

            {/* Linha 1: tipo + nome */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 3fr',
                gap: '14px 18px',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <label
                  htmlFor="tipo"
                  style={{ fontSize: 13, color: '#111111', fontWeight: 500 }}
                >
                  Tipo
                </label>
                <select
                  id="tipo"
                  name="tipo"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
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
                  <option value="FISICA">Pessoa física</option>
                  <option value="JURIDICA">Pessoa jurídica</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <label
                  htmlFor="cliente"
                  style={{ fontSize: 13, color: '#111111', fontWeight: 500 }}
                >
                  Nome / Razão Social
                </label>
                <input
                  type="text"
                  id="cliente"
                  name="cliente"
                  maxLength={50}
                  required
                  value={cliente}
                  onChange={(e) => setCliente(e.target.value)}
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

            {/* Linha 2: status e limite */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '14px 18px',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <label
                  htmlFor="status"
                  style={{ fontSize: 13, color: '#111111', fontWeight: 500 }}
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={statusCli}
                  onChange={(e) => setStatusCli(e.target.value)}
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
                  <option value="ATIVO">Ativo</option>
                  <option value="INATIVO">Inativo</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <label
                  htmlFor="limitecredito"
                  style={{ fontSize: 13, color: '#111111', fontWeight: 500 }}
                >
                  Limite de crédito
                </label>
                <input
                  type="number"
                  step="0.01"
                  id="limitecredito"
                  name="limitecredito"
                  value={limitecredito}
                  onChange={(e) => setLimitecredito(e.target.value)}
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

            {/* Linha 3: endereço + cidade */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '3fr 0.7fr 2fr',
                gap: '14px 18px',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                  }}
                >
                  <label
                    htmlFor="logradouro"
                    style={{ fontSize: 13, color: '#111111', fontWeight: 500 }}
                  >
                    Logradouro
                  </label>
                  <input
                    type="text"
                    id="logradouro"
                    name="logradouro"
                    maxLength={50}
                    value={logradouro}
                    onChange={(e) => setLogradouro(e.target.value)}
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
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1.5fr 1.5fr',
                    gap: 8,
                    marginTop: 8,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 4,
                    }}
                  >
                    <label
                      htmlFor="numero"
                      style={{
                        fontSize: 13,
                        color: '#111111',
                        fontWeight: 500,
                      }}
                    >
                      Número
                    </label>
                    <input
                      type="text"
                      id="numero"
                      name="numero"
                      maxLength={5}
                      value={numero}
                      onChange={(e) => setNumero(e.target.value)}
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
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 4,
                    }}
                  >
                    <label
                      htmlFor="bairro"
                      style={{
                        fontSize: 13,
                        color: '#111111',
                        fontWeight: 500,
                      }}
                    >
                      Bairro
                    </label>
                    <input
                      type="text"
                      id="bairro"
                      name="bairro"
                      maxLength={30}
                      value={bairro}
                      onChange={(e) => setBairro(e.target.value)}
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
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 4,
                    }}
                  >
                    <label
                      htmlFor="cep"
                      style={{
                        fontSize: 13,
                        color: '#111111',
                        fontWeight: 500,
                      }}
                    >
                      CEP
                    </label>
                    <input
                      type="text"
                      id="cep"
                      name="cep"
                      maxLength={8}
                      value={cep}
                      onChange={(e) => setCep(e.target.value)}
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
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <label
                  htmlFor="complemento"
                  style={{ fontSize: 13, color: '#111111', fontWeight: 500 }}
                >
                  Complemento
                </label>
                <input
                  type="text"
                  id="complemento"
                  name="complemento"
                  maxLength={20}
                  value={complemento}
                  onChange={(e) => setComplemento(e.target.value)}
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
                  htmlFor="idcidade"
                  style={{ fontSize: 13, color: '#111111', fontWeight: 500 }}
                >
                  Cidade
                </label>
                <select
                  id="idcidade"
                  name="idcidade"
                  value={idCidade}
                  onChange={(e) => setIdCidade(e.target.value)}
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
                  {cidades.map((c) => (
                    <option
                      key={c.id_cidade ?? c.idcidade}
                      value={c.id_cidade ?? c.idcidade}
                    >
                      {c.cidade} - {c.estado} ({c.uf})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Linha 4: contato */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1.5fr 1.5fr',
                gap: '14px 18px',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <label
                  htmlFor="telefone"
                  style={{ fontSize: 13, color: '#111111', fontWeight: 500 }}
                >
                  Telefone
                </label>
                <input
                  type="text"
                  id="telefone"
                  name="telefone"
                  maxLength={15}
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
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
                  htmlFor="email"
                  style={{ fontSize: 13, color: '#111111', fontWeight: 500 }}
                >
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  maxLength={50}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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

            {/* Linha final: tipo doc + CPF/CNPJ + RG + nascimento */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1.5fr 1.5fr 1.5fr',
                gap: '14px 18px',
                marginTop: 8,
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <label
                  htmlFor="tipodoc"
                  style={{ fontSize: 13, color: '#111111', fontWeight: 500 }}
                >
                  Tipo de documento
                </label>
                <select
                  id="tipodoc"
                  name="tipodoc"
                  value={tipoDocumento}
                  onChange={(e) => setTipoDocumento(e.target.value)}
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
                  <option value="CPF">CPF</option>
                  <option value="CNPJ">CNPJ</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <label
                  htmlFor="cpfcnpj"
                  style={{ fontSize: 13, color: '#111111', fontWeight: 500 }}
                >
                  {tipoDocumento === 'CPF' ? 'CPF' : 'CNPJ'}
                </label>
                <input
                  type="text"
                  id="cpfcnpj"
                  name="cpfcnpj"
                  maxLength={14}
                  required
                  value={cpfcnpj}
                  onChange={(e) => setCpfcnpj(e.target.value)}
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
                  htmlFor="rginsest"
                  style={{ fontSize: 13, color: '#111111', fontWeight: 500 }}
                >
                  RG / Inscrição Estadual
                </label>
                <input
                  type="text"
                  id="rginsest"
                  name="rginsest"
                  maxLength={14}
                  value={rginsest}
                  onChange={(e) => setRginsest(e.target.value)}
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
                  htmlFor="datanascimento"
                  style={{ fontSize: 13, color: '#111111', fontWeight: 500 }}
                >
                  Data de nascimento
                </label>
                <input
                  type="date"
                  id="datanascimento"
                  name="datanascimento"
                  value={datanascimento}
                  onChange={(e) => setDatanascimento(e.target.value)}
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
              Clientes cadastrados
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
                placeholder="Digite nome, e-mail ou CPF/CNPJ..."
                value={filtro}
                onChange={(e) => {
                  const valor = e.target.value;
                  setFiltro(valor);
                  carregarClientes(valor);
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
                    <th style={thStyle}>Nome</th>
                    <th style={thStyle}>Tipo</th>
                    <th style={thStyle}>CPF/CNPJ</th>
                    <th style={thStyle}>Cidade</th>
                    <th style={thStyle}>Telefone</th>
                    <th style={thStyle}>E-mail</th>
                    <th style={thStyle}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {clientes.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        style={{
                          padding: 8,
                          color: '#6b7280',
                          fontStyle: 'italic',
                        }}
                      >
                        Nenhum cliente cadastrado.
                      </td>
                    </tr>
                  )}
                  {clientes.map((c, index) => (
                    <tr key={index}>
                      <td style={tdStyle}>{c.cliente}</td>
                      <td style={tdStyle}>
                        {c.tipo === 'JURIDICA' ? 'Jurídica' : 'Física'}
                      </td>
                      <td style={tdStyle}>{c.cpfcnpj}</td>
                      <td style={tdStyle}>
                        {c.cidade
                          ? `${c.cidade} - ${c.estado} (${c.uf})`
                          : '-'}
                      </td>
                      <td style={tdStyle}>{c.telefone || '-'}</td>
                      <td style={tdStyle}>{c.email || '-'}</td>
                      <td style={tdStyle}>{c.status}</td>
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