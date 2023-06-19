import { EventData } from '../../../Core/Types/Types';
import EventImage from './EventImage';
import './Event.scss';

type Props = {
	eventData: EventData,
	onShowModal: (id: string) => void
}

const imageRatio = '16_9';

export default function Event({ eventData, onShowModal }: Props) {
	const { name, dates, images, id } = eventData;
	const { localTime, localDate } = dates.start;
	const image = images.find(x => x.ratio === imageRatio && x.width > 250);

	return (
		<>
			{/* <EventActions /> */}
			{/* add min height or similar */}
			<h4>{name}</h4>
			<EventImage image={image?.url} />
			<strong>{localDate}, {localTime.substring(0, localTime.length - 3)}</strong>
			{/* <p className='h5 short-description'>
				<small>
					Explicabo sit placeat quidem ut error quasi sapiente voluptatum soluta aperiam! Pariatur ipsum architecto quo cumque eum asperiores magni iure possimus eligendi?
				</small>
			</p> */}
			<small className='view-details' onClick={() => onShowModal(id)}>{'view details >'}</small>
		</>
	);
}