require('dotenv').config();

import express from 'express';
import mongoose from 'mongoose';
import routes from './routes/routes';

mongoose.connect(process.env.DATABASE_URL as string)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))


const app = express();

app.use(express.json()) //middleware que transforma la req.body a json

const PORT = 3000;

app.get('/ping', (_req, res) => {
    console.log('ping melo')
    

    res.send('pong')
})

app.use('/api/product', routes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})