const {Op} = require('sequelize');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const {SECRET} = require('../config/index');

// To check if user has authorization token
const isLoggedIn = (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    
    if(typeof bearerHeader !== undefined) {
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        next();
    } else{
        res.status(401).json({ message: "Unauthorized" });
    }

}

const isVerified = (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    
    
    if(typeof bearerHeader !== undefined) {
        const bearerToken = bearerHeader.split(" ")[1];
        const decoded = jwt.verify(bearerToken, SECRET);
        const id = decoded["id"];
        req.userId = id;
        next();
    }
    else{
        res.status(401).send({ message: "Unauthorized" });
    }
}


const isMyTodo = async (req, res, next) => {
    const {id} = req.params;
    const userId = req.userId; 
    try{
        // check if the todo being accessed belongs to the logged in user or not
        const user = await User.findOne({
            where: {
                todos: {
                    [Op.contains] : [id]
                }
            }
        });

        if(typeof user !== undefined && user.id == userId) {
            next();
        } else{
            res.status(404).send("Todo not found");
        }
        
    } catch(err) {
        console.log(err)
        res.status(500).json({message: "Something went wrong"});
    }
    
}

module.exports = { isLoggedIn, isVerified, isMyTodo };