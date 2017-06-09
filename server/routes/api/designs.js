const router = require('express').Router();
const { isLoggedIn, isAdmin } = require('../../middleware');
const { Design, Product, Review } = require('../../db/models');
const HttpError = require('../../http-error');

router.param('id', (req, res, next, id) => {   // dries-up code
  Design.findById(id, {
    include: [{
      model: Product,
    }, {
      model: Review,
    }],
  })
  .then((design) => {
    if (design) {
      req.design = design;
      next();
    } else {
      next(new HttpError(404));
    }
  })
  .catch(() => {
    next(new HttpError(404));
  });
});

router.get('/', (req, res, next) => {         // get all designs
  Design.findAll()
  .then((designs) => {
    res.json(designs);
  })
  .catch(next);
});

router.get('/:id', (req, res) => {      // get one design
  res.send(req.design);
});

// post, put, delete:

router.post('/', isAdmin, (req, res, next) => {
  Design.create(req.body)
  .then((design) => {
    res.status(201).send(design);
  })
  .catch(() => next(new HttpError(400)));
});

router.put('/:id', isAdmin, (req, res, next) => {      // update one design
  req.design
  .update(req.body)
  .then(() => res.status(201).send(req.design))
  .catch(() => next(new HttpError(400)));
});

router.delete('/:id', isAdmin, (req, res, next) => {   // delete one design
  req.design.destroy()
  .then(() => res.status(204).send('deleted successfully'))
  .catch(() => next(new HttpError(400)));
});


router.use('/:id/reviews', require('./reviews'));

module.exports = router;
