import { useEffect, useState } from 'react';
import logo from '../../Assets/logo.svg';
import EventList from '../Shared/Events/EventList';
import EventModal from '../Shared/Events/EventModal';
import { Params, SearchActionTypes } from '../../Core/Types/Types';
import { getEventDetails, searchEvents } from '../../Core/Services/EventsService';
import { useEvents } from '../../Core/Contexts/EventsContext';
import './HomePage.scss';

// const setEvents = (events: EventsState) => async ({ searchText }: SearchParams) => {
// if search term is the same as previous do not make the request
// if (events.searchText === searchText && searchText !== '') {
// 	return;
// }

// call the rentals api
// const eventsData: EventsResponse = await searchEvents({
// 	[Params.keyword]: searchText,
// });

// console.log(eventsData);

// save to context
// events.dispatch?.({
// 	type: SearchActionTypes.New,
// 	eventsData,
// 	searchText
// });
// };

function HomePage() {
	// {
	// 	isModalShown: false,
	// 	eventId: null
	// }
	const [modalData, setModalData] = useState(null);
	const events = useEvents();

	// const defaultMessage = 'Please, type your search and press "Enter"';

	useEffect(() => {
		const fetchEvents = async () => {
			const eventsData = await searchEvents({
				[Params.SearchText]: '',
			});

			console.log('from effect', events);

			events.dispatch?.({
				type: SearchActionTypes.New,
				data: eventsData._embedded.events
			});
		};

		fetchEvents()
			// make sure to catch any error
			.catch(console.error);

	}, []);

	const showEventDetails = async (id: string) => {
		const modalData = await getEventDetails(id);
		setModalData(modalData);
	};

	console.log('from component', events);

	return (
		<div className='homepage'>
			<header className='homepage-header'>
				<img src={logo} className='homepage-logo' alt='logo' />
				{/* <p>
						Edit <code>src/App.js</code> and save to reload.
				</p>
				<a
						className="homepage-link"
						href="https://reactjs.org"
						target="_blank"
						rel="noopener noreferrer"
				>
						Learn React
				</a> */}
				{/* <Search handleSearch={setEvents(events)} /> */}
				<EventList onShowModal={(id) => showEventDetails(id)} />
				<EventModal modalData={modalData} onHide={() => setModalData(null)} />
			</header>
		</div>
	);
}

export default HomePage;
