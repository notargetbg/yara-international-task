import { Modal, Button } from 'react-bootstrap';

type Props = {
	modalData: {
		name: string
	} | null,
	onHide?: () => void
};

export default function EventModal(props: Props) {
	const { modalData } = props;

	if (!modalData) return null;

	const { name, _embedded, priceRanges } = modalData;
	const eventLocation = _embedded?.venues[0];

	console.log(modalData);

	return (
		<Modal
			show={!!modalData}
			size='lg'
			aria-labelledby='contained-modal-title-vcenter'
			centered
		>
			<Modal.Header>
				<Modal.Title id='contained-modal-title-vcenter'>
					{name}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<h6>{eventLocation.name} - {eventLocation.city.name}, {eventLocation.country.name}</h6>
				{priceRanges.map(priceRange => (
					<p>{priceRange.type}: {priceRange.min} - {priceRange.max} {priceRange.currency}</p>
				))}
			</Modal.Body>
			<Modal.Footer>
				<Button primary onClick={() => 'add to wishlisht'}>Add to wishlisht</Button>
				<Button onClick={props.onHide}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
}
