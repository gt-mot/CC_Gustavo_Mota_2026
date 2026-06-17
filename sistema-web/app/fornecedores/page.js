'use client';

import { useEffect, useState } from 'react';

export default function FornecedoresPage() {
  const [fornecedor, setFornecedor] = useState('');
  const [nomeFantasia, setNomeFantasia] = useState('');
  const [documento, setDocumento] = useState('');
  const [registroGeral, setRegistroGeral] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [site, setSite] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cep, setCep] = useState('');
  const [idCidade, setIdCidade] = useState('');

  const [cidades, setCidades] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [mensagem, setMensagem] = useState('');

  async function carregarCidades() {
    try {
      const resp = await fetch('/api/cidades');
      const data = await resp.json();
      setCidades(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    }
  }

  async function carregarFornecedores() {
    try {
      const resp = await fetch('/api/fornecedores');
      const data = await resp.json();
      setFornecedores(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    carregarCidades();
    carregarFornecedores();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setMensagem('');

    try {
      const resp = await fetch('/api/fornecedores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fornecedor,
          nome_fantasia: nomeFantasia,
          documento,
          registro_geral: registroGeral,
          email,
          telefone,
          site,
          logradouro,
          numero,
          bairro,
          cep,
          id_cidade: Number(idCidade),
        }),
      });

      const data = await resp.json();

      if (!resp.ok) {
        setMensagem(data.message || 'Erro ao salvar.');
        return;
      }

      setMensagem('Fornecedor cadastrado com sucesso!');

      setFornecedor('');
      setNomeFantasia('');
      setDocumento('');
      setRegistroGeral('');
      setEmail('');
      setTelefone('');
      setSite('');
      setLogradouro('');
      setNumero('');
      setBairro('');
      setCep('');
      setIdCidade('');

      await carregarFornecedores();
    } catch (error) {
      console.error(error);
      setMensagem('Erro de conexão com o servidor.');
    }
  }

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#e5e7eb', // fundo padronizado
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
          boxShadow: '0 4px 16px rgba(0,0,0,0.10)', // sombra padronizada
        }}
      >
        <h2
          style={{
            marginTop: 0,
            marginBottom: 18,
            fontSize: 22,
            borderBottom: '1px solid #d1d5db',
            paddingBottom: 8,
            color: '#111827',
          }}
        >
          Cadastro de Fornecedor
        </h2>

        {/* FORMULÁRIO */}
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 2fr 2fr',
              gap: '14px 18px',
            }}
          >
            {/* Razão social e nome fantasia */}
            <div
              style={{
                gridColumn: 'span 2',
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
              }}
            >
              <label
                htmlFor="fornecedor"
                style={{ fontSize: 13, color: '#111111', fontWeight: 500 }}
              >
                Razão Social
              </label>
              <input
                type="text"
                id="fornecedor"
                name="fornecedor"
                maxLength={100}
                required
                value={fornecedor}
                onChange={(e) => setFornecedor(e.target.value)}
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
              style={{ display: 'flex', flexDirection: 'column', gap: 4 }}
            >
              <label
                htmlFor="nome_fantasia"
                style={{ fontSize: 13, color: '#111111', fontWeight: 500 }}
              >
                Nome Fantasia
              </label>
              <input
                type="text"
                id="nome_fantasia"
                name="nome_fantasia"
                maxLength={100}
                value={nomeFantasia}
                onChange={(e) => setNomeFantasia(e.target.value)}
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

            {/* Email, telefone, site */}
            <div
              style={{
                gridColumn: 'span 2',
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
              }}
            >
              <label
                htmlFor="email_forn"
                style={{ fontSize: 13, color: '#111111', fontWeight: 500 }}
              >
                E-mail
              </label>
              <input
                type="email"
                id="email_forn"
                name="email"
                maxLength={100}
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

            <div
              style={{ display: 'flex', flexDirection: 'column', gap: 4 }}
            >
              <label
                htmlFor="telefone_forn"
                style={{ fontSize: 13, color: '#111111', fontWeight: 500 }}
              >
                Telefone
              </label>
              <input
                type="text"
                id="telefone_forn"
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

            <div
              style={{ display: 'flex', flexDirection: 'column', gap: 4 }}
            >
              <label
                htmlFor="site_forn"
                style={{ fontSize: 13, color: '#111111', fontWeight: 500 }}
              >
                Site
              </label>
              <input
                type="text"
                id="site_forn"
                name="site"
                maxLength={150}
                value={site}
                onChange={(e) => setSite(e.target.value)}
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

            {/* Endereço */}
            <div
              style={{
                gridColumn: 'span 2',
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
              }}
            >
              <label
                htmlFor="logradouro_forn"
                style={{ fontSize: 13, color: '#111111', fontWeight: 500 }}
              >
                Logradouro
              </label>
              <input
                type="text"
                id="logradouro_forn"
                name="logradouro"
                maxLength={100}
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
              style={{ display: 'flex', flexDirection: 'column', gap: 4 }}
            >
              <label
                htmlFor="numero_forn"
                style={{ fontSize: 13, color: '#111111', fontWeight: 500 }}
              >
                Número
              </label>
              <input
                type="text"
                id="numero_forn"
                name="numero"
                maxLength={10}
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
              style={{ display: 'flex', flexDirection: 'column', gap: 4 }}
            >
              <label
                htmlFor="bairro_forn"
                style={{ fontSize: 13, color: '#111111', fontWeight: 500 }}
              >
                Bairro
              </label>
              <input
                type="text"
                id="bairro_forn"
                name="bairro"
                maxLength={50}
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
              style={{ display: 'flex', flexDirection: 'column', gap: 4 }}
            >
              <label
                htmlFor="cep_forn"
                style={{ fontSize: 13, color: '#111111', fontWeight: 500 }}
              >
                CEP
              </label>
              <input
                type="text"
                id="cep_forn"
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

            {/* Cidade */}
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: 4 }}
            >
              <label
                htmlFor="id_cidade_forn"
                style={{ fontSize: 13, color: '#111111', fontWeight: 500 }}
              >
                Cidade
              </label>
              <select
                id="id_cidade_forn"
                name="id_cidade"
                required
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
                  <option key={c.id_cidade} value={c.id_cidade}>
                    {c.cidade}
                  </option>
                ))}
              </select>
            </div>

            {/* Inscrição e CNPJ */}
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: 4 }}
            >
              <label
                htmlFor="registro_geral_forn"
                style={{ fontSize: 13, color: '#111111', fontWeight: 500 }}
              >
                Inscrição Estadual
              </label>
              <input
                type="text"
                id="registro_geral_forn"
                name="registro_geral"
                maxLength={20}
                value={registroGeral}
                onChange={(e) => setRegistroGeral(e.target.value)}
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
              style={{ display: 'flex', flexDirection: 'column', gap: 4 }}
            >
              <label
                htmlFor="documento_forn"
                style={{ fontSize: 13, color: '#111111', fontWeight: 500 }}
              >
                CNPJ
              </label>
              <input
                type="text"
                id="documento_forn"
                name="documento"
                maxLength={14}
                required
                value={documento}
                onChange={(e) => setDocumento(e.target.value)}
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
              style={{
                padding: '8px 16px',
                fontSize: 14,
                borderRadius: 4,
                border: 'none',
                cursor: 'pointer',
                backgroundColor: '#6b7280',
                color: '#ffffff',
              }}
              onClick={() => {
                setFornecedor('');
                setNomeFantasia('');
                setDocumento('');
                setRegistroGeral('');
                setEmail('');
                setTelefone('');
                setSite('');
                setLogradouro('');
                setNumero('');
                setBairro('');
                setCep('');
                setIdCidade('');
                setMensagem('');
              }}
            >
              Sair
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
            <p
              style={{
                marginTop: 12,
                fontSize: 14,
                color: '#111827',
              }}
            >
              {mensagem}
            </p>
          )}
        </form>

        {/* TABELA DE FORNECEDORES */}
        <h3
          style={{
            marginTop: 24,
            marginBottom: 12,
            fontSize: 18,
            borderBottom: '1px solid #d1d5db',
            paddingBottom: 6,
            color: '#111827',
          }}
        >
          Fornecedores cadastrados
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
                  Razão Social
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
                  CNPJ
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
                <th
                  style={{
                    borderBottom: '1px solid #d1d5db',
                    textAlign: 'left',
                    padding: 8,
                    color: '#111827',
                    fontWeight: 600,
                  }}
                >
                  Telefone
                </th>
              </tr>
            </thead>
            <tbody>
              {fornecedores.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    style={{
                      padding: 8,
                      color: '#6b7280',
                      fontStyle: 'italic',
                    }}
                  >
                    Nenhum fornecedor cadastrado.
                  </td>
                </tr>
              )}
              {fornecedores.map((f) => (
                <tr key={f.id_fornecedor}>
                  <td
                    style={{
                      borderBottom: '1px solid #e5e7eb',
                      padding: 8,
                      color: '#111827',
                    }}
                  >
                    {f.id_fornecedor}
                  </td>
                  <td
                    style={{
                      borderBottom: '1px solid #e5e7eb',
                      padding: 8,
                      color: '#111827',
                    }}
                  >
                    {f.fornecedor}
                  </td>
                  <td
                    style={{
                      borderBottom: '1px solid #e5e7eb',
                      padding: 8,
                      color: '#111827',
                    }}
                  >
                    {f.documento}
                  </td>
                  <td
                    style={{
                      borderBottom: '1px solid #e5e7eb',
                      padding: 8,
                      color: '#111827',
                    }}
                  >
                    {f.cidade}
                  </td>
                  <td
                    style={{
                      borderBottom: '1px solid #e5e7eb',
                      padding: 8,
                      color: '#111827',
                    }}
                  >
                    {f.telefone}
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