const express = require('express')
const passport = require('passport')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

const SchoolYear = require('../models/schoolYear')

const router = express.Router()

// GET request for one day
router.get('/schoolYears/:schoolYearId/months/:monthId/days/:dayId', requireToken, (req, res, next) => {
  const schoolYearId = req.params.schoolYearId
  const monthId = req.params.monthId
  const dayId = req.params.dayId

  SchoolYear.findById(schoolYearId)
    .then(handle404)
    .then(schoolYear => {
      let day = schoolYear.months.id(monthId).days.id(dayId)
      day = handle404(day)
      res.status(200).json({day: day})
    })
    .catch(next)
})

// POST request for new day
router.post('/schoolYears/:schoolYearId/months/:monthId/days', requireToken, (req, res, next) => {
  req.body.day.owner = req.user.id
  const schoolYearId = req.params.schoolYearId
  const monthId = req.params.monthId
  const dayData = req.body.day

  SchoolYear.findById(schoolYearId)
    .then(handle404)
    .then(schoolYear => {
      schoolYear.months.id(monthId).days.push(dayData)
      return schoolYear.save()
    })
    .then(schoolYear => res.status(201).json({ schoolYear: schoolYear }))
    .catch(next)
})

// PATCH request for one day
router.patch('/schoolYears/:schoolYearId/months/:monthId/days/:dayId', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.day.owner
  const schoolYearId = req.params.schoolYearId
  const monthId = req.params.monthId
  const dayId = req.params.dayId
  const dayData = req.body.day

  SchoolYear.findById(schoolYearId)
    .then(handle404)
    .then(schoolYear => {
      requireOwnership(req, schoolYear)
      schoolYear.months.id(monthId).days.id(dayId).set(dayData)
      return schoolYear.save()
    })
    .then(schoolYear => res.status(200).json({ schoolYear: schoolYear }))
    .catch(next)
})

// DELETE request for one day
router.delete('/schoolYears/:schoolYearId/months/:monthId/days/:dayId', requireToken, (req, res, next) => {
  const schoolYearId = req.params.schoolYearId
  const monthId = req.params.monthId
  const dayId = req.params.dayId

  SchoolYear.findById(schoolYearId)
    .then(handle404)
    .then(schoolYear => {
      requireOwnership(req, schoolYear)
      schoolYear.months.id(monthId).days.id(dayId).remove()
      return schoolYear.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
