import { Modal, Button, Form, Row, Col, Image } from 'react-bootstrap';
import { PriceRange, WishlistData, EventStart, EventData } from '../../../Core/Types/Types';
import { displayDate, displayVenueName } from '../../../Core/Helpers/displayHelpers';
import './EventModal.scss';
import { BaseSyntheticEvent, useState } from 'react';

type Props = {
	modalData: ModalData | null;
	addToWishlist: (wishlistData: WishlistData) => void;
	onHide: () => void;
};

type ModalData = {
	id: string;
	name: string;
	dates: {
		start: EventStart
	};
	_embedded: EventData;
	priceRanges: PriceRange[];
	seatmap: {
		staticUrl: string
	};
}

export default function EventModal(props: Props): React.JSX.Element | null {
	const [ticketsCount, setTicketsCount] = useState(0);
	const { modalData, addToWishlist } = props;

	if (!modalData || !modalData._embedded || !modalData._embedded.venues.length) return null;

	const { name, _embedded, priceRanges, seatmap, id, dates } = modalData;
	const eventLocation = _embedded?.venues[0];
	const date = displayDate(dates.start);
	const venueName = displayVenueName(eventLocation);

	const handleAddToWishlist = () => {
		const wishlistData = {
			id,
			name,
			date,
			venueName,
			ticketsCount
		};

		addToWishlist(wishlistData);
	};

	const handleSetTicketsCount = (e: BaseSyntheticEvent) => {
		setTicketsCount(Number(e.target.value));
	};

	const handleClose = () => {
		setTicketsCount(0);
		props.onHide();
	};

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
				<h4>{venueName}</h4><br />
				{seatmap?.staticUrl && (
					<Image className='event-seatmap mb-3' src={seatmap.staticUrl} />
				)}
				<h5>Ticket options:</h5>
				{!priceRanges && (
					<p>No tickets available</p>
				)}
				{priceRanges?.map(priceRange => (
					<Form.Group as={Row} className='mt-4' controlId='numberOfTickets' key={priceRange.type}>
						<Form.Label column sm='9' className='price-label'>
							<span className='fw-bold'>{priceRange.type}: </span>{priceRange.max} {priceRange.currency}
						</Form.Label>
						<Col sm='3'>
							{priceRange.type.toLowerCase().includes('fees') && (
								<Form.Control type='number' onChange={handleSetTicketsCount} defaultValue='0' />
							)}
						</Col>
					</Form.Group>
				))}
			</Modal.Body>
			<Modal.Footer>
				{/* disable whem no tickets are selected */}
				<Button disabled={!priceRanges || !ticketsCount} onClick={() => handleAddToWishlist()}>Add to wishlisht</Button>
				<Button variant='danger' onClick={() => handleClose()}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
}
