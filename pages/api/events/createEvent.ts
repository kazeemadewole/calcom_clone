import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@helpers/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;
  const { name, place, eventTypeId } = data;

  if (!name || !eventTypeId) {
    res.status(422).json({ message: "name and event type id is required" });
    return;
  }

  await prisma.event.create({
    data: {
      name,
      place,
      eventTypeId,
      booked: false,
    },
  });

  res.status(201).json({ message: "Event created" });
}
