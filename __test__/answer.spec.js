/* eslint-disable no-underscore-dangle */
import server from './index';
import help from './db';
import jwt from '../src/util/jwt';

describe('Answer test', () => {
  let user; let question;

  beforeAll(async (done) => {
    await help.connectDb();
    const result = await help.createQuestion();
    user = result.user;
    question = result.question;
    return done();
  });

  afterAll(async (done) => {
    await help.cleanDB();
    await help.disconnectDb();
    return done();
  });

  test('should answer a question', async (done) => {
    const token = jwt.generateToken(user);
    const body = { answer: 'here is my answer' };
    const response = await server().post(`/answer/${user._id}/${question._id}`)
      .set({ Authorization: token }).send(body);
    expect(response.status).toBe(200);
    return done();
  });

  test('should answer a question', async (done) => {
    const token = jwt.generateToken(user);
    const response = await server().get(`/answer/${user._id}/${question._id}`)
      .set({ Authorization: token });
    expect(response.status).toBe(200);
    expect(response.body[0].answeredBy.toString()).toBe(`${user._id}`);
    expect(response.body[0].question.toString()).toBe(`${question._id}`);
    return done();
  });

  test('should answer a question', async (done) => {
    const token = jwt.generateToken(user);
    const response = await server().get(`/answer/${user._id}/${user._id}`)
      .set({ Authorization: token });
    expect(response.status).toBe(404);
    expect(response.text).toBe('question dont exists');
    return done();
  });
});
