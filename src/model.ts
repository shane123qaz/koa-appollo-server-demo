
export class Postcode {
    value: string;
    latitude: string;
    longitude: string;

    constructor({ value, latitude, longitude }) {
        this.value = value;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}

export class Book {
    title: string;
    author: string;
    postcode: Postcode;

    constructor({ title, author, postcode }) {
        this.title = title;
        this.author = author;
        this.postcode = postcode;
    }
}