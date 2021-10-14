const User = require('../models/user');
const jwt = require('jsonwebtoken');
const {SECRET} = require('../config/index');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({where: {email}});
        //validate password
        const passCheck = await bcrypt.compare(password, user.password);
        if(!passCheck) {
            res.status(400).json({ 
                message: "Enter valid email and password", 
                success: false 
            });
        }
        else{
            //create a token and store in cookie
            const token = jwt.sign({
                id: user.id,
            },
            SECRET,
            {
                expiresIn: '8h' 
            });

            res.cookie("token", token);

            const result = {
                id: user.id,
                name: user.name,
                email: user.email,
                token: `Bearer ${token}`,
                expiresIn: "1d",
            }

            res.status(200).json({
                ...result,
                message: "You are now logged in",
                success: true
            });
            
        }
    } catch(err) {
        console.log("Login error: " + err);
        res.status(500).send("Login failed! something went wrong");
    }
}

const logout = (req, res) => {
    res.clearCookie("token");
    res.status(200).send({
        message: "User logged out successfully"
    });
}

module.exports = {login, logout};