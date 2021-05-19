const express = require('express')
const passport = require('passport')

const Schoolyear = require('../models/schoolyear')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// INDEX
// GET /schoolyears
router.get('/schoolyears', requireToken, (req, res, next) => {
  Schoolyear.find()
    .then(schoolyears => {
      return schoolyears.map(schoolyear => schoolyear.toObject())
    })
    .then(schoolyears => res.status(200).json({ schoolyears: schoolyears }))
    .catch(next)
})

// SHOW
// GET /schoolyears/5a7db6c74d55bc51bdf39793
router.get('/schoolyears/:id', requireToken, (req, res, next) => {
  Schoolyear.findById(req.params.id)
    .then(handle404)
    .then(schoolyear => res.status(200).json({ schoolyear: schoolyear.toObject() }))
    .catch(next)
})

// CREATE
// POST /schoolyears
router.post('/schoolyears', requireToken, (req, res, next) => {
  req.body.schoolyear.owner = req.user.id

  Schoolyear.create(req.body.schoolyear)
    .then(schoolyear => {
      res.status(201).json({ schoolyear: schoolyear.toObject() })
    })
    .catch(next)
})

// UPDATE
// PATCH /schoolyears/5a7db6c74d55bc51bdf39793
router.patch('/schoolyears/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.schoolyear.owner

  Schoolyear.findById(req.params.id)
    .then(handle404)
    .then(schoolyear => {
      requireOwnership(req, schoolyear)
      return schoolyear.updateOne(req.body.schoolyear)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// DESTROY
// DELETE /schoolyears/5a7db6c74d55bc51bdf39793
router.delete('/schoolyears/:id', requireToken, (req, res, next) => {
  Schoolyear.findById(req.params.id)
    .then(handle404)
    .then(schoolyear => {
      requireOwnership(req, schoolyear)
      schoolyear.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
