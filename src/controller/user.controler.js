/* eslint-disable no-underscore-dangle */
import Query from '../util/query';
import jwt from '../util/jwt';

class UserControler {
  constructor(query) {
    this.query = query;
    this.jwt = jwt;
    this.createUser = this.createUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.getAllUser = this.getAllUser.bind(this);
  }

  async createUser(req, res) {
    const { body } = req;
    try {
      const user = await this.query.createUser(body);
      return res.status(201).send(user);
    } catch (error) {
      return res.status(500).send('network error');
    }
  }

  async loginUser(req, res) {
    const { user } = req;
    const token = this.jwt.generateToken(user);
    return res.status(200).send({
      id: user._id,
      email: user.email,
      username: user.username,
      profilePicture: user.profilePicture,
      token,
    });
  }

  async getAllUser(req, res) {
    try {
      const user = await this.query.getAll.select('-password').exec();
      return res.status(200).send(user);
    } catch (error) {
      return res.status(500).send('network error');
    }
  }
}

const user = new UserControler(Query().user);
export default user;
