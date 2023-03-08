const helpers = require('../helpers/helpers');

//  validation for empty data
const userDataValidate = (req, res, next) => {
  if (!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.user_name || !req.body.password || !req.body.role || !req.body.status || !req.body.qualification) {
    return helpers.generateApiResponse(res, req, 'Fill all details.', 400);
  }
  next();
};


const accessToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  // err
  if (typeof bearerHeader !== 'undefined') {
    // split the space at the bearer
    const bearer = bearerHeader.split(' ');
    // Get token from string
    const bearerToken = bearer[1];

    // set the token
    req.token = bearerToken;

    // next middleweare
    next();
  }
  res.sendStatus(403);
};

module.exports = {
  userDataValidate,
  accessToken,
};
