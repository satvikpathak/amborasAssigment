import type { Metadata } from 'next';
import './globals.css';
import { StoreProvider } from '@/lib/contexts/StoreContext';

export const metadata: Metadata = {
  title: 'Amboras Analytics | Store Dashboard',
  description: 'Real-time eCommerce analytics dashboard for Amboras stores',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
