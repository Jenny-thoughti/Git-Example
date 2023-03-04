//  validation
const userDataValidate = (req, res, next) => {
  if (!req.body.first_name && !req.body.last_name && !req.body.email && !req.body.user_name && !req.body.password && !req.body.role && !req.body.status &&!req.body.qualification) {
    return res.status(404).send({'error': 'Fill all Details'});
  }
  if (!req.body.first_name) {
    return res.status(404).send({'error': 'Fill all Details'});
  }
  if (!req.body.last_name) {
    return res.status(404).send({'error': 'Fill all Details'});
  }
  if (!req.body.email) {
    return res.status(404).send({'error': 'Fill all Details'});
  }
  if (!req.body.user_name) {
    return res.status(404).send({'error': 'Fill all Details'});
  }
  if (!req.body.password) {
    return res.status(404).send({'error': 'Fill all Details'});
  }
  if (!req.body.role) {
    return res.status(404).send({'error': 'Fill all Details'});
  }
  if (!req.body.status) {
    return res.status(404).send({'error': 'Fill all Details'});
  }
  if (!req.body.qualification) {
    return res.status(404).send({'error': 'Fill all Details'});
  }

  next();
};

// eslint-disable-next-line require-jsdoc
const accessToken = (req, res, next) => {
  // Auth header value = > send token into header

  const bearerHeader = req.headers['authorization'];
  // check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // split the space at the bearer
    const bearer = bearerHeader.split(' ');
    // Get token from string
    const bearerToken = bearer[1];

    // set the token
    req.token = bearerToken;

    // next middleweare
    next();
  } else {
    // Fobidden
    res.sendStatus(403);
  }
};

module.exports = {
  userDataValidate,
  accessToken,
};
