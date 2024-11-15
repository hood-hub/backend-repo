require("dotenv").config;
import SMTPTransport from "nodemailer/lib/smtp-transport";
import {
  adminInvitationEmail,
  forgotPasswordEmail,
  resendOTPEmail,
  verifyEmail,
} from "../utils/emailTemplate";
import nodemailer from "nodemailer";

class EmailService {
  private sender = process.env.SENDER_EMAIL as string;
  public async sendVerificationEmail(
    email: string,
    token: number,
    firstName: string
  ): Promise<void> {
    const body = verifyEmail(token, firstName);
    const sender = this.sender;
    const subject = "Verify your account";
    await this.sendEmail(sender, email, subject, body);
  }

  public async sendAdminInvitationEmail(
    email: string,
    password: string,
    firstName: string
  ): Promise<void> {
    const body = adminInvitationEmail(password, firstName);
    const sender = this.sender;
    const subject = "Welcome to The HoodHub Team";
    await this.sendEmail(sender, email, subject, body);
  }

  public async sendForgotPasswordEmail(
    email: string,
    token: number,
    firstName: string
  ): Promise<void> {
    const body = forgotPasswordEmail(token, firstName);
    const sender = this.sender;
    const subject = "Reset Password Token";
    await this.sendEmail(sender, email, subject, body);
  }

  public async sendResetOTPEmail(
    email: string,
    token: number,
    firstName: string
  ): Promise<void> {
    const body = resendOTPEmail(token, firstName);
    const sender = this.sender;
    const subject = "Complete Your Action";
    await this.sendEmail(sender, email, subject, body);
  }

  private async sendEmail(
    sender: string,
    email: string,
    subject: string,
    body: string
  ): Promise<void> {
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST as unknown as string,
      port: process.env.SMTP_PORT,
      secure: true, // upgrade later with STARTTLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.MAIL_SERVICE_API_KEY,
      },
    } as unknown as SMTPTransport.Options);
    const msg = {
      to: email,
      from: sender,
      subject: subject,
      html: body,
    };
    await transporter.sendMail(msg);
  }
}

export default new EmailService();
