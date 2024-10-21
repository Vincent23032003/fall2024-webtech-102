import Link from 'next/link';

export const metadata = {
    title: 'Web Technologies Project',
    description: 'An example project using Next.js',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                {/* Main content will go here */}
                <main>{children}</main>

                {/* Footer Section */}
                <footer>
                    <p>&copy; 2024 Web Technologies Project. All rights reserved.</p>
                    <nav>
                        <ul>
                            <li>
                                Privacy Policy
                            </li>
                            <li>
                                Terms of Service
                            </li>
                        </ul>
                    </nav>
                </footer>
            </body>
        </html>
    )
}