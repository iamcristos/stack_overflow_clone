import query from '../util/query';
import jwt from '../util/jwt';

class UserMiddleware {
  static async checkIfUserExists(req, res) {
    try {
      const { email, username } = req.body;
      const user = await query().user.findUserByEmailUsername(email, username);
      if (user) {
        req.user = user;
        return true;
      }
      return false;
    } catch (error) {
      return res.status(500).send('network error');
    }
  }

  static async validateUserSignUp(req, res, next) {
    if (await UserMiddleware.checkIfUserExists(req, res)) {
      return res.status(404).send('user already exist');
    }
    return next();
  }

  static async validateUserLogin(req, res, next) {
    try {
      const { email, password } = req.body;
      const userDoc = await query().user.getOne({ email }).exec();
      if (userDoc && await userDoc.comparePassword(password)) {
        req.user = userDoc;
        return next();
      }
      return res.status(401).send('invalid operation');
    } catch (error) {
      return res.status(500).send('network error');
    }
  }

  static async protectedRoute(req, res, next) {
    try {
      const userId = await jwt.validateToken(req.headers.authorization, res);
      const user = await query().user.getById(userId);
      if (!user) return res.status(401).send('invalid token');
      req.authorizeUser = user;
      return next();
    } catch (error) {
      return res.status.send('error');
    }
  }
}

export default UserMiddleware;
