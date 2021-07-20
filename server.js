const data = require('./database.json');
const express = require('express');
const path = require('path');
const Rollbar = require('rollbar');
const cors = require('cors');


const rollbar = new Rollbar({
  accessToken: '9a5d89f3bd1043fe86f69b43b4427738',
  captureUncaught: true,
  captureUnhandledRejections: true
})

const app = express();
app.use(express.json());
app.use(rollbar.errorHandler());
app.use(cors())
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
    rollbar.info("html file served successfully");
})
app.get('/api/qoutes', (req, res) => {
  res.status(200).send(data);
  rollbar.log('Qoute successfuly generated');
});

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`server is up on ${port}...`));