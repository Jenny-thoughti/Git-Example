//  validation for empty data
const userDataValidate = (req, res, next) => {
  if (!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.user_name || !req.body.password || !req.body.role || !req.body.status || !req.body.qualification) {
    return res.status(404).send({'error': 'Fill all Details'});
  }

  next();
};


const accessToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
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
