import * as React from 'react';

interface VerificationEmailTemplateProps {
  callbackUrl: string,
  email:string,
  token: string
}

export const verificationEmailTemplate: React.FC<Readonly<VerificationEmailTemplateProps>> = ({
  token,
  email,
  callbackUrl
}) => (
  <div>
    <h1>Welcome!</h1>
    <p>Thank you for signing up for IdeaNotes. Please click on the link to verify your email: http://localhost:3000/{callbackUrl}?code={token}&email={email}</p>
  </div>
);