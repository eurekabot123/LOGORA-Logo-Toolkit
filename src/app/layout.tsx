import { Inter } from 'next/font/google';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import './globals.css';
import { ClerkProvider } from "@clerk/nextjs";
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'AI Logo Generator',
  description: 'Generate unique logos using AI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="flex flex-col min-h-screen">
            <Theme>
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </Theme>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}