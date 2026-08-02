import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Audit GDPR & Cybersecurity | Azienda Blindata',
  description: 'Valuta in 2 minuti il livello di rischio sanzionatorio e la sicurezza informatica della tua azienda.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
        {children}
      </body>
    </html>
  );
}
