const express = require('express')
const passport = require('passport')

const SchoolYear = require('../models/schoolYear')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// INDEX
// GET /schoolYears
router.get('/schoolYears', requireToken, (req, res, next) => {
  SchoolYear.find()
    .then(schoolYears => {
      return schoolYears.map(schoolYear => schoolYear.toObject())
    })
    .then(schoolYears => res.status(200).json({ schoolYears: schoolYears }))
    .catch(next)
})

// SHOW
// GET /schoolYears/5a7db6c74d55bc51bdf39793
router.get('/schoolYears/:id', requireToken, (req, res, next) => {
  SchoolYear.findById(req.params.id)
    .then(handle404)
    .then(schoolYear => res.status(200).json({ schoolYear: schoolYear.toObject() }))
    .catch(next)
})

// CREATE
// POST /schoolyears
router.post('/schoolYears', requireToken, (req, res, next) => {
  req.body.schoolYear.owner = req.user.id

  SchoolYear.create(req.body.schoolYear)
    .then(schoolYear => {
      res.status(201).json({ schoolYear: schoolYear.toObject() })
    })
    .catch(next)
})

// UPDATE
// PATCH /schoolYears/5a7db6c74d55bc51bdf39793
router.patch('/schoolYears/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.schoolYear.owner

  SchoolYear.findById(req.params.id)
    .then(handle404)
    .then(schoolYear => {
      requireOwnership(req, schoolYear)
      return schoolYear.updateOne(req.body.schoolYear)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// DESTROY
// DELETE /schoolYears/5a7db6c74d55bc51bdf39793
router.delete('/schoolYears/:id', requireToken, (req, res, next) => {
  SchoolYear.findById(req.params.id)
    .then(handle404)
    .then(schoolYear => {
      requireOwnership(req, schoolYear)
      schoolYear.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
