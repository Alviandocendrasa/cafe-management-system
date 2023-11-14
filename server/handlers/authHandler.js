const LoginController = require("../controllers/Auth/LoginController");
const UserEntity = require("../entities/userEntity");

exports.login = async function (req, res, next) {
  try {
    const { username, password } = req.body;
    const loginController = new LoginController();
    const doc = await loginController.login(username, password);

    res.cookie('jwt', doc.token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
    });

    res.status(200).json({
      status: 'success',
      message: `Login successfully`,
      data: doc
    });
  }
  catch (error) {
    return next({
      httpCode: 400,
      message: error.message
    })
  }
}

exports.protect = async function (req, res, next) {
  try {
    let token;

    if (!req.headers.authorization) {
      return next({
        httpCode: 401,
        message: 'Please specify bearer auth token with jwt to retrieve data'
      })
    }

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return next({
        httpCode: 401,
        message: 'You are not logged in! Please log in to get access.'
      })
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const userEntity = new UserEntity();
    const currentUser = await userEntity.getUser(decoded.id);
    console.log(decoded);

    if (!currentUser) {
      return next({
        httpCode: 401,
        message: 'The user belonging to this token not longer exist.'
      })
    }

    req.user = currentUser;
    res.locals.user = currentUser;
    next();
  }
  catch (error) {
    return next({
      httpCode: 400,
      message: error.message
    })
  }
}