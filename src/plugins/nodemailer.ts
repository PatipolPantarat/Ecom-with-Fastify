import fb from "fastify-plugin";
import { logger } from "../utils/logger";
import nodemailer from "nodemailer";

const userSender: string = process.env.USER_SENDER as string;
const passSender: string = process.env.PASS_SENDER as string;
const userReceiver: string = process.env.USER_RECEIVER as string;

export default fb(async (fastify, opts) => {
  logger.info("Plugins: Nodemailer starting...");
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
  const sendMail = async (transporter: any, mailOptions: any) => {
    try {
      await transporter.sendMail(mailOptions);
      logger.info("Email sent successfully");
    } catch (err) {
      logger.error("Failed to send email", err);
    }
  };
  sendMail(transporter, mailOptions);
});
