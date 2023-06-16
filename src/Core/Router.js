import { Route, Routes } from 'react-router-dom';

import MainLayout from '../Components/Navigation/MainLayout';
import HomePage from '../Components/ComponentPages/HomePage';
import { MainNav } from '../Components/Navigation/MainNav';

export function Router() {
	return (
	<>
		<MainNav />
		<Routes>
				<Route index path='/' element={<HomePage />} />
				<Route path='add-new' element={<h1>Add new</h1>} />
				<Route path='wishlist' element={<h1>Wishlist</h1>} />
				<Route path='my-events' element={<h1>My events</h1>} />
		</Routes>
	</>
	);
}