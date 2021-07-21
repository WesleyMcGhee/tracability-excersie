const data = require('./database.json');
const express = require('express');
const path = require('path');
const Rollbar = require('rollbar');
const cors = require('cors');

let id = 4;

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
  rollbar.info('Qoute successfuly generated');
});
app.post('/api/qoutes', (req, res) => {
  let { qoute } = req.body;

  const index = data.findIndex((qouteTitle) => {
    return qouteTitle === qoute;
  })
  if (index === -1 && qoute !== "") {
    data.push(qoute);
    // add rollbar log here
    rollbar.log('Student added succesfully', {author: 'Wesley', type: 'Manual'})
    res.status(200).send(studentList);
  } else if (qoute === "") {
    // add a rollbar error here
    rollbar.error('no name givin');
    res.status(400).send({ error: "no qoute was provided" });
  } else {
    // add a rollbar error here too
    rollbar.error('qoute already exists');
    res.status(400).send({ error: "that qoute already exists" });
  }

})
const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`server is up on ${port}...`));