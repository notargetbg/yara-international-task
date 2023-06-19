import { Container, Row, Col } from 'react-bootstrap';
import Event from './Event';
import { useEvents } from '../../../Core/Contexts/EventsContext';

type Props = {
	onShowModal: (id: string) => void
}

export default function EventList({ onShowModal }: Props) {
	const events = useEvents();

	return (
		<Container>
			<h3>Latest music events in <span className='hightlight'>Munich</span></h3>
			<br />
			<Row>
				{events?.data?.map(eventData => (
					<Col key={`event-${eventData.id}`} className='event' xs={12} sm={6} md={3}>
						<Event eventData={eventData} onShowModal={onShowModal} />
					</Col>
				))}
			</Row>
		</Container>
	);
}