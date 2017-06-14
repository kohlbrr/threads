const router = require('express').Router();
const { isAdmin } = require('../../middleware');
const { Clothing, Category } = require('../../db/models');
const HttpError = require('../../http-error');

router.param('id', (req, res, next, id) => {   // dries-up code
  Clothing.findById(id, {
    include: [{
      model: Category,
    }],
  })
  .then((clothing) => {
    if (clothing) {
      req.clothing = clothing;
      return next();
    }
    return next(new HttpError(404));
  })
  .catch(() => next(new HttpError(404)));
});

router.get('/', (req, res, next) => {         // get all clothings
  Clothing.findAll()
  .then((clothings) => {
    res.json(clothings);
  })
  .catch(next);
});

router.get('/:id', (req, res, next) => {      // get one clothing
  res.send(req.clothing);
  next();
});

router.post('/', isAdmin, (req, res, next) => {        // post one clothing
  Clothing.create(req.body)
  .then((clothing) => {
    res.status(201).send(clothing);
  })
  .catch(() => next(new HttpError(400)));
});

router.put('/:id', isAdmin, (req, res, next) => {      // update one clothing
  req.clothing.update(req.body)
  .then(() => res.status(201).send(req.clothing))
  .catch(next);
});

router.delete('/:id', isAdmin, (req, res, next) => {   // delete one clothing
  req.clothing.destroy()
  .then(() => res.status(204).send('deleted successfully'))
  .catch(next);
});


module.exports = router;
