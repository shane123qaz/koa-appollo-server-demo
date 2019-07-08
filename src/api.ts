import * as fetch from "node-fetch";

export const queryPostcode = (postcode: string) => {
	return fetch(`https://developers.onemap.sg/commonapi/search?searchVal=${postcode}&returnGeom=Y&getAddrDetails=N&pageNum=1`)
		.then(res => res.json())
		.then(data => ({
			value: postcode,
			latitude: data.results[0].LATITUDE,
			longitude: data.results[0].LONGITUDE,
		}))
}

/*
export const queryPostcode404 = (postcode: string) => {
	return fetch(`https://jsonplaceholder.typicode.com/posts/999`)
		.then(res => res.json())
		.then(data => ({
			value: postcode,
			latitude: data.results[0].LATITUDE,
			longitude: data.results[0].LONGITUDE,
		}))
}
*/