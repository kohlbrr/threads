const express = require('express');
const router = new express.Router();
const { User } = require('../../db/models');
module.exports = router;

// Get al users
router.get('/', (req, res, next) => {
  User.findAll()
  .then(users => res.json(users))
  .catch(next);
});

/*
 *  Create a user as if from the 'signup' page
 *  - this should be as frictionless as possible for the
 *    user in question
 *
 */
router.post('/', (req, res, next) => {
  User.findOrCreate({
    where: {
      email: req.body.email
    },
    defaults: {
      name: req.body.name,
      password: req.body.password // Should be salted/hashed by a db hook
    }
  })
  .then((user, wasCreated) => {
    if(!wasCreated) res.status(409).send('!A user already exists with the specified email address');
    res.status(201).send(user); // There is too much information in `user` - truncate later for redux store
  })
  .catch(next);
});

// Update a user as if from an update form
// I fel like there are sec issues here with regards to passwords - Rich
router.put('/:id', (req, res, next) => { // ! this route needs validation
  User.update(
    req.body,
    { where: { id: req.params.id } }
  )
  .then()
  .catch(next);
});

// Return a single user
router.get('/:id', (req, res, next) => {
  User.findById(req.params.id)
  .then(user => {
    res.status(302).send(user); // !Too much info in `user`
  })
  .catch(next);
});

// Delete a user
router.delete('/:id', (req, res, next) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.send();
  })
  .catch(next);
});
