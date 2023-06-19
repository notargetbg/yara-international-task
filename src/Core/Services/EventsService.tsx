import { AxiosResponse } from 'axios';
import { EventsAPI } from './EventsAPI';
import { EventsResponse, EventDetailsResponse, SearchParams } from '../Types/Types';

const resourceName = 'events';
const classificationName = 'Music';
const defaultCity = 'Munich';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function searchEvents(searchParams: SearchParams): Promise<EventsResponse | any> {

    console.log(searchParams);

    try {
        // events request
        const events: AxiosResponse<EventsResponse> = await EventsAPI.get(resourceName, {
            params: {
                keywords: 'something',
                city: defaultCity,
                classificationName: classificationName
            }
        });

        return events.data;
    } catch (error) {
        console.log(error);

        return error;
    }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getEventDetails(id: string): Promise<EventDetailsResponse | any> {
    try {
        // event details request
        const event: AxiosResponse<EventsResponse> = await EventsAPI.get(`${resourceName}/${id}`);

        return event.data;
    } catch (error) {
        console.log(error);

        return error;
    }
}