import '../styles/style.css';
import '../styles/header.css';
import '../styles/Table.css';
import '../styles/Clock.css';

export const metadata = {
  title: 'O todo',
  description: 'Migrado para Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <head>
        {/* Script do Supabase via CDN para ficar disponível globalmente */}
        <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <link rel="shortcut icon" href="/ico/Logo.png" type="image/x-icon" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}