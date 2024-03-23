import fastify from "fastify";
import { z } from "zod";
import { sql } from "./lib/postgres";
import postgres from "postgres";
import { error } from "console";

const app = fastify();
const PORT = 3000;

app.post("/links", async (request, reply) => {
  const createLinkSchema = z.object({
    code: z.string().min(3),
    url: z.string().url(),
  });

  const { code, url } = createLinkSchema.parse(request.body);

  try {
    const result = await sql/* sql */ `
INSERT INTO short_links (code, original_url)
VALUES (${code}, ${url})
RETURNING id
`;

    const link = result[0];

    return reply.status(201).send({ shortLinkId: link.id });
  } catch (error) {
    if (error instanceof postgres.PostgresError) {
      if (error.code === "23505") {
        return reply.status(400).send({ message: "Duplicated code!" });
      }
    }
  }

  console.log(error);

  return reply.status(500).send({ message: "Internal error." });
});

app
  .listen({
    port: PORT,
  })
  .then(() => {
    console.log(`Server running on port: ${PORT}!`);
  });
