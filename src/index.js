import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';
import http  from 'http';
import cors from 'cors';
import {setupWebsocket} from './websocket';

const app = express();
const server = http.Server(app); // a partir daqui tenho o servidor fora do express

setupWebsocket(server);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.use(cors());
app.use(express.json()); 
app.use(routes);

server.listen(process.env.PORT || 3333);