/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';
import model from '../src/model';
import db from '../src/config/db.config';

class DbtestHelper {
  static connectDb() {
    return db();
  }

  static async cleanDB() {
    // drop all database;
    const promiseArray = [model.User.deleteMany({}),
      model.Question.deleteMany({}), model.Answer.deleteMany({})];
    const cleandb = await Promise.all(promiseArray);
    return cleandb;
  }

  static async createUser() {
    const body = { email: 'n@gamil.com', password: 'password', username: 'vince' };
    const user = await model.User.create(body);
    return user;
  }

  static async createQuestion() {
    const user = await DbtestHelper.createUser();
    const question = await model.Question.create({ title: 'title', body: 'the body', askedBy: user._id });
    return question;
  }

  static disconnectDb() {
    return mongoose.disconnect();
  }
}

export default DbtestHelper;
