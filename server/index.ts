import express, { Express, Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const pageSize = 30;

app.use(cors());

app.get('/', (req: Request, res: Response) => {
	res.send('Express + TypeScript Server');
});

// move this to router
app.get('/events', async (req, res) => {

	console.log(req.query);

	try {
		const { keyword } = req.query;
		// const { data } = await axios.get('https://jsonplaceholder.typicode.com/photos', {
		const { data } = await axios.get('https://app.ticketmaster.com/discovery/v2/events.json', {
			responseType: 'stream',
			params: {
				...(req.query),
				apikey: process.env.API_KEY,
				size: pageSize,
				...(keyword && { keyword })
			}
		});

		data.pipe(res);
	} catch (err) {
		console.log(err);
		res.status(500).send('Something went wrong');
	}
});

app.get('/events/:id', async (req, res) => {
	try {
		const { data } = await axios.get(`https://app.ticketmaster.com/discovery/v2/events/${req.params.id}`, {
			responseType: 'stream',
			params: {
				apikey: process.env.API_KEY,
			}
		});

		data.pipe(res);
	} catch (err) {
		console.log(err);
		res.status(500).send('Something went wrong');
	}
});

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
