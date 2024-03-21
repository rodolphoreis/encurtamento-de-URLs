import fastify from "fastify";
import { Schema, z } from "zod";
import { sql } from "./lib/postgres";

const app = fastify();
const PORT = 3000;

app.post("/links", async (request) => {
  const createLinkSchema = z.object({
    code: z.string().min(3),
    url: z.string().url(),
  });

  const { code, url } = createLinkSchema.parse(request.body);

  const result = await sql/* sql */ `
INSERT INTO short_links (code, original_url)
VALUES (${code}, ${url})
RETURNING id
`;

  return "OK";
});

app.post("/teste", () => {});

app
  .listen({
    port: PORT,
  })
  .then(() => {
    console.log(`Server running on port: ${PORT}!`);
  });
