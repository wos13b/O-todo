import './style.css';
import './header.css';

export const metadata = {
  title: 'Meu Projeto O-todo',
  description: 'Migrado para Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body>
        {children}
      </body>
    </html>
  )
}