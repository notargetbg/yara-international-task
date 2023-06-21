export type EventData = {
	id: string;
	name: string;
	dates: {
		start: EventStart;
	};
	images: EventImage[];
	venues: Venue[];
}

export type MyEventData = {
	id: string;
	name: string;
	date: string;
	location: string;
	image: string;
}

export type WishlistData = {
	id: string;
	name: string;
	date: string;
	venueName: string;
	ticketsCount: number;
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
	page: Page;
	_embedded: {
		events: EventData[];
	};
	links: {
		first: Link;
		last: Link;
		next: Link;
		self: Link;
	}
}

type Page = {
	number: number;
	size: number;
	totalElements: number;
	totalPages: number;
}

type Link = {
	href: string;
}

export type EventsState = {
	searchText: string;
	data: EventData[];
	wishlistData: WishlistData[];
}

export enum EventActionTypes {
	AddedToWishlist = 'AddedToWishlist',
	RemoveFromWishlist = 'RemoveFromWishlist',
	New = 'New'
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
