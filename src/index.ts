import "dotenv/config";
import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifySensible from "@fastify/sensible";
import { graphQLYogaServerPlugin } from "./graphql";

const fastifyServer = fastify({
  logger: {
    transport:
      process.env.NODE_ENV === "development"
        ? {
            target: "pino-pretty",
            options: {
              translateTime: "HH:MM:ss Z",
              ignore: "pid,hostname",
            },
          }
        : undefined,
  },
});

fastifyServer.register(fastifyCors, {
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
});

fastifyServer.register(fastifySensible, {});

fastifyServer.register(graphQLYogaServerPlugin, {});

export const startServer = async (port: number, host: string) => {
  const address = await fastifyServer.listen({ port, host });
  fastifyServer.log.info({}, `Graphiql running on ${address}/graphiql`);
};

startServer(4000, "0.0.0.0");
