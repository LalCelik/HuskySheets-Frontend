const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());



var config = require('./practice-sheet.json');

var newConfig = {}


app.get('/api/v1/getSheet', (req, res) => {
  console.log(newConfig)
  res.json(config);
});

app.listen(8080, () => {
    console.log(`Server is running on port 8080.`);
  });


app.post('/api/v1/updateSheet', (req, res) => {
    //console.log(req.body.sheets[0].updates)
    newConfig = req.body
    res.json(newConfig);
});