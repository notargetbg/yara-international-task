import { Route, Routes } from 'react-router-dom';

import HomePage from '../../Components/ComponentPages/HomePage';
import { MainNav } from '../../Components/Navigation/MainNav';
import WishlistPage from '../../Components/ComponentPages/WishlistPage';

export function Router() {
	return (
		<>
			<MainNav />
			<Routes>
				<Route index path='/' element={<HomePage />} />
				<Route path='wishlist' element={<WishlistPage />} />
				<Route path='add-new' element={<h1>Add new</h1>} />
				<Route path='my-events' element={<h1>My events</h1>} />
			</Routes>
		</>
	);
}