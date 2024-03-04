import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET as string;

export function generateToken(user: any): string {
  return jwt.sign({ id: user._id }, secret, { expiresIn: "1h" });
}
