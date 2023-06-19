import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { EventsProvider } from './Core/Contexts/EventsContext';
import { Router } from './Core/Router/Router';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';



ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<EventsProvider>
				<Router />
			</EventsProvider>
		</BrowserRouter>
	</React.StrictMode>
);

reportWebVitals();
