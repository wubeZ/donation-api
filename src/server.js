import express from 'express'
import os from 'os';
import './common/env.js'
import logger from './common/logger.js';
import controllers from './controllers/controllers.js';
import validateInput from './middlewares/inputValidation.js';

const app = express();

app.use(express.json());

app.post('/create', validateInput, controllers.create);


const port = process.env.PORT;

app.listen(port, ()=> {
    logger.info(`Running in developement @ ${os.hostname} at port ${port}`)
});