import { Elysia } from "elysia";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const app = new Elysia()
  .get("/users", async () => {
    const users = await db.user.findMany();
    return users;
  })
  .post("/users", async (req) => {
    const { name, email }: any = req.body;
    const user = await db.user.create({
      data: {
        name,
        email,
      },
    });
    return user;
  })
  .put("/users/:id", async (req) => {
    const { id } = req.params;
    const { name, email }: any = req.body;
    const user = await db.user.update({
      where: {
        id: id,
      },
      data: {
        name,
        email,
      },
    });
    return user;
  })
  .delete("/users/:id", async (req) => {
    const { id } = req.params;
    const user = await db.user.delete({
      where: {
        id: id,
      },
    });
    return user;
  })
  .get("/users/:id", async (req) => {
    const { id } = req.params;
    const user = await db.user.findUnique({
      where: {
        id: id,
      },
    });
    return user;
  })
  .get("/", () => "Hello World! from Elysia")
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
