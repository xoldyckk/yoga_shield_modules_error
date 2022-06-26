import { ModuleModule } from "./generatedGraphqlModuleTypes";

export const resolvers: ModuleModule.Resolvers = {
  Query: {
    query1: async (_parent, _args, _context, _info) => {
      return "this is query1";
    },

    query2: async (_parent, _args, _context, _info) => {
      return "this is query2";
    },
  },
};
