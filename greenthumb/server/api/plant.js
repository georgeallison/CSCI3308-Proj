//file with our user routes
const express = require('express');
const router = express.Router();
const queries = require('../db/queries');

function getPlantFromBody(body) {
  const { name, description, image } = body;
  const plant = {
    name,
    description,
    image
  };
  return plant;
}

// using /api/plant
router.get('/', (req, res) => {
  queries
    .getAll()
    .then(plants => {
      res.json(plants);
    });
});

router.get('/:id', validId, (req, res, next) => {
  queries
    .getOne(req.params.id)
    .then(user => {
      if(user) {
        res.json(user);
      } else {
        next();
      }
    });
});

// adding new plant to db
router.post('/', (req, res) => {
  const plant = getPlantFromBody(req.body);
  queries
    .create(plant)
    .then(id => {
      res.json({
        id
      });
    });
});

router.put('/:id', (req, res) => {
  const plant = getPlantFromBody(req.body);
  queries
    .update(req.params.id, plant)
    .then(() =>{
      res.json({
        message: 'Added plant to database'
      });
    });
});

router.delete('/:id', (req, res) => {
  queries
    .delete(req.params.id)
    .then(() => {
      res.json({
        message: 'Deleted plant from database'
      });
    });
});

module.exports = router;
