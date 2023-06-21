import express, { Express } from 'express';

import dotenv from 'dotenv';
import cors from 'cors';
import events from './services/events';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use('/events', events);

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
