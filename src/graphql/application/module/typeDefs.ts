import { gql } from "graphql-modules";

const query1 = gql`
  type Query {
    query1: String!
  }
`;

const query2 = gql`
  extend type Query {
    query2: String!
  }
`;

export const typeDefs = [query1, query2];
