const router = require('express').Router();

const { Design, Product } = require('../../db/models');

router.param('id', (req, res, next, id) => {   // dries-up code
  Design.findOne({
    where: { id: id },
    include: [{
      model: Product,
      where: { id: id },
    }],
  })
  .then((design) => {
    if (design) {
      req.design = design;
      next();
    } else {
      res.sendStatus(404);
    }
  })
  .catch(() => {
    const error = new Error();
    error.status = 404;
    next(error);
  });
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

// post, put, delete:

router.post('/', (req, res, next) => {        // post one design
  Design.create(req.body)
  .then((design) => {
    console.log('created successfully');
    res.status(201).send(design);
  })
  .catch(next);
});

router.put('/:id', (req, res, next) => {      // update one design
  Design.update(req.design)
  .then(() => res.send(req.design))
  .catch(next);
});

router.delete('/:id', (req, res, next) => {   // delete one design
  req.design.destroy()
  .then(() => res.send('deleted successfully'))
  .catch(next);
});


module.exports = router;
