const registrationScheme = require('../../schemas/registrationValidationScheme');
const loginScheme = require('../../schemas/loginValidationScheme');

module.exports.registerValidator = async(req, res, next) => {
    try {
        await registrationScheme.validate(req.body);
        next();
    } catch (err) {
        next(err);
    }
};

module.exports.loginValidator = async(req, res, next) => {
    try {
        await loginScheme.validate(req.body);
        next();
    }
    catch (err) {
        next(err);
    }
};