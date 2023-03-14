const express = require('express');
const {animals} = require('./data/animals')
const PORT = process.env.PORT || 3001;
const app = express();
const fs = require('fs');
const path = require('path');

//after moding code for app request
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

//add middleware:
//parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
//parse incoming json data
app.use(express.json());
//add middleware to load css and js files with html
app.use(express.static('public'));

//after moding the code
//http://localhost:3001/api/animals
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});

