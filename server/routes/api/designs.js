const router = require('express').Router();

const { Design } = require('../../db/models');

router.param('id', (req, res, next, id) => {   // dries-up code
  Design.findById(id)
  .then((design) => {
    if (design) {
      console.log(design.name);
      req.design = design;
      next();
    } else {
      next(new Error('failed to load design'));
    }
  })
  .catch(next);
});

router.get('/', (req, res, next) => {         // get all designs
  Design.findAll()
  .then((designs) => {
    console.log('this is running');
    res.json(designs);
  })
  .catch(next);
});

router.get('/:id', (req, res, next) => {      // get one design
  res.send(req.design);
  next();
});


module.exports = router;
