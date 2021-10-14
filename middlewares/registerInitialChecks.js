const {isValidEmail, isValidPassword} = require('../utils/validate');

const registerInitialCheck = (req, res, next) => {
    const {email, password, confirmPassword} = req.body;
    if(
        typeof email === 'string' && 
        typeof password === 'string' &&
        typeof confirmPassword === 'string' && 
        email.length > 0 && 
        password.length > 0 &&
        confirmPassword === password &&
        isValidEmail(email) && 
        isValidPassword(password)
    ) {
        next();
    } else{
        res.status(401).send("Initial check fail");
    }
    
}

module.exports = {registerInitialCheck};