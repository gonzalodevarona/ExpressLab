import express from 'express';
import routes from './routes/routes';

const app = express();

app.use(express.json()) //middleware que transforma la req.body a json

const PORT = 3000;

app.get('/ping', (_req, res) => {
    console.log('ping melo')
    console.log('ping')
    res.send('pong')
})

app.use('/api/diaries', routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})