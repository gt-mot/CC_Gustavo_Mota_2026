'use client';

import { useEffect, useState } from 'react';

export default function FuncionariosPage() {
  const [funcionario, setFuncionario] = useState('');
  const [apelido, setApelido] = useState('');
  const [documento, setDocumento] = useState('');
  const [registroGeral, setRegistroGeral] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [idCargo, setIdCargo] = useState('');
  const [salario, setSalario] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cep, setCep] = useState('');
  const [idCidade, setIdCidade] = useState('');
  const [dataContratado, setDataContratado] = useState('');
  const [dataDemitido, setDataDemitido] = useState('');

  const [cargos, setCargos] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
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

  async function carregarCargos() {
    try {
      // Quando você tiver /api/cargos, substitua esse trecho:
      setCargos([]);
    } catch (e) {
      console.error(e);
    }
  }

  async function carregarFuncionarios() {
    try {
      const resp = await fetch('/api/funcionarios');
      const data = await resp.json();
      setFuncionarios(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    carregarCidades();
    carregarCargos();
    carregarFuncionarios();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setMensagem('');

    try {
      const resp = await fetch('/api/funcionarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          funcionario,
          apelido,
          documento,
          registro_geral: registroGeral,
          data_nascimento: dataNascimento || null,
          email,
          telefone,
          id_cargo: idCargo ? Number(idCargo) : null,
          salario: salario ? Number(salario) : null,
          logradouro,
          numero,
          bairro,
          cep,
          id_cidade: Number(idCidade),
          data_contratado: dataContratado || null,
          data_demitido: dataDemitido || null,
        }),
      });

      const data = await resp.json();

      if (!resp.ok) {
        setMensagem(data.message || 'Erro ao salvar.');
        return;
      }

      setMensagem('Funcionário cadastrado com sucesso!');

      setFuncionario('');
      setApelido('');
      setDocumento('');
      setRegistroGeral('');
      setDataNascimento('');
      setEmail('');
      setTelefone('');
      setIdCargo('');
      setSalario('');
      setLogradouro('');
      setNumero('');
      setBairro('');
      setCep('');
      setIdCidade('');
      setDataContratado('');
      setDataDemitido('');

      await carregarFuncionarios();
    } catch (error) {
      console.error(error);
      setMensagem('Erro de conexão com o servidor.');
    }
  }

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#e5e7eb', // igual às outras telas
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
          Cadastro de Funcionário
        </h2>

        {/* FORMULÁRIO */}
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 2fr',
              gap: '14px 18px',
            }}
          >
            {/* Nome e apelido */}
            <div
              style={{
                gridColumn: 'span 2',
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
              }}
            >
              <label
                htmlFor="funcionario"
                style={{ fontSize: 13, color: '#111111', fontWeight: 500 }}
              >
                Nome do Funcionário
              </label>
              <input
                type="text"
                id="funcionario"
                name="funcionario"
                maxLength={100}
                required
                value={funcionario}
                onChange={(e) => setFuncionario(e.target.value)}
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
                htmlFor="apelido"
                style={{ fontSize: 13, color: '#111111', fontWeight: 500 }}
              >
                Apelido
              </label>
              <input
                type="text"
                id="apelido"
                name="apelido"
                maxLength={50}
                value={apelido}
                onChange={(e) => setApelido(e.target.value)}
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

            {/* Email e telefone */}
            <div
              style={{
                gridColumn: 'span 2',
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
              }}
            >
              <label
                htmlFor="email_func"
                style={{ fontSize: 13, color: '#111111', fontWeight: 500 }}
              >
                E-mail
              </label>
              <input
                type="email"
                id="email_func"
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
                htmlFor="telefone_func"
                style={{ fontSize: 13, color: '#111111', fontWeight: 500 }}
              >
                Telefone
              </label>
              <input
                type="text"
                id="telefone_func"
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

            {/* Cargo e salário */}
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: 4 }}
            >
              <label
                htmlFor="id_cargo"
                style={{ fontSize: 13, color: '#111111', fontWeight: 500 }}
              >
                Cargo
              </label>
              <select
                id="id_cargo"
                name="id_cargo"
                value={idCargo}
                onChange={(e) => setIdCargo(e.target.value)}
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
                {cargos.length === 0 && (
                  <option disabled value="">
                    (Cadastre a tabela cargos depois)
                  </option>
                )}
                {cargos.map((c) => (
                  <option key={c.id_cargo} value={c.id_cargo}>
                    {c.cargo}
                  </option>
                ))}
              </select>
            </div>

            <div
              style={{ display: 'flex', flexDirection: 'column', gap: 4 }}
            >
              <label
                htmlFor="salario"
                style={{ fontSize: 13, color: '#111111', fontWeight: 500 }}
              >
                Salário
              </label>
              <input
                type="number"
                step="0.01"
                id="salario"
                name="salario"
                value={salario}
                onChange={(e) => setSalario(e.target.value)}
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
                htmlFor="logradouro_func"
                style={{ fontSize: 13, color: '#111111', fontWeight: 500 }}
              >
                Logradouro
              </label>
              <input
                type="text"
                id="logradouro_func"
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
                htmlFor="numero_func"
                style={{ fontSize: 13, color: '#111111', fontWeight: 500 }}
              >
                Número
              </label>
              <input
                type="text"
                id="numero_func"
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
                htmlFor="bairro_func"
                style={{ fontSize: 13, color: '#111111', fontWeight: 500 }}
              >
                Bairro
              </label>
              <input
                type="text"
                id="bairro_func"
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
                htmlFor="cep_func"
                style={{ fontSize: 13, color: '#111111', fontWeight: 500 }}
              >
                CEP
              </label>
              <input
                type="text"
                id="cep_func"
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
                htmlFor="id_cidade_func"
                style={{ fontSize: 13, color: '#111111', fontWeight: 500 }}
              >
                Cidade
              </label>
              <select
                id="id_cidade_func"
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

            {/* RG, CPF, datas */}
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: 4 }}
            >
              <label
                htmlFor="registro_geral_func"
                style={{ fontSize: 13, color: '#111111', fontWeight: 500 }}
              >
                RG
              </label>
              <input
                type="text"
                id="registro_geral_func"
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
                htmlFor="documento_func"
                style={{ fontSize: 13, color: '#111111', fontWeight: 500 }}
              >
                CPF
              </label>
              <input
                type="text"
                id="documento_func"
                name="documento"
                maxLength={11}
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

            <div
              style={{ display: 'flex', flexDirection: 'column', gap: 4 }}
            >
              <label
                htmlFor="data_nascimento_func"
                style={{ fontSize: 13, color: '#111111', fontWeight: 500 }}
              >
                Data Nasc.
              </label>
              <input
                type="date"
                id="data_nascimento_func"
                name="data_nascimento"
                value={dataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
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
                htmlFor="data_contratado"
                style={{ fontSize: 13, color: '#111111', fontWeight: 500 }}
              >
                Admissão
              </label>
              <input
                type="date"
                id="data_contratado"
                name="data_contratado"
                value={dataContratado}
                onChange={(e) => setDataContratado(e.target.value)}
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
                htmlFor="data_demitido"
                style={{ fontSize: 13, color: '#111111', fontWeight: 500 }}
              >
                Demissão
              </label>
              <input
                type="date"
                id="data_demitido"
                name="data_demitido"
                value={dataDemitido}
                onChange={(e) => setDataDemitido(e.target.value)}
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
                setFuncionario('');
                setApelido('');
                setDocumento('');
                setRegistroGeral('');
                setDataNascimento('');
                setEmail('');
                setTelefone('');
                setIdCargo('');
                setSalario('');
                setLogradouro('');
                setNumero('');
                setBairro('');
                setCep('');
                setIdCidade('');
                setDataContratado('');
                setDataDemitido('');
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

        {/* TABELA DE FUNCIONÁRIOS */}
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
          Funcionários cadastrados
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
                  Nome
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
                  CPF
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
                  E-mail
                </th>
              </tr>
            </thead>
            <tbody>
              {funcionarios.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    style={{
                      padding: 8,
                      color: '#6b7280',
                      fontStyle: 'italic',
                    }}
                  >
                    Nenhum funcionário cadastrado.
                  </td>
                </tr>
              )}
              {funcionarios.map((f) => (
                <tr key={f.id_funcionario}>
                  <td
                    style={{
                      borderBottom: '1px solid #e5e7eb',
                      padding: 8,
                      color: '#111827',
                    }}
                  >
                    {f.id_funcionario}
                  </td>
                  <td
                    style={{
                      borderBottom: '1px solid #e5e7eb',
                      padding: 8,
                      color: '#111827',
                    }}
                  >
                    {f.funcionario}
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
                    {f.email}
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