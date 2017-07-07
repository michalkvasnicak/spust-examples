// @flow

import BodyParser from 'spust-koa/lib/BodyParser';
import GraphQL from 'spust-koa/lib/ApolloGraphQL';
import GraphiQL from 'spust-koa/lib/GraphiQL';
import React from 'react';
import Server from 'spust-koa/lib/Server';
import serve from 'spust-koa';
import { makeExecutableSchema } from 'graphql-tools';

const typeDefs = `
  type Query {
    hello(name: String!): String!
  }

  schema {
    query: Query
  }
`;

const resolvers = {
  Query: {
    hello: (source: *, args: { name: string }) => `Hello ${args.name}!`,
  },
};

export default serve(
  <Server port={parseInt(process.env.PORT || 3000, 10)}>
    <BodyParser />
    <GraphiQL path="/" />
    <GraphQL schema={makeExecutableSchema({ typeDefs, resolvers })} />
  </Server>,
);
