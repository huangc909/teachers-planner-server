const express = require('express')
const passport = require('passport')

const Category = require('../models/category')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// INDEX
// GET /categories
router.get('/categories', requireToken, (req, res, next) => {
  Category.find({'owner': req.user.id})
    .then(categories => {
      return categories.map(category => category.toObject())
    })
    .then(categories => res.status(200).json({ categories: categories }))
    .catch(next)
})

// SHOW
// GET /categories/5a7db6c74d55bc51bdf39793
router.get('/categories/:id', requireToken, (req, res, next) => {
  Category.findById(req.params.id)
    .then(handle404)
    .then(category => res.status(200).json({ category: category.toObject() }))
    .catch(next)
})

// CREATE
// POST /schoolyears
router.post('/categories', requireToken, (req, res, next) => {
  req.body.category.owner = req.user.id

  Category.create(req.body.category)
    .then(category => {
      res.status(201).json({ category: category.toObject() })
    })
    .catch(next)
})

// UPDATE
// PATCH /categories/5a7db6c74d55bc51bdf39793
router.patch('/categories/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.category.owner

  Category.findById(req.params.id)
    .then(handle404)
    .then(category => {
      requireOwnership(req, category)
      return category.updateOne(req.body.category)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// DESTROY
// DELETE /categories/5a7db6c74d55bc51bdf39793
router.delete('/categories/:id', requireToken, (req, res, next) => {
  Category.findById(req.params.id)
    .then(handle404)
    .then(category => {
      requireOwnership(req, category)
      category.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
