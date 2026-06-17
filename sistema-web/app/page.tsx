// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-48px)] bg-gray-100 py-6 px-4">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Bloco principal / apresentação */}
        <section className="bg-white rounded-lg shadow-lg px-6 py-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
            Sistema de Vendas – Relógios e Camisas
          </h1>
          <p className="text-sm md:text-base text-gray-600 mb-2">
            Painel administrativo para cadastro de clientes, funcionários,
            fornecedores e dados de localização (países, estados e cidades).
          </p>
          <p className="text-xs md:text-sm text-gray-500">
            Utilize o menu superior ou os atalhos abaixo para acessar cada
            módulo do sistema.
          </p>
        </section>

        {/* Cards de atalho */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <HomeCard
            title="Clientes"
            description="Cadastro de clientes, documentos e endereços."
            href="/clientes"
          />
          <HomeCard
            title="Fornecedores"
            description="Cadastro de fornecedores, contatos e dados fiscais."
            href="/fornecedores"
          />
          <HomeCard
            title="Funcionários"
            description="Gestão de funcionários, cargos e informações pessoais."
            href="/funcionarios"
          />
          <HomeCard
            title="Localização"
            description="Países, estados e cidades usados nos cadastros."
            href="/paises"
          />
         
        </section>
      </div>
    </div>
  );
}

type CardProps = {
  title: string;
  description: string;
  href: string;
};

function HomeCard({ title, description, href }: CardProps) {
  return (
    <Link href={href} className="no-underline">
      <div className="bg-white rounded-lg shadow-md px-5 py-4 h-full flex flex-col justify-between hover:shadow-lg hover:-translate-y-0.5 transition">
        <div>
          <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-1">
            {title}
          </h2>
          <p className="text-xs md:text-sm text-gray-600">{description}</p>
        </div>
        <span className="mt-3 text-xs md:text-sm font-medium text-blue-600">
          Acessar módulo →
        </span>
      </div>
    </Link>
  );
}