const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.findOne({where: { email }});
        if(user){
            res.status(401).send("User already exist");
        }
        else{

            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(password, salt);

            const newUser = new User({
                name: name,
                email: email,
                password: hash
            });
            const savedUser = await newUser.save();

            res.status(201).send(savedUser);
        }
        
    } catch(err) {
        console.log("Signup Error: " + err);
        res.status(501).send("Signup Failed! something went wrong");
    }
}

module.exports = signup;