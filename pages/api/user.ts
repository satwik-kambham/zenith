import prisma from "@/lib/prismaClient";

export default async function handle(req, res) {
  let user = await prisma.user.findUnique({
    where: {
      auth0Id: req.body.sub,
    },
  });
  console.log(user);

  if (!user) {
    user = await prisma.user.create({
      data: {
        auth0Id: req.body.sub,
        name: req.body.name,
        email: req.body.email,
      },
    });
  }
  res.status(200).json(user);
}
