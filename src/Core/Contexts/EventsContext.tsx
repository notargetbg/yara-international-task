import React, { createContext, useContext, useReducer } from 'react';
import { EventsResponse, SearchAction } from '../Types/Types';

export interface EventsState extends EventsResponse {
    searchText: string;
    dispatch?: React.Dispatch<EventsAction>;
}

type EventsAction =
    { type: SearchAction.Added, records: EventsResponse, searchText: string }
    | { type: SearchAction.New, records: EventsResponse, searchText: string };

const initialSearchText = {
    searchText: '',
};

const initialEvents: EventsResponse = {
    data: [],
    included: [],
    meta: {
        total: 0,
        start_position: 0,
        stop_position: 0
    },
};

const initialState = {
    ...initialEvents,
    ...initialSearchText
};

export const EventsContext = createContext<EventsState>(initialState);

export function EventsProvider({ children }: { children: React.ReactNode }) {
    const [events, dispatch] = useReducer(
        eventsReducer,
        initialState
    );

    // set the provider value and add dispatch in order to use it easily across the components
    return (
        <EventsContext.Provider value={{
            ...events,
            dispatch
        }}>
            {children}
        </EventsContext.Provider>
    );
}

export function useEvents() {
    return useContext(EventsContext);
}

function eventsReducer(state: EventsResponse, action: EventsAction) {
    switch (action.type) {
        case SearchAction.Added: {
            const data = action.records.data || [];
            const included = action.records.included || [];

            return {
                data: [...state.data, ...data],
                included: [...state.included, ...included],
                meta: action.records.meta,
                searchText: action.searchText
            };
        }
        case SearchAction.New: {
            return {
                ...state,
                ...action.records,
                searchText: action.searchText
            };
        }
        default: {
            throw Error('Unknown action: ' + (action as EventsAction).type);
        }
    }
}