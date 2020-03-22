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
    this.searchUser = this.searchUser.bind(this);
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

  async searchUser(req, res) {
    try {
      const { username } = req.body;
      const { page, pagination } = req.query || { page: 1, pagination: 10 };
      const users = await this.query.searchUser(username, page, pagination);
      if (users.length === 0) return res.status(404).send('no such user with such username');
      return res.status(200).send(users);
    } catch (error) {
      return res.status(500).send('network error');
    }
  }
}

const user = new UserControler(Query().user);
export default user;
