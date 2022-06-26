import { shield, allow } from "graphql-shield";
import { isAuthenticated } from "./rules";

/*
permissions is a middleware generator which hooks different rules(middlewares) to a graphql schema
to provide an authorization layer on top of it. After that, the schema can be consumed by a graphql server 
*/
export const permissions = shield({
  Query: {
    //   /*
    //   allow is a default rule provided by graphql-shield. This rule lets the resolvers it's
    //   applied on be executed without any checks
    //   */
    query1: allow,
    query2: isAuthenticated,
  },
});
