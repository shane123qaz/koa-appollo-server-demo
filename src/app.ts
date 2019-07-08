import { ApolloServer, gql } from "apollo-server-koa";
import * as Koa from "koa";

const books = [
    {
      title: 'Harry Potter and the Chamber of Secrets',
      author: 'J.K. Rowling',
    },
    {
      title: 'Jurassic Park',
      author: 'Michael Crichton',
    },
];

const users = [
    {
        id: 1,
        name: "Shane",
        friends: [
            {
                id: 2,
                name: "Hello Ketty"
            }
        ]
    }
]

const typeDefs = gql`
    type Friend {
        id: ID
        name: String
    }

    type User {
        id: ID
        name: String
        friends: [Friend]
    }

    type Book {
        title: String
        author: String
    }

    type Query {
        books: [Book]
        users: [User]
    }
`;

const resolvers = {
    Query: {
        books: () => books,
        users: () => users
    }
}


const server = new ApolloServer({typeDefs, resolvers});
const app = new Koa();

server.applyMiddleware({app});

const port: number = Number(process.env.PORT) || 4000;
app.listen({port}, () => {
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
});