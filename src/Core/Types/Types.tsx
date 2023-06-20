export type EventData = {
	id: string;
	name: string;
	dates: {
		start: EventStart;
	};
	images: EventImage[];
	venues: Venue[];
}

export type WishlistData = {
	id: string;
	name: string;
	date: string;
	venueName: string;
}

export type Venue = {
	name: string;
	city: {
		name: string;
	};
	country: {
		name: string;
	};
}

export type EventStart = {
	localDate: string;
	localTime: string;
}

export type EventImage = {
	ratio: string;
	url: string;
	width: number;
}

export type EventsResponse = {
	event?: JSON;
	data: EventData[];
}

export type EventsState = {
	searchText: string;
	data: EventData[];
	wishlist: WishlistData[];
}

export enum EventActionTypes {
	AddedToWishlist,
	New
}

export type SearchParams = {
	searchText?: string;
	city?: string;
	classificationName?: string;
}

export type PriceRange = {
	min: number;
	max: number;
	currency: string;
	type: string;
}
