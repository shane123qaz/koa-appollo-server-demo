import { ApolloServer } from "apollo-server-koa";
import * as Koa from "koa";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";

const server = new ApolloServer({ typeDefs, resolvers });
const app = new Koa();

server.applyMiddleware({ app });

const port: number = Number(process.env.PORT) || 4000;

app.listen({ port }, () => {
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
});