const User = require('../models/user');
const Todo = require('../models/todo');
const sequelize = require('../database/index');

const getTodos = async (req, res) => {
    const id = req.userId;

    try{
        const user = await User.findOne({where:{id}});
    
        const todos = user.todos;
        const result = [];

        for(let i = 0; i < todos.length; ++i) {
            const todo = await Todo.findOne({where: {id: todos[i]}});

            let todoElement = {
                id: todo.id,
                label: todo.label,
                description: todo.description
            }
            result.push(todoElement);
        }
        
        res.status(200).json({
            message: 'success',
            todos: result
        });
        
    } catch(err) {
        console.log("Error while getting Todos: " + err);
        res.status(500).send("Can't get todos! something went wrong");
    }
}

const addTodo = async (req, res) => {
    const id = req.userId;
    const {label, description} = req.body;
    try{
        const user = await User.findOne({where: {id}});

        const newTodo = new Todo({
            label: label,
            description: (typeof description===undefined?"":description)
        });
        const savedTodo = await newTodo.save();

        User.update(
            {'todos': sequelize.fn('array_append', sequelize.col('todos'), savedTodo.id)}, {
                where: {
                    id
                }
            }
        )

        res.status(200).json({
            message: 'success',
            savedTodo
        });
        
        
    } catch(err) {
        console.log("Error while adding Todo: " + err);
        res.status(500).send("Can't add todo! something went wrong");
    }
}

const getThatTodo = async (req, res) => {
    const {id} = req.params;
    
    try{
        const todo = await Todo.findOne({where:{id}});

        if(todo===undefined) {
            res.status(404).json({
                message: "Todo doesn't exist"
            })
        } else{
            res.status(200).json(todo);
        }
        
        
    } catch(err) {
        console.log("Error while getting todo: " + err);
        res.status(500).send("Can't get the todo! something went wrong")
    }
}

const updateThatTodo = async (req, res) => {

    const {label, description} = req.body;
    const {id} = req.params;
    try {

        const todo = await Todo.findOne({where: {id}});

        if(!todo) {
            res.status(404).json({
                message: "Todo doesn't exist"
            })
        } else{
            await todo.update({
                label: (typeof label===undefined?todo.label:label),
                description: (typeof description===undefined?todo.description:description)
            });

            res.status(200).send({
                message: 'success',
                todo
            })
        }
        
        
    } catch(err) {
        console.log("Error while updating todo: " + err);
        res.status(500).send("Can't update the todo! something went wrong")
    }

    
}

const deleteThatTodo = async (req, res) => {
    const {id} = req.params;
    const userId = req.userId;
    try {

        const todo = await Todo.findOne({where:{id}});

        if(!todo) {
            res.status(404).send("Todo not found");
        } else{
            // delete from todo table
            await todo.destroy({
                where:{
                    id
                }
            })

            // delete from users todos array
            const user = await User.findOne({where: {id: userId}});
            
            User.update(
                {'todos': sequelize.fn('array_remove', sequelize.col('todos'), id)}, {
                    where: {
                        id: userId
                    }
                }
            )
            
            res.status(200).send("Todo deleted successfully")
        }
        
    } catch(err) {
        console.log("Error while deleting Todo: " + err);
        res.status(500).send("Can't delete todo! something went wrong");
    }
}

module.exports = {getTodos, getThatTodo, addTodo, deleteThatTodo, updateThatTodo}