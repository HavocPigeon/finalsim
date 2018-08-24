const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
require('dotenv').config();
const app = express();

app.use(bodyParser.json());

massive(process.env.CONNECTION_STRING).then(db => {
    app.set('db', db);
}).catch(err => {
    console.log('-------massive', err)
})

app.get('/api/colors', (req, res) => {
    req.app.get('db').get_colors()
    .then(colors => {
        res.json(colors[0].name)
    })
    .catch(err => {
        console.log(err);
        res.json({
            message: 'there is an error'
        })
    })
})
app.put('/api/change', (req, res) => {
    const { newColor } = req.body;
    req.app.get('db').change_color(
     [newColor]
    ).then(color => {
        res.json(color)
    }).catch(err => {
        console.log(err)
        res.json({message: 'error'})
    })
})

const PORT = 4000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`))