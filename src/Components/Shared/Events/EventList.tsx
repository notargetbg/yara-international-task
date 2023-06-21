import { Container, Row, Col, Spinner } from 'react-bootstrap';
import Event from './Event';
import { useEvents } from '../../../Core/Contexts/EventsContext';
import React from 'react';

type Props = {
	onShowModal: (id: string) => void;
	isLoading?: boolean;
}

export default function EventList({ onShowModal, isLoading }: Props): React.JSX.Element {
	const events = useEvents();

	return (
		<>
			{isLoading && (
				<Container>
					<Spinner className='mt-5' animation='grow' />
				</Container>
			)}

			{!isLoading && (
				<Container>
					{events?.data?.length > 0 && (
						<h3 className='mt-3'>Upcoming events</h3>
					)}
					<br />
					<Row>
						{events?.data?.map(eventData => (
							<Col key={`event-${eventData.id}`} className='event' xs={12} sm={6} md={3}>
								<Event eventData={eventData} onShowModal={onShowModal} />
							</Col>
						))}

						{!events?.data?.length && (
							<h4>No events found...</h4>
						)}
					</Row>
				</Container>
			)}
		</>
	);
}