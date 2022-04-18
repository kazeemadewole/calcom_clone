import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@helpers/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;
  const { name } = data;

  if (!name) {
    res.status(422).json({ message: "name is required" });
    return;
  }

  await prisma.eventType.create({
    data: {
      name,
    },
  });

  res.status(201).json({ message: "Event type created" });
}
