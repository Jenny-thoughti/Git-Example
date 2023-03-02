//  validation
const postDataValidate = (req, res, next) => {
  if (!req.body.name && !req.body.comment_status && !req.body.user_id) {
    return res.status(404).send('name, comment, user_id is required');
  }
  if (!req.body.name && !req.body.comment_status) {
    return res.status(404).send('name, comment is required');
  }
  if (!req.body.comment_status && !req.body.user_id) {
    return res.status(404).send('comment, user_id is required');
  }
  if (!req.body.name && !req.body.user_id) {
    return res.status(404).send('name, user_id is required');
  }
  if (!req.body.name) {
    return res.status(404).send('name is required');
  }
  if (!req.body.comment_status) {
    return res.status(404).send('comment is required');
  }
  if (!req.body.user_id) {
    return res.status(404).send('user id is required');
  }

  next();
};

module.exports = {
  postDataValidate,
};
