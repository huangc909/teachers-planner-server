const express = require('express')
const passport = require('passport')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

const SchoolYear = require('../models/schoolYear')

const router = express.Router()

// GET request for one month
router.get('/schoolYears/:schoolYearId/months/:monthId', requireToken, (req, res, next) => {
  const schoolYearId = req.params.schoolYearId
  const monthId = req.params.monthId

  SchoolYear.findById(schoolYearId)
    .then(handle404)
    .then(schoolYear => {
      let month = schoolYear.months.id(monthId)
      month = handle404(month)
      res.status(200).json({month: month})
    })
    .catch(next)
})

// POST request for new month
router.post('/schoolYears/:schoolYearId/months', requireToken, (req, res, next) => {
  req.body.month.owner = req.user.id
  const schoolYearId = req.params.schoolYearId
  const monthData = req.body.month

  SchoolYear.findById(schoolYearId)
    .then(handle404)
    .then(schoolYear => {
      schoolYear.months.push(monthData)
      return schoolYear.save()
    })
    .then(schoolYear => res.status(201).json({ schoolYear: schoolYear }))
    .catch(next)
})

// PATCH request for one month
router.patch('/schoolYears/:schoolYearId/months/:monthId', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.month.owner
  const schoolYearId = req.params.schoolYearId
  const monthId = req.params.monthId
  const monthData = req.body.month

  SchoolYear.findById(schoolYearId)
    .then(handle404)
    .then(month => {
      requireOwnership(req, month)
      month.months.id(monthId).set(monthData)
      return month.save()
    })
    .then(month => res.status(200).json({ month: month }))
    .catch(next)
})

// DELETE request for one month
router.delete('/schoolYears/:schoolYearId/months/:monthId', requireToken, (req, res, next) => {
  const schoolYearId = req.params.schoolYearId
  const monthId = req.params.monthId

  SchoolYear.findById(schoolYearId)
    .then(handle404)
    .then(schoolYear => {
      requireOwnership(req, schoolYear)
      schoolYear.months.id(monthId).remove()
      return schoolYear.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
