const helpers = require('../helpers/helpers');


//  validation for empty data
const userDataValidate = (req, res, next) => {
  if (!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.user_name || !req.body.password || !req.body.role || !req.body.status || !req.body.qualification) {
    return helpers.generateApiResponse(res, req, 'Fill all details.', 400);
  }
  next();
};


const loginValidation = (req, res, next) => {
  if (!req.body.user_name || !req.body.password) {
    return helpers.generateApiResponse(req, res, 'fill all details', 400);
  }
  next();
};

module.exports = {
  userDataValidate,
  loginValidation,
};
