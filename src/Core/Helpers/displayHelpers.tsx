import { EventStart, Venue } from '../Types/Types';

export const displayDate = ({ localDate, localTime }: EventStart): string => {
    const formattedTime = localTime ? `, ${localTime.substring(0, localTime.length - 3)}` : '';
    return `${localDate}${formattedTime}`;
};

export const displayVenueName = (eventLocation: Venue): string => {
    return `${eventLocation.name} - ${eventLocation.city.name}, ${eventLocation.country.name}`;
};