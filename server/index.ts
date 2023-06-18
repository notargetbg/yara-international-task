import express, { Express, Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
	res.send('Express + TypeScript Server');
});



app.get('/test', async (req, res) => {
	try {
		const { data } = await axios.get('https://app.ticketmaster.com/discovery/v2/events.json?apikey=lUTNdbyC7jORpAWwT1wxSMeBEXm4fVms', {
			responseType: 'stream'
		});

		data.pipe(res);

		// res.send(`Running 🏃 ${apiResponseData}`);
	} catch (err) {
		console.log(err);
		res.status(500).send('Something went wrong');
	}
});

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});