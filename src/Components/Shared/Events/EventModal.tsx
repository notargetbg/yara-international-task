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

const PRICE_RANGE_NAME = 'standard';
const MAX_TICKETS_COUNT = 10;
const tickets = Array.from({ length: MAX_TICKETS_COUNT }, (ticket, i) => i + 1);

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
		closeModal();
	};

	const handleSetTicketsCount = (e: BaseSyntheticEvent) => {
		setTicketsCount(Number(e.target.value));
	};

	const closeModal = () => {
		setTicketsCount(0);
		props.onHide();
	};

	const priceRange = priceRanges?.find(range => {
		return range.type?.toLowerCase() === PRICE_RANGE_NAME;
	});

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
				<h5 className='mb-0'>Select tickets:</h5>
				{(!priceRanges || !priceRange) && (
					<p>No tickets available</p>
				)}
				{priceRange && (
					<Form.Group as={Row} controlId='numberOfTickets' key={priceRange.type}>
						<Form.Label column sm='8' className='price-label'>
							<span className='fw-bold'>{priceRange.type}: </span>{priceRange.max} {priceRange.currency}
						</Form.Label>
						<Col sm='4'>
							{priceRange.type.toLowerCase() && (
								<Form.Select required onChange={handleSetTicketsCount}>
									<>
										<option>-</option>
										{tickets.map(ticketsCount => (
											<option key={`tickets-count-${ticketsCount}`} value={ticketsCount}>{ticketsCount}</option>
										))}
									</>
								</Form.Select>
							)}
						</Col>
					</Form.Group>
				)}
			</Modal.Body>
			<Modal.Footer>
				<Button disabled={!priceRanges || !ticketsCount} onClick={() => handleAddToWishlist()}>Add to wishlisht</Button>
				<Button variant='danger' onClick={() => closeModal()}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
}
