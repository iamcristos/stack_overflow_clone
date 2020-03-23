import sgMail from '@sendgrid/mail';
import secret from '../config/secret';

sgMail.setApiKey(secret.SENDGRID_API_KEY);

function messageHelper(to, subject) {
  return {
    to,
    from: 'Stack overflow <stack@overflow>',
    subject,
    text: `a new answer to ${subject}!`,
    html: `<p>a new answer to ${subject}!</em></p>`,
  };
}

export { sgMail, messageHelper };
