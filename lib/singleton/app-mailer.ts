import nodemailer from "nodemailer";
import SMTPConnection from "nodemailer/lib/smtp-connection";
import { serverEnvironment } from "../constants/ServerEnvironment";

/** Options specifying the connection to the e-mail service */
const mailOptions: SMTPConnection.Options = {
  host: serverEnvironment.EMAIL_HOST,
  port: serverEnvironment.EMAIL_PORT,
  secure: true,
  auth: {
    user: serverEnvironment.EMAIL_USER,
    pass: serverEnvironment.EMAIL_PASS,
  },
};

/** E-mail client used by this service */
export const emailTransporter = nodemailer.createTransport(mailOptions);
