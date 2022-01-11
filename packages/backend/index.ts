import fastify from "fastify";

const server = fastify();

const deployInfo = {
  RAILWAY_GIT_BRANCH: process.env.RAILWAY_GIT_BRANCH ?? "no branch",
  RAILWAY_GIT_COMMIT_MESSAGE:
    process.env.RAILWAY_GIT_COMMIT_MESSAGE ?? "no commit",
  RAILWAY_STATIC_URL: process.env.RAILWAY_STATIC_URL ?? "no static url",
};

server.get("/", async (request, reply) => {
  reply.code(200).send({ ...deployInfo });
});

server.listen(process.env.PORT || 8080, "0.0.0.0", (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
