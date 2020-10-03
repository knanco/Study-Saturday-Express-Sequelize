const router = require('express').Router()
const Student = require('../db/models/student')

// GET /students
router.get('/', async (req, res, next) => {
  try {
    const students = await Student.findAll()
    res.send(students)
  } catch (error) {
    next(error)
  }
})

// GET /students/:id
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const student = await Student.findById(id)
    if (!student) {
      res.status(404).end()
    } else {
      res.send(student)
    }
  } catch (error) {
    next(error)
  }
})

// POST /students
router.post('/', async (req, res, next) => {
  try {
    const student = await Student.create(req.body)
    res.status(201).send(student)
  } catch (error) {
    next(error)
  }
})

// PUT /students/:id
router.put('/:id', async (req, res, next) => {
  try {
    const [numberOfAffectedRows, updatedStudent] = await Student.update(req.body, {
      where: {
        id: req.params.id
      },
      returning: true
    })
    res.send(updatedStudent[0])
  } catch (error) {
    next(error)
  }
})

// DELETE /students/:id
router.delete('/:id', async (req, res, next) => {
  try {
    await Student.destroy({
      where: {
        id: req.params.id
      }
    })

    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = router
