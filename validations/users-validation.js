const helpers = require('../helpers/helpers');


//  validation for empty data
const userDataValidate = (req, res, next) => {
  if (!req.body.user_first_name || !req.body.user_last_name || !req.body.user_email || !req.body.userName ||
   !req.body.user_password || !req.body.user_role || !req.body.user_status || !req.body.user_qualification) {
    return helpers.generateApiResponse(res, req, 'Fill all details.', 400);
  }
  next();
};


const loginValidate = (req, res, next) => {
  if (!req.body.user_name || !req.body.password) {
    return helpers.generateApiResponse(req, res, 'fill all details', 400);
  }
  next();
};

module.exports = {
  userDataValidate,
  loginValidate,
};
