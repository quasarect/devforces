import type { Metadata } from 'next';
import './globals.css';

import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'DevForces',
  description: 'The modern way of learning and competing in development.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='dark'>
      <body className='font-inter'>
        <ThemeProvider attribute='class' enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
