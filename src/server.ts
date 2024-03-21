import fastify from "fastify";

const app = fastify();
const PORT = 3000;

app.get("/teste", () => {
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
