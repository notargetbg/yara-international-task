import { Container, Row, Col } from 'react-bootstrap';
import Event from './Event';

type Props = {
	onShowModal: () => void
}

export default function EventList({ onShowModal }: Props) {

	const testData = Array.from({length: 10}).map((x, i) => i + 1);
	console.log(testData);

	return (
		<Container>
			<h3>Latest events in <span className='hightlight'>Sofia</span></h3>
			<br />
			<Row>
				{testData.map(eventData => (
					<Col key={`event-${eventData}`} className='event' xs={12} sm={6} md={3}>
						<Event eventData={eventData} onShowModal={onShowModal} />
					</Col>
				))}
			</Row>
		</Container>
	);
}