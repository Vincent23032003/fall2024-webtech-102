export default function Page() {
  return (
      <html>
          <body>
              <h1>Hello, welcome on the articles page !</h1>
              <p>
                  Here's some articles :
              </p>
              <ol>
                  <li>
                      <ul>
                          <li>
                              content: Content of the comment.
                          </li>
                          <li>
                              date of creation: 14/10/2024
                          </li>
                          <li>
                              author: Bob McLaren
                          </li>
                      </ul>
                  </li>
                  <br></br>
                  <li>
                      <ul>
                          <li>
                              content: Lab 4
                          </li>
                          <li>
                              date of creation: 09/10/2024
                          </li>
                          <li>
                              author: John Smith
                          </li>
                      </ul>
                  </li>
              </ol>
          </body>
      </html>
  )
}