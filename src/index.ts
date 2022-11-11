require('dotenv').config();

import express from 'express';
import mongoose from 'mongoose';
import productRoutes from './routes/product';
import loginRoutes from './routes/login';

mongoose.connect(process.env.DATABASE_URL as string)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database. Listening...'))


const app = express();

app.use(express.json()) //middleware que transforma la req.body a json

const PORT = 3000;

app.use('/api/product', productRoutes)
app.use('/api/auth', loginRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})