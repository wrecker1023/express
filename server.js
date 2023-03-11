const express = require('express');
const {animals} = require('./data/animals')
const PORT = process.env.PORT || 3001;
const app = express();
const fs = require('fs');
const path = require('path');

//add middleware:
//parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
//parse incoming json data
app.use(express.json());
//add middleware to load css and js files with html
app.use(express.static('public'));


app.get('/api/animals', (req,res) => {
    let results = animals;
    if(req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

app.get('/api/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if(result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

//create homepage
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// http://localhost:3001/animals
app.get('/animals', (req,res) => {
    res.sendFile(path.join(__dirname, './public/animals.html'));
});

// http://localhost:3001/zookeepers
app.get('/zookeepers', (req, res) => {
    res.sendFile(path.join(__dirname, './public/zookeepers.html'));
});

//default unspecified route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// set up a route on our server that
// accepts data to be used or stored server-side
app.post('/api/animals', (req, res) => {
    //set id based on what the next index of the array will be
    req.body.id = animals.length.toString();

    if(!validateAnimal(req.body)) {
        res.status(400).send('The animal is not formatted properly');
    } else {
        //add animal to json file and animals arr in this function
        const animal = createNewAnimal(req.body, animals);

        res.json(animal);
    }
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});

