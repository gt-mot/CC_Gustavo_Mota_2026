// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sistema de Vendas",
  description: "Sistema de vendas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-gray-100">
        {/* MENU SUPERIOR */}
        <header className="bg-gray-900 text-gray-100 shadow-md">
          <div className="px-6 h-12 flex items-center justify-between gap-6">
            {/* título no canto esquerdo */}
            <div className="font-semibold text-sm md:text-base">
              Sistema de Vendas
            </div>

            {/* APENAS OS TÓPICOS ALINHADOS EM LINHA */}
            <nav>
              <ul className="flex items-center gap-6 text-xs md:text-sm">
                <li>
                  <Link href="/" className="hover:text-white">
                    Início
                  </Link>
                </li>
                <li>
                  <Link href="/paises" className="hover:text-white">
                    Países
                  </Link>
                </li>
                <li>
                  <Link href="/estados" className="hover:text-white">
                    Estados
                  </Link>
                </li>
                <li>
                  <Link href="/cidades" className="hover:text-white">
                    Cidades
                  </Link>
                </li>
                <li>
                  <Link href="/clientes" className="hover:text-white">
                    Clientes
                  </Link>
                </li>
                <li>
                  <Link href="/funcionarios" className="hover:text-white">
                    Funcionários
                  </Link>
                </li>
                <li>
                  <Link href="/fornecedores" className="hover:text-white">
                    Fornecedores
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        {/* CONTEÚDO DAS PÁGINAS */}
        <main className="flex-1 bg-gray-100">{children}</main>
      </body>
    </html>
  );
}