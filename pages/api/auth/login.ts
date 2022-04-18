import { NextApiRequest, NextApiResponse } from "next";

import { verifyPassword } from "@helpers/auth";
import prisma from "@helpers/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;
  const { email, password } = data;
  const userEmail = email.toLowerCase();

  if (!userEmail || !userEmail.includes("@")) {
    res.status(422).json({ message: "Invalid email" });
    return;
  }

  if (!password || password.trim().length < 7) {
    res.status(422).json({ message: "Invalid input - password should be at least 7 characters long." });
    return;
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });

  if (!existingUser) {
    return res.status(409).json({ message: "Incorrect email or Password" });
  }

  const verify = await verifyPassword(password, existingUser?.password as string);

  if (!verify) {
    return res.status(409).json({ message: "Incorrect email or Password" });
  }

  res.status(200).json({ user: existingUser });
}
