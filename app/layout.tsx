import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Stitch AI - Generate UI with AI',
  description: 'Create beautiful user interfaces with AI-powered code generation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}