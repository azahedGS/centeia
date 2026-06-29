import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { ChatBot } from "@/components/ui/ChatBot";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CenteIA — Gestión de Proyectos",
  description: "Dashboard de inteligencia para portafolios de tecnología: Goverfolio, Epicron, GantiAgile",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="bg-[#FAFAFA] text-zinc-900 antialiased">
        <Sidebar />
        <div className="pl-56">
          <TopBar />
          <main className="pt-14 min-h-screen">
            <div className="p-6">{children}</div>
          </main>
        </div>
        <ChatBot />
      </body>
    </html>
  );
}
