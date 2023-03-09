const helpers = require('../helpers/helpers');

const postDataValidate = (req, res, next) => {
  if (!req.body.postName || !req.body.postComment || !req.body.postId) {
    return helpers.generateApiResponse(res, req, 'Fill all details', 400);
  }

  next();
};

module.exports = {
  postDataValidate,
};
