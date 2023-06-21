import prisma from "@/lib/prismaClient";

export default async function handle(req, res) {

  let paths = await prisma.path.findMany({
    where: {
      user: {
        auth0Id: req.body.sub,
      },
    },
  });

  res.status(200).json(paths);
}
