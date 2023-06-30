import express from 'express'
import os from 'os';
import './common/env.js'
import controllers from './controllers/controllers.js';

const app = express();

app.use(express.json());

app.post('/', controllers.create);


const port = process.env.PORT;

app.listen(port, ()=> {
    console.log(`Running in developement @ ${os.hostname} at port ${port}`)
});