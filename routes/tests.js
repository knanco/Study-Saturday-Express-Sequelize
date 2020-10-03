const router = require('express').Router()
const Test = require('../db/models/test')

// GET /tests
router.get('/', async (req, res, next) => {
  try {
    const tests = await Test.findAll()
    res.send(tests)
  } catch (error) {
    next(error)
  }
})

// GET /tests/:id
router.get('/:id', async (req, res, next) => {
  try {
    // req.params URL
    console.log('req params', req.params)
    // req.body NON URL Info
    const test = await Test.findById(req.params.id)
    res.send(test)
  } catch (error) {
    next(error)
  }
})

// POST /tests/student/:studentId
router.post('/student/:studentId', async (req, res, next) => {
  try {
    req.body.studentId = req.params.studentId

    const createdTest = await Test.create(req.body)
    res.status(201).send(createdTest)
  } catch (error) {
    next(error)
  }
})

// DELETE /tests/:id
router.delete('/:id', async (req, res, next) => {
  try {
    await Test.destroy({
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
