const express = require('express')
const passport = require('passport')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

const SchoolYear = require('../models/schoolYear')

const router = express.Router()

// GET request for one monthOfYear
router.get('/schoolYears/:schoolYearId/monthsOfYear/:monthOfYearId', requireToken, (req, res, next) => {
  const schoolYearId = req.params.schoolYearId
  const monthOfYearId = req.params.monthOfYearId

  SchoolYear.findById(schoolYearId)
    .then(handle404)
    .then(schoolYear => {
      let monthOfYear = schoolYear.monthsOfYear.id(monthOfYearId)
      monthOfYear = handle404(monthOfYear)
      res.status(200).json({monthOfYear: monthOfYear})
    })
    .catch(next)
})

// POST request for new monthOfYear
router.post('/schoolYears/:schoolYearId/monthsOfYear', requireToken, (req, res, next) => {
  req.body.monthOfYear.owner = req.user.id
  const schoolYearId = req.params.schoolYearId
  const monthOfYearData = req.body.monthOfYear

  SchoolYear.findById(schoolYearId)
    .then(handle404)
    .then(schoolYear => {
      schoolYear.monthsOfYear.push(monthOfYearData)
      return schoolYear.save()
    })
    .then(schoolYear => res.status(201).json({ schoolYear: schoolYear }))
    .catch(next)
})

// PATCH request for one monthOfYear
router.patch('/schoolYears/:schoolYearId/monthsOfYear/:monthOfYearId', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.monthOfYear.owner
  const schoolYearId = req.params.schoolYearId
  const monthOfYearId = req.params.monthOfYearId
  const monthOfYearData = req.body.monthOfYear

  SchoolYear.findById(schoolYearId)
    .then(handle404)
    .then(monthOfYear => {
      requireOwnership(req, monthOfYear)
      monthOfYear.monthsOfYear.id(monthOfYearId).set(monthOfYearData)
      return monthOfYear.save()
    })
    .then(monthOfYear => res.status(200).json({ monthOfYear: monthOfYear }))
    .catch(next)
})

// DELETE request for one monthOfYear
router.delete('/schoolYears/:schoolYearId/monthsOfYear/:monthOfYearId', requireToken, (req, res, next) => {
  const schoolYearId = req.params.schoolYearId
  const monthOfYearId = req.params.monthOfYearId

  SchoolYear.findById(schoolYearId)
    .then(handle404)
    .then(schoolYear => {
      requireOwnership(req, schoolYear)
      schoolYear.monthsOfYear.id(monthOfYearId).remove()
      return schoolYear.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
