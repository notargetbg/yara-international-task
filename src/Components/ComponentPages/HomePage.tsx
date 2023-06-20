import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import EventList from '../Shared/Events/EventList';
import EventModal from '../Shared/Events/EventModal';
import { EventActionTypes, WishlistData } from '../../Core/Types/Types';
import { getEventDetails, searchEvents } from '../../Core/Services/EventsService';
import { useEvents } from '../../Core/Contexts/EventsContext';
import Search from '../Shared/Search';
import './HomePage.scss';

// const defaultClassificationName = 'Music';
// const defaultCity = 'Munich';

function HomePage() {
	const [modalData, setModalData] = useState(null);
	// const [isLoading, setLoading] = useState(false);
	const events = useEvents();

	useEffect(() => {
		// const fetchEvents = async (): Promise<void> => {
		// 	// setLoading(true);

		// 	const eventsData = await searchEvents({
		// 		city: defaultCity,
		// 		classificationName: defaultClassificationName,
		// 		searchText: '',
		// 	});

		// 	events.dispatch?.({
		// 		searchText: '',
		// 		type: EventActionTypes.New,
		// 		data: eventsData._embedded?.events
		// 	});
		// };

		// fetchEvents()
		// 	// make sure to catch any error
		// 	.catch(console.error)
		// 	.finally(() => {
		// 		// setLoading(false);
		// 	});

	}, []);

	const showEventDetails = async (id: string): Promise<void> => {
		const modalData = await getEventDetails(id);
		setModalData(modalData);
	};

	const handleSearchEvent = async (e: React.KeyboardEvent): Promise<void> => {
		const { key, target } = e;

		if (key === 'Enter' && (target as HTMLInputElement).value.length) {
			// setLoading(true);
			const eventsData = await searchEvents({
				searchText: (target as HTMLInputElement).value,
			}).finally(() => {
				// setLoading(false);
			});

			// dispatch new events
			events.dispatch?.({
				searchText: (target as HTMLInputElement).value,
				type: EventActionTypes.New,
				data: eventsData._embedded?.events
			});
		}
	};

	const handleAddToWishlist = (wishlistData: WishlistData) => {
		events.dispatch?.({
			type: EventActionTypes.AddedToWishlist,
			wishlistData
		});
	};

	return (
		<div className='homepage'>
			<Container className='mt-5'>
				<Row>
					<Col md={{ span: 6, offset: 3 }}>
						<Search handleSearch={(e: React.KeyboardEvent) => handleSearchEvent(e)} />
					</Col>
				</Row>
			</Container>
			<EventList isLoading={false} onShowModal={(id) => showEventDetails(id)} />
			<EventModal
				modalData={modalData}
				addToWishlist={(wishlistData) => handleAddToWishlist(wishlistData)}
				onHide={() => setModalData(null)}
			/>
		</div>
	);
}

export default HomePage;
