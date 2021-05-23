const express = require('express')
const passport = require('passport')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

const SchoolYear = require('../models/schoolYear')

const router = express.Router()

// GET request for one task
router.get('/schoolYears/:schoolYearId/months/:monthId/days/:dayId/tasks/:taskId', requireToken, (req, res, next) => {
  const schoolYearId = req.params.schoolYearId
  const monthId = req.params.monthId
  const dayId = req.params.dayId
  const taskId = req.params.taskId

  SchoolYear.findById(schoolYearId)
    .then(handle404)
    .then(schoolYear => {
      let task = schoolYear.months.id(monthId).days.id(dayId).tasks.id(taskId)
      task = handle404(task)
      res.status(200).json({task: task})
    })
    .catch(next)
})

// POST request for new task
router.post('/schoolYears/:schoolYearId/months/:monthId/days/:dayId/tasks', requireToken, (req, res, next) => {
  req.body.task.owner = req.user.id
  const schoolYearId = req.params.schoolYearId
  const monthId = req.params.monthId
  const dayId = req.params.dayId
  const taskData = req.body.task

  SchoolYear.findById(schoolYearId)
    .then(handle404)
    .then(schoolYear => {
      schoolYear.months.id(monthId).days.id(dayId).tasks.push(taskData)
      return schoolYear.save()
    })
    .then(schoolYear => {
      let day = schoolYear.months.id(monthId).days.id(dayId)
      day = handle404(day)
      res.status(201).json({ day: day })
    })
    .catch(next)
})

// PATCH request for one task
router.patch('/schoolYears/:schoolYearId/months/:monthId/days/:dayId/tasks/:taskId', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.task.owner
  const schoolYearId = req.params.schoolYearId
  const monthId = req.params.monthId
  const dayId = req.params.dayId
  const taskId = req.params.taskId
  const taskData = req.body.task

  SchoolYear.findById(schoolYearId)
    .then(handle404)
    .then(schoolYear => {
      requireOwnership(req, schoolYear)
      schoolYear.months.id(monthId).days.id(dayId).tasks.id(taskId).set(taskData)
      return schoolYear.save()
    })
    .then(schoolYear => res.status(200).json({ schoolYear: schoolYear }))
    .catch(next)
})

// DELETE request for one task
router.delete('/schoolYears/:schoolYearId/months/:monthId/days/:dayId/tasks/:taskId', requireToken, (req, res, next) => {
  const schoolYearId = req.params.schoolYearId
  const monthId = req.params.monthId
  const dayId = req.params.dayId
  const taskId = req.params.taskId

  SchoolYear.findById(schoolYearId)
    .then(handle404)
    .then(schoolYear => {
      requireOwnership(req, schoolYear)
      schoolYear.months.id(monthId).days.id(dayId).tasks.id(taskId).remove()
      return schoolYear.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// PATCH request for checkmark
router.patch('/schoolYears/:schoolYearId/months/:monthId/days/:dayId/tasks/:taskId/checkmark', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.task.owner
  const schoolYearId = req.params.schoolYearId
  const monthId = req.params.monthId
  const dayId = req.params.dayId
  const taskId = req.params.taskId

  SchoolYear.findById(schoolYearId)
    .then(handle404)
    .then(schoolYear => {
      requireOwnership(req, schoolYear)
      schoolYear.months.id(monthId).days.id(dayId).tasks.id(taskId).set(req.body.task)
      return schoolYear.save()
    })
    .then(schoolYear => res.status(204))
    .catch(next)
})

module.exports = router
