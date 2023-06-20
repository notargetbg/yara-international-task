import { Button } from 'react-bootstrap';
import { EventData } from '../../../Core/Types/Types';
import EventImage from './EventImage';
import './Event.scss';
import { displayDate } from '../../../Core/Helpers/displayHelpers';

type Props = {
	eventData: EventData;
	onShowModal: (id: string) => void;
}

const imageRatio = '16_9';

export default function Event({ eventData, onShowModal }: Props): React.JSX.Element {
	const { name, dates, images, id } = eventData;
	const image = images.find(x => x.ratio === imageRatio && x.width > 250);

	return (
		<>
			<h4 className='event-title'>{name}</h4>
			<EventImage image={image?.url} />
			<p className='mb-0'>
				<small>{displayDate(dates.start)}</small>
			</p>
			<Button size='sm' variant='secondary' className='view-details' onClick={() => onShowModal(id)}>{'View Details'}</Button>
		</>
	);
}