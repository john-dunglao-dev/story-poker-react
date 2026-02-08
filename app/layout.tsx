import { Metadata } from 'next';
import './globals.css';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';
import Footer from './components/Footer';

export const metadata: Metadata = {
  title: 'Story Poker',
  description: 'A planning poker application for agile teams',
};

export default async function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Header />

        {children}

        <Footer />

        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          pauseOnFocusLoss
        />
      </body>
    </html>
  );
}
