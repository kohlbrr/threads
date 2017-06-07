const router = require('express').Router();

const { Clothing, Category } = require('../../db/models');

router.param('id', (req, res, next, id) => {   // dries-up code
  Clothing.findOne({
    where: { id: id },
    include: [{
      model: Category,
      where: { clothingId: id },
    }],
  })
  .then((clothing) => {
    if (clothing) {
      req.clothing = clothing;
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

router.get('/', (req, res, next) => {         // get all clothings
  Clothing.findAll()
  .then((clothings) => {
    console.log('this is running');
    res.json(clothings);
  })
  .catch(next);
});

router.get('/:id', (req, res, next) => {      // get one clothing
  res.send(req.clothing);
  next();
});

// post, put, delete:

router.post('/', (req, res, next) => {        // post one clothing
  Clothing.create(req.body)
  .then((clothing) => {
    console.log('created successfully');
    res.status(201).send(clothing);
  })
  .catch(next);
});

router.put('/:id', (req, res, next) => {      // update one clothing
  Clothing.update(req.clothing)
  .then(() => res.send(req.clothing))
  .catch(next);
});

router.delete('/:id', (req, res, next) => {   // delete one clothing
  req.clothing.destroy()
  .then(() => res.send('deleted successfully'))
  .catch(next);
});


module.exports = router;
