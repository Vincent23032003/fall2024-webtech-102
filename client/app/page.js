import Link from "next/link";


export default function Page() {
return (<html>
        <body>
        <h1>Hello, welcome on the home page!</h1>
        <ul>
            <li>
                <Link href='/about'>
                    Here's the link to the about page !
                </Link>
            </li>
            <li>
                <Link href='/articles'>
                    Here's the link to the articles page !
                </Link>
            </li>
            <li>
                <Link href='/contacts'>
                    Here's the link to the contact page !
                </Link>
            </li>
        </ul>
        </body>
    </html>)
}