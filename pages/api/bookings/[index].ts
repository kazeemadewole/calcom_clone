import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@helpers/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return;
  }

  console.log(req.query.index, "id");
  const id = Number(req.query.index);

  if (!id) {
    res.status(422).json({ message: "Invalid user id" });
    return;
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!existingUser) {
    return res.status(409).json({ message: "Invalid user" });
  }

  const Events = await prisma.attendee.findMany({
    where: {
      userId: id,
    },
    include: {
      event: true,
      user: true,
    },
  });

  return res.status(200).json({ event: Events });
}
