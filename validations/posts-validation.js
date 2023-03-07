const postDataValidate = (req, res, next) => {
  if (!req.body.name || !req.body.comment_status || !req.body.user_id) {
    return res.status(400).send('Fill all details');
  }

  next();
};

module.exports = {
  postDataValidate,
};
