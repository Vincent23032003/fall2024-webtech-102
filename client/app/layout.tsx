"use client"

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
