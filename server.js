const ctrl = require('./controller/controller');
const express = require('express');
const path = require('path');
const Rollbar = require('rollbar');
const cors = require('cors');

const rollbar = new Rollbar({
  accessToken: '87a929166e804d129b678da43b23cb65',
  captureUncaught: true,
  captureUnhandledRejections: true
})

const app = express();
app.use(express.json());
app.use(rollbar.errorHandler());
app.use(cors())
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
    rollbar.info("html file served successfully");
})
app.get('/api/qoutes', ctrl.getQoute);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`server is up on ${port}...`));