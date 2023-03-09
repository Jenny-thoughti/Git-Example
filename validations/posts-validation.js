const helpers = require('../helpers/helpers');

const postDataValidate = (req, res, next) => {
  if (!req.body.post_name || !req.body.post_comment || !req.body.post_user_id) {
    return helpers.generateApiResponse(res, req, 'Fill all details', 400);
  }

  next();
};

module.exports = {
  postDataValidate,
};
