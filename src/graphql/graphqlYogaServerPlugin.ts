import { FastifyPluginAsync, FastifyRequest, FastifyReply } from "fastify";
import { createServer } from "@graphql-yoga/node";
import { useGraphQLModules } from "@envelop/graphql-modules";
import { useGraphQLMiddleware } from "@envelop/graphql-middleware";
import { application } from "./application";
import { permissions } from "./shield";

export const graphQLYogaServerPlugin: FastifyPluginAsync = async (
  fastifyInstance,
  options
) => {
  const graphQLYogaServer = createServer<{
    request: FastifyRequest;
    reply: FastifyReply;
  }>({
    context: (initialContext) => {
      return {
        ...initialContext,
        currentUser: {
          isAuthenticated: false,
        },
      };
    },
    plugins: [
      useGraphQLMiddleware([permissions]),
      useGraphQLModules(application),
    ],
    // Integrate Fastify logger
    logging: {
      debug: (...args) => args.forEach((arg) => fastifyInstance.log.debug(arg)),
      info: (...args) => args.forEach((arg) => fastifyInstance.log.info(arg)),
      warn: (...args) => args.forEach((arg) => fastifyInstance.log.warn(arg)),
      error: (...args) => args.forEach((arg) => fastifyInstance.log.error(arg)),
    },
  });

  fastifyInstance.route({
    url: "/graphiql",
    method: ["GET", "POST", "OPTIONS"],
    handler: async (request, reply) => {
      // Second parameter adds Fastify's `req` and `reply` to the GraphQL Context
      const response = await graphQLYogaServer.handleIncomingMessage(request, {
        request,
        reply,
      });

      response.headers.forEach((value, key) => {
        reply.header(key, value);
      });

      reply.status(response.status);

      reply.send(response.body);

      return reply;
    },
  });
};
