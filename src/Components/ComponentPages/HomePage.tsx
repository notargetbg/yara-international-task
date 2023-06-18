import { useState } from 'react';
import logo from '../../Assets/logo.svg';
import EventList from '../Shared/Events/EventList';
import EventModal from '../Shared/Events/EventModal';
import './HomePage.scss';

function HomePage() {
	// {
	// 	isModalShown: false,
	// 	eventId: null
	// }
	const [modalShow, setModalShow] = useState(false);

	return (
		<div className='homepage'>
			<header className='homepage-header'>
				<img src={logo} className='homepage-logo' alt='logo' />
				{/* <p>
						Edit <code>src/App.js</code> and save to reload.
				</p>
				<a
						className="homepage-link"
						href="https://reactjs.org"
						target="_blank"
						rel="noopener noreferrer"
				>
						Learn React
				</a> */}
				{/* <Search /> */}
				<EventList onShowModal={() => setModalShow(true)} />
				<EventModal show={modalShow} onHide={() => setModalShow(false)} />
			</header>
		</div>
	);
}

export default HomePage;
