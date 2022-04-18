import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@helpers/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;
  const { id } = data;

  if (!id) {
    res.status(422).json({ message: "user id is required" });
    return;
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!existingUser) {
    return res.status(409).json({ message: "user do not exist" });
  }
  res.status(201).json({ user: existingUser });
}
