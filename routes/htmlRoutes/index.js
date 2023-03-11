const path = require('path');
const router = require('express').Router();

//create homepage
router.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

router.get('/animals', (req,res) => {
    let results = animals;
    if(req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

// http://localhost:3001/zookeepers
router.get('/zookeepers', (req, res) => {
    res.sendFile(path.join(__dirname, './public/zookeepers.html'));
});

//default unspecified route
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

module.exports = router;