const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');                                                                                                                                      

const petsRouter = require('./routes/pets.routes');

const app = express();
app.use(express.json());
app.use(cors());

const url = "mongodb+srv://YuliaKitan:tnv333@petadoption.lszzt.mongodb.net/main?retryWrites=true&w=majority";

mongoose
  .connect(url, { useNewUrlParser: true,  useUnifiedTopology: true })
  .then(() => {
    console.log('connected to DB...');

    app.use('/api/pets', petsRouter);
    // app.use('/api/orders', ordersRouter);

    app.listen('5050', () => {
      console.log('The server is listening on http://localhost:5050');
    });
  })
  .catch(() => {
    console.log('Fail to connect to DB!!!!');
  })

