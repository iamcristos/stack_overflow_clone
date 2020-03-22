/* eslint-disable no-underscore-dangle */
import server from './index';
import help from './db';
import jwt from '../src/util/jwt';

describe('Question test', () => {
  let user;
  let question;

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

  test('should succesfully create question', async (done) => {
    const body = { title: 'hi', body: 'hello ask a question' };
    const token = jwt.generateToken(user);
    const response = await server().post(`/question/${user._id}`).set({ Authorization: token }).send(body);
    expect(response.status).toBe(201);
    expect(response.body.askedBy.toString()).toBe(`${user._id}`);
    return done();
  });

  test('should succesfully create question', async (done) => {
    const body = { title: 'hi' };
    const token = jwt.generateToken(user);
    const response = await server().post(`/question/${user._id}`).set({ Authorization: token }).send(body);
    expect(response.status).toBe(422);
    return done();
  });

  test('should get question', async (done) => {
    const token = jwt.generateToken(user);
    const response = await server().get(`/question/${question._id}`).set({ Authorization: token });
    expect(response.status).toBe(200);
    return done();
  });

  test('should return 404', async (done) => {
    const token = jwt.generateToken(user);
    const response = await server().get(`/question/${user._id}`).set({ Authorization: token });
    expect(response.status).toBe(404);
    return done();
  });

  test('should upvote a question', async (done) => {
    const body = { userId: user._id };
    const token = jwt.generateToken(user);
    const response = await server().post(`/question/${question._id}/upvote`).set({ Authorization: token }).send(body);
    expect(response.status).toBe(200);
    expect(response.body.upVote.length).toBe(1);
    return done();
  });

  test('should return 422', async (done) => {
    const token = jwt.generateToken(user);
    const response = await server().post(`/question/${question._id}/upvote`).set({ Authorization: token }).send();
    expect(response.status).toBe(422);
    return done();
  });

  test('should downvote a question', async (done) => {
    const body = { userId: user._id };
    const token = jwt.generateToken(user);
    const response = await server().post(`/question/${question._id}/downvote`).set({ Authorization: token }).send(body);
    expect(response.status).toBe(200);
    expect(response.body.upVote.length).toBe(0);
    return done();
  });

  test('should return 422', async (done) => {
    const token = jwt.generateToken(user);
    const response = await server().post(`/question/${question._id}/downvote`).set({ Authorization: token }).send();
    expect(response.status).toBe(422);
    return done();
  });

  test('should upvote a question', async (done) => {
    const body = { userId: user._id };
    const token = jwt.generateToken(user);
    const response = await server().post(`/question/${question._id}/subscribe`).set({ Authorization: token }).send(body);
    expect(response.status).toBe(200);
    expect(response.body.downVote.length).toBe(1);
    expect(response.body.subscribedUsers.length).toBe(1);
    return done();
  });

  test('should return 404', async (done) => {
    const body = { userId: user._id };
    const token = jwt.generateToken(user);
    const response = await server().post(`/question/${user._id}/subscribe`).set({ Authorization: token }).send(body);
    expect(response.status).toBe(404);
    return done();
  });
});
