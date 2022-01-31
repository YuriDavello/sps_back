const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); // jpa/hibernate
const cors = require('cors'); // cors

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extend: false}));

mongoose
  .connect('mongodb://db:27017/spsdb', {
    useNewUrlParser: true
  })
  .then(result => {
    console.log('MongoDB Conectado');
  })
  .catch(error => {
    console.log(error);
  });

require('./src/app/controllers/index')(app);

app.listen(9000, () => console.log("server running on 9000"));
