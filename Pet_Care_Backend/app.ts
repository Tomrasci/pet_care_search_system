import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import apiErrorHandler from './error/apiErrorHandler';
import caretakerAdvertisements from './src/routes/caretakerAdvert.routes';
import petTypes from './src/routes/petType.routes';
import serviceTypes from './src/routes/serviceType.routes';
import languages from './src/routes/language.routes';
import reservations from './src/routes/reservation.routes';
import ownerAdvertisements from './src/routes/ownerAdvert.routes';
import path from 'path';

require('dotenv').config();

const app = express();
const port = 3002;
const corsOptions = {
  origin: 'http://localhost:3000'
};
const router = require('./src/routes/auth.routes');

app.use(cors(corsOptions));
app.use('/uploads', express.static(path.resolve(__dirname, './uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(caretakerAdvertisements);
app.use(petTypes);
app.use(serviceTypes);
app.use(languages);
app.use(reservations);
app.use(ownerAdvertisements);
app.use(apiErrorHandler);

app.get('/', (req: Request, res: Response) => {
  res.send('Main page');
});

app.set('port', process.env.PORT || port);
app.listen(app.get('port'), () => {
  console.log(`Apllication started, listening on port ${app.get('port')}`);
});
