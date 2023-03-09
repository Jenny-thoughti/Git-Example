const helpers = require('../helpers/helpers');

const postDataValidate = (req, res, next) => {
  if (!req.body.name || !req.body.comment_status || !req.body.user_id) {
    return helpers.generateApiResponse(res, req, 'Fill all details', 400);
  }

  next();
};

module.exports = {
  postDataValidate,
};
