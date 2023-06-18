import { EventData } from '../../../Core/Types/Types';
import EventImage from './EventImage';
import './Event.scss';

type Props = {
	eventData?: EventData | number, // fix this
	onShowModal: () => void
}

export default function Event({ eventData, onShowModal }: Props) {

	console.log(eventData);

	return (
		<>
			{/* <EventActions /> */}
			<h4>Event name</h4>
			<EventImage />
			<p className='h5 short-description'>
				<small>
					Explicabo sit placeat quidem ut error quasi sapiente voluptatum soluta aperiam! Pariatur ipsum architecto quo cumque eum asperiores magni iure possimus eligendi?
				</small>
			</p>
			<small className='view-details' onClick={onShowModal}>{'view details >'}</small>
		</>
	);
}