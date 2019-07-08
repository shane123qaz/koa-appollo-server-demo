import { gql } from "apollo-server-koa";

export const typeDefs = gql`
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
        readError: String
        books: [Book]
        users: [User]
        postcode(postcode: String): Postcode
        postcode404(postcode: String): Postcode
    }

    type Mutation {
        createBook(title: String, author: String, postcode: String): Book
    }
`;