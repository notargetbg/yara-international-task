import React, { createContext, useContext, useReducer } from 'react';
import { EventActionTypes, EventData, EventsState, WishlistData } from '../Types/Types';

export interface EventsContext {
    data: EventData[];
    wishlistData?: WishlistData[];
    searchText: string;
    dispatch?: React.Dispatch<EventsAction>;
}

type EventsAction =
    { type: EventActionTypes.AddedToWishlist, wishlistData: WishlistData }
    | { type: EventActionTypes.RemoveFromWishlist, id: string }
    | { type: EventActionTypes.New, data: EventData[], searchText: string };

const initialSearchText = {
    searchText: '',
};

const initialEvents: EventsState = {
    searchText: '',
    data: [],
    wishlistData: []
};

const initialState = {
    ...initialEvents,
    ...initialSearchText
};

export const EventsContext = createContext<EventsContext>(initialState);

export function EventsProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
    const [events, dispatch] = useReducer(
        eventsReducer,
        initialState
    );

    return (
        <EventsContext.Provider value={{
            ...events,
            dispatch
        }}>
            {children}
        </EventsContext.Provider>
    );
}

export function useEvents(): EventsContext {
    return useContext(EventsContext);
}

function eventsReducer(state: EventsState, action: EventsAction): EventsState {

    switch (action.type) {
        case EventActionTypes.AddedToWishlist: {
            const wishlistData = action.wishlistData || [];

            return {
                ...state,
                wishlistData: [...state.wishlistData, wishlistData],
            };
        }
        case EventActionTypes.RemoveFromWishlist: {
            return {
                ...state,
                wishlistData: state.wishlistData.filter(item => item.id !== action.id),
            };
        }
        case EventActionTypes.New: {
            return {
                ...state,
                data: action.data,
                searchText: action.searchText
            };
        }
        default: {
            throw Error('Unknown action: ' + (action as EventsAction).type);
        }
    }
}