const express = require('express')
const passport = require('passport')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

const SchoolYear = require('../models/schoolYear')

const router = express.Router()

// GET request for one dayOfYear
router.get('/schoolYears/:schoolYearId/daysOfYear/:dayOfYearId', requireToken, (req, res, next) => {
  const schoolYearId = req.params.schoolYearId
  const dayOfYearId = req.params.dayOfYearId

  SchoolYear.findById(schoolYearId)
    .then(handle404)
    .then(schoolYear => {
      let dayOfYear = schoolYear.daysOfYear.id(dayOfYearId)
      dayOfYear = handle404(dayOfYear)
      res.status(200).json({dayOfYear: dayOfYear})
    })
    .catch(next)
})

// POST request for new dayOfYear
router.post('/schoolYears/:schoolYearId/daysOfYear', requireToken, (req, res, next) => {
  req.body.dayOfYear.owner = req.user.id
  const schoolYearId = req.params.schoolYearId
  const dayOfYearData = req.body.dayOfYear

  SchoolYear.findById(schoolYearId)
    .then(handle404)
    .then(schoolYear => {
      schoolYear.daysOfYear.push(dayOfYearData)
      return schoolYear.save()
    })
    .then(schoolYear => res.status(201).json({ schoolYear: schoolYear }))
    .catch(next)
})

// PATCH request for one dayOfYear
router.patch('/schoolYears/:schoolYearId/daysOfYear/:dayOfYearId', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.dayOfYear.owner
  const schoolYearId = req.params.schoolYearId
  const dayOfYearId = req.params.dayOfYearId
  const dayOfYearData = req.body.dayOfYear

  SchoolYear.findById(schoolYearId)
    .then(handle404)
    .then(dayOfYear => {
      requireOwnership(req, dayOfYear)
      dayOfYear.daysOfYear.id(dayOfYearId).set(dayOfYearData)
      return dayOfYear.save()
    })
    .then(dayOfYear => res.status(200).json({ dayOfYear: dayOfYear }))
    .catch(next)
})

// DELETE request for one dayOfYear
router.delete('/schoolYears/:schoolYearId/daysOfYear/:dayOfYearId', requireToken, (req, res, next) => {
  const schoolYearId = req.params.schoolYearId
  const dayOfYearId = req.params.dayOfYearId

  SchoolYear.findById(schoolYearId)
    .then(handle404)
    .then(schoolYear => {
      requireOwnership(req, schoolYear)
      schoolYear.daysOfYear.id(dayOfYearId).remove()
      return schoolYear.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
