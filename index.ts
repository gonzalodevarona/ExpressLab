import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import debug from 'debug';
import routes from './routes';
import connect from  './utils/connect'

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const debugLog: debug.IDebugger = debug('app')

app.use(express.json())
app.use(cors())

app.get('/', (req : Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

routes(app);
connect();

app.listen(port, () => {
  debugLog("Application running");
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
