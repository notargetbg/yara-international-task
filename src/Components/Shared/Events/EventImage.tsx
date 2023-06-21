import { Image } from 'react-bootstrap';
import placeholderImg from '../../../Assets/placeholder-image.png';

type Props = {
	image?: string | null
}

export default function EventImage({ image }: Props): React.JSX.Element {

	const eventImage = image || placeholderImg;

	return (
		<div>
			<Image src={eventImage} thumbnail alt='Event image placeholder' />
		</div>
	);
}