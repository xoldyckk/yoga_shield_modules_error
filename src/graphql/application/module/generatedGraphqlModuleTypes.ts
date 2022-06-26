import * as Types from "../generatedGraphqlSchemaTypes";
import * as gm from "graphql-modules";
export namespace ModuleModule {
  interface DefinedFields {
    Query: 'query1' | 'query2';
  };
  
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  
  export interface Resolvers {
    Query?: QueryResolvers;
  };
  
  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
      query1?: gm.Middleware[];
      query2?: gm.Middleware[];
    };
  };
}