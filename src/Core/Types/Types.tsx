export type EventData = {
	name: string;
	dates: {
		start: {
			localDate: string;
			localTime: string;
		}
	};
	images: EventImage[];
	id: string;
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

export type EventDetailsResponse = {
	foo: string
}

export type SearchAction = {
	New: string;
	Added: string;
}

export enum SearchActionTypes {
	Added = 'Added',
	New = 'New'
}

export type SearchParams = {
	searchText: string;
}

export enum Params {
	keyword
}