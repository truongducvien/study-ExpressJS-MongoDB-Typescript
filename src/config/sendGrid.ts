import SendGrid, { MailDataRequired } from '@sendgrid/mail';
import { envConfig } from './env';

type Options =
  | Omit<MailDataRequired, 'from'>
  | Omit<MailDataRequired, 'from'>[];

SendGrid.setApiKey(envConfig.SENDGRID_API_KEY);

class MailTransporter {
  from: MailDataRequired['from'];

  constructor(from: string) {
    this.from = from;
  }

  async send(options: Options) {
    return SendGrid.send({ from: this.from, ...options } as
      | MailDataRequired
      | MailDataRequired[]);
  }
}

const mailTransporter = new MailTransporter(envConfig.SENDGRID_MAIL_SENDER);

export { mailTransporter };
