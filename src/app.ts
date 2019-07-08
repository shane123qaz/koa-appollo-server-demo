import { ApolloServer, gql } from "apollo-server-koa";
import * as Koa from "koa";
import * as fetch from "node-fetch";

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
        postcode: Postcode
    }

    type Postcode {
        value: String
        latitude: String
        longitude: String
    }


    type Query {
        books: [Book]
        users: [User]
        postcode(postcode: String): Postcode
    }

    type Mutation {
        createBook(title: String, author: String, postcode: String): Book
    }
`;

class Postcode {
    value: string;
    latitude: string;
    longitude: string;

    constructor({ value, latitude, longitude }) {
        this.value = value;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
class Book {
    title: string;
    author: string;
    postcode: Postcode;

    constructor({ title, author, postcode }) {
        this.title = title;
        this.author = author;
        this.postcode = postcode;
    }
}

const resolvers = {
    Query: {
        books: () => books,
        users: () => users,
        postcode(postcode: string) {
            return fetch("https://developers.onemap.sg/commonapi/search?searchVal=640864&returnGeom=Y&getAddrDetails=N&pageNum=1")
                .then(res => res.json())
                .then(data => ({
                    latitude: data.results[0].LATITUDE,
                    longitude: data.results[0].LONGITUDE,
                }))
        }
    },
    Mutation: {
        createBook: async (_, args) => {
            const book = {
                title: args.title,
                author: args.author,
                postcode: await fetch("https://developers.onemap.sg/commonapi/search?searchVal=640864&returnGeom=Y&getAddrDetails=N&pageNum=1")
                    .then(res => res.json())
                    .then(data => ({
                        latitude: data.results[0].LATITUDE,
                        longitude: data.results[0].LONGITUDE,
                    }))
            }
            books.push(book);
            return new Book(book);
        }
    }
}


const server = new ApolloServer({ typeDefs, resolvers });
const app = new Koa();

server.applyMiddleware({ app });

const port: number = Number(process.env.PORT) || 4000;
app.listen({ port }, () => {
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
});