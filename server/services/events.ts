import express from 'express';
import axios from 'axios';

const router = express.Router();
const pageSize = 30;

router.get('/', async (req, res) => {
    try {
        const { keyword } = req.query;
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

router.get('/:id', async (req, res) => {
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

export default router;