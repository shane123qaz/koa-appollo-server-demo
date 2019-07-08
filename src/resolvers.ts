import { Book, Postcode } from "./model";
import { books, users } from "./db";
import * as api from "./api";
import * as fs from "fs";

export const resolvers = {
	Query: {
		readError: (parent, args, context) => { fs.readFileSync('/does/not/exist'); },
		books: () => books,
		users: () => users,
		postcode: async (_, args) => {
			return new Postcode(await api.queryPostcode(args.postcode));
		}
		//postcode404: () => api.queryPostcode404("123456")
	},
	Mutation: {
		createBook: async (_, args) => {
			const book = {
				title: args.title,
				author: args.author,
				postcode: await api.queryPostcode("640864")
			}
			books.push(book);
			return new Book(book);
		}
	}
}

