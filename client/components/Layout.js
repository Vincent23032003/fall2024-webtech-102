import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4">
        <nav className="container mx-auto flex justify-between">
          <h1 className="text-2xl font-bold">My WebTech Project</h1>
          <ul className="flex space-x-4">
            <li>
              <Link href="/about">
                <a className="hover:underline">About</a>
              </Link>
            </li>
            <li>
              <Link href="/articles">
                <a className="hover:underline">Articles</a>
              </Link>
            </li>
            <li>
              <Link href="/contacts">
                <a className="hover:underline">Contacts</a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main content */}
      <main className="container mx-auto flex-grow p-4">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 WebTech Project. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
