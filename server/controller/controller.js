const data = require('../database.json');

module.exports = {
    getQoute: (req, res) => {
        res.status(200).send(data);
    }
}