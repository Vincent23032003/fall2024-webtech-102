import Link from "next/link";

export default function Page() {
  return (
      <html>
          <body>
              <h1>Hello, welcome on the conctact page !</h1>
              <p>
                We will be glad to answer to any questions or suggestions about this project ! This page is made for this.
              </p>
              <ul>
                <li>
                    Vincent BARE
                </li>
                <li>
                    <Link href="mailto:vincent.bare@edu.ece.fr">
                        Contactez Vincent !
                    </Link>
                </li>
                <br></br>
                <li>
                    Jules FEDIT
                </li>
                <li>
                    <Link href="mailto:jules.fedit@edu.ece.fr">
                        Contactez Jules !
                    </Link>
                </li>
              </ul>
          </body>
      </html>
  )
}