const express = require('express');
const router = express.Router();
const {getTodos, addTodo, getThatTodo, updateThatTodo, deleteThatTodo} = require('../controllers/todo')
const {isLoggedIn, isVerified, isMyTodo} = require('../middlewares/auth')

router.use(isLoggedIn, isVerified);

router.get('/todos', getTodos);

router.post('/todos', addTodo);

router.get('/todo/:id', isMyTodo, getThatTodo);

router.put('/todo/:id', isMyTodo, updateThatTodo);

router.delete('/todo/:id', isMyTodo, deleteThatTodo);


module.exports = router;