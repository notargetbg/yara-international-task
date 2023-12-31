import { Route, Routes } from 'react-router-dom';

import { MainNav } from '../../Components/Navigation/MainNav';
import HomePage from '../../Components/ComponentPages/HomePage';
import WishlistPage from '../../Components/ComponentPages/WishlistPage';
import AddNewEventPage from '../../Components/ComponentPages/AddNewEventPage';
import MyEventsPage from '../../Components/ComponentPages/MyEventsPage';

export function Router(): React.JSX.Element {
	return (
		<>
			<MainNav />
			<Routes>
				<Route index path='/' element={<HomePage />} />
				<Route path='wishlist' element={<WishlistPage />} />
				<Route path='add-new' element={<AddNewEventPage />} />
				<Route path='my-events' element={<MyEventsPage />} />
			</Routes>
		</>
	);
}
