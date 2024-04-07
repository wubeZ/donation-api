import express from 'express'
import os from 'os';
import './common/env.js'
import logger from './common/logger.js';
import controllers from './controllers/controllers.js';
import validateInput from './middlewares/inputValidation.js';
import bodyParser from 'body-parser';

const app = express();

app.use(express.json());

app.post('/create', validateInput, controllers.create);
app.post('/webhook', bodyParser.raw({ type: 'application/json' }), controllers.handle_Webhook)

app.get('/', (req, res) => {
    res.status(200).json({
      'health-check': 'OK: top level api working',
    })
  })

app.use("*",(req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
})

const port = process.env.PORT;

app.listen(port, ()=> {
    logger.info(`Running in developement @ ${os.hostname} at port ${port}`)
});