import React from "react"

interface EmailTemplateProps {
  name: string
  entry_code: string
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({
  name,
  entry_code
}) => (
  <div>
    <p>Prezado(a) Sr(a). {name},</p>
    <br />
    <p>
      Segue abaixo o seu código de acesso:
      <br /><br />
      <strong>
        {entry_code}
      </strong>
    </p>
    <br /><br />
    <p>Clique no link a seguir para realizar o download:</p>
    <br />
    <a href="https://www.google.com">Download</a>
  </div>
)