import Link from 'next/link';

export const metadata = {
  title: 'Web Technologies Project',
  description: 'An example project using Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Header Section with Navigation Bar */}
        <header>
          <h1>Welcome to My Web Technologies Project</h1>
          <nav>
            <ul className="navbar">
              <li>
                <Link href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/articles">
                  Articles
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        {/* Main content will go here */}
        <main>{children}</main>

        {/* Footer Section */}
        <footer>
          <p>&copy; 2024 Web Technologies Project. All rights reserved.</p>
          <nav>
            <ul>
              <li>
                <Link href="/privacy">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </nav>
        </footer>
      </body>
    </html>
  )
}