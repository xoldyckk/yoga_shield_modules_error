import { rule } from "graphql-shield";

/*
isAuthenticated is a rule(middleware) which checks whether the client that's making the current request is authenticated.
Rules are hooked to resolvers and act as a shield(middleware layer).
The resolver is only accessible when that rule evaluates to true.
*/
export const isAuthenticated = rule("isAuthenticated", { cache: "contextual" })(
  async (_parent, _args, context, info) => {
    if (!context.currentUser.isAuthenticated) {
      return new Error(
        `You are not authenticated to access '${
          info.fieldName
        }' ${info.parentType.toString().toLowerCase()} field.`
      );
    } else {
      return true;
    }
  }
);
