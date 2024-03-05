import { logger } from "../utils/logger";
import nodemailer from "nodemailer";
import * as crypto from "crypto";

const userSender: string = process.env.USER_SENDER as string;
const passSender: string = process.env.PASS_SENDER as string;
const userReceiver: string = process.env.USER_RECEIVER as string;

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: userSender,
    pass: passSender,
  },
});
const mailOptions = {
  from: {
    name: "Ecom-with-Fastify",
    address: userSender,
  },
  to: userReceiver,
  subject: "Testing Reset Password",
  text: "Hello",
};
const sendMail = async () => {
  try {
    await transporter.sendMail(mailOptions);
    logger.info("Email sent successfully");
  } catch (err) {
    logger.error("Failed to send email", err);
  }
};

export const generateRandomPassword = (length: number = 12): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += characters.charAt(crypto.randomInt(characters.length));
  }
  return password;
};

export const sendResetPassword = async (
  email: string,
  randomPassword: string
) => {
  let message = `Your new password is: "${randomPassword}" ,please login and change it immediately.`;
  mailOptions.to = email;
  mailOptions.text = message;
  sendMail();
};
