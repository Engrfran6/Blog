import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import {Toaster} from '@/components/ui/toaster';
import type {Metadata} from 'next';
import './globals.css';
import ReduxProvider from './ReduxProvider';

export const metadata: Metadata = {
  title: 'Blog App',
  description: 'This is a minimalist blog app made with nextjs',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Navbar />
          <div className="pt-20">{children}</div>
          <Footer />
        </ReduxProvider>
        <Toaster />
      </body>
    </html>
  );
}
