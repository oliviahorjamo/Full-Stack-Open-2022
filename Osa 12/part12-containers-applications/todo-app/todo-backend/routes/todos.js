const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();

const redis = require('../redis');

const initializeCache = async () => {
  const initialTodos = await Todo.find({})
  const numberOfTodos = initialTodos.length
  console.log('number of initial todos', numberOfTodos)
  await redis.setAsync('numberOfTodos', numberOfTodos)
}

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  // here increment the counter at redis by one
  const numberOfTodos = await redis.getAsync('numberOfTodos')
  await redis.setAsync('numberOfTodos', Number(numberOfTodos) + 1)

  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo);
});

router.get('/statistics', async (_, res) => {
  const numberOfTodos = await redis.getAsync('numberOfTodos')
  res.send({'added_todos': numberOfTodos})
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  const todo = req.todo
  res.send(todo)
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const todoToUpdate = req.body
  const updatedTodo = await Todo.findByIdAndUpdate(req.todo.id, todoToUpdate, { new: true })
  res.send(updatedTodo); // Implement this
});

router.use('/:id', findByIdMiddleware, singleRouter)

initializeCache()

module.exports = router;
