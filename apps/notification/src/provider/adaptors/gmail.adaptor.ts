import SMTPTransport from 'nodemailer/lib/smtp-transport';
import nodemailer from 'nodemailer';
import { IEmailAdaptor, TEmailAdaptorSendInput } from '../provider.type';

export class GmailAdaptor implements IEmailAdaptor {
  private readonly mailTransporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

  constructor(private readonly user: string, private readonly pass: string) {
    this.mailTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: user,
        pass: pass,
      },
    });
  }

  send(args: TEmailAdaptorSendInput) {
    console.log({
      from: args.sender,
      to: args.receiver,
      subject: args.subject,
      text: args.message,
    });

    this.mailTransporter.sendMail(
      {
        from: args.sender,
        to: args.receiver,
        subject: args.subject,
        text: args.message,
      },
      function (err, data) {
        if (err) throw err;
      }
    );
  }
}
