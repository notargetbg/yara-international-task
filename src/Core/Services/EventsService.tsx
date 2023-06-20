import { AxiosResponse } from 'axios';
import { EventsAPI } from './EventsAPI';
import { EventsResponse, SearchParams, EventData } from '../Types/Types';

const resourceName = 'events';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function searchEvents(searchParams: SearchParams): Promise<EventsResponse | any> {
    try {
        const events: AxiosResponse<EventsResponse> = await EventsAPI.get(resourceName, {
            params: {
                city: searchParams.city,
                keyword: searchParams.searchText,
                classificationName: searchParams.classificationName
            }
        });

        return events.data;
    } catch (error) {
        console.log(error);

        return error;
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getEventDetails(id: string): Promise<EventData | any> {
    try {
        const event: AxiosResponse<EventsResponse> = await EventsAPI.get(`${resourceName}/${id}`);

        return event.data;
    } catch (error) {
        console.log(error);

        return error;
    }
}