import { createModule } from "graphql-modules";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";

export const module = createModule({
  /*
  id is a unique identifer for the module for graphql-modules
  to differentiate between different modules easily and
  provide better debugging experience
  */
  id: "module",
  /*
  dirname also helps while debugging the code provding us the exact
  location where the errors occurred
  */
  dirname: __dirname,
  /*
  typeDefs takes in an array of graphql type defintions.
  It is encouraged to make use of the 'gql' tag exported
  from graphql-modules package to write and export
  type definitions.
  */
  typeDefs,
  /*
  resolvers option takes in an object which represents the
  root resolvers defined in type definitions for this module
  */
  resolvers,
});
