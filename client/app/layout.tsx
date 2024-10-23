"use client"

import Footer from '../components/Layout';

export default function RootLayout({ children }) {
  return (
    <html>

      <body>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
