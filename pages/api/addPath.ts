import prisma from "@/lib/prismaClient";

export default async function handle(req, res) {
  let user = await prisma.user.findUnique({
    where: {
      auth0Id: req.body.auth0Id,
    },
  });

  let path = await prisma.path.create({
    data: {
      user: {
        connect: {
          id: user.id,
        },
      },
      topic: req.body.path.topic,
      level: req.body.path.level,
      methods: req.body.path.methods,
      result: req.body.path.result,
    },
  });

  res.status(200).json(path);
}
