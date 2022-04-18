import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@helpers/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;
  const { userId, eventId } = data;

  if (!userId || !eventId) {
    res.status(422).json({ message: "userId and eventId is required" });
    return;
  }

  await prisma.attendee.create({
    data: {
      userId,
      eventId,
    },
  });

  res.status(201).json({ message: "attendee successfully created" });
}
