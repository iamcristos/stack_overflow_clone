/* eslint-disable no-underscore-dangle */
import server from './index';
import help from './db';
import jwt from '../src/util/jwt';

describe('User test', () => {
  let user;
  beforeAll(async (done) => {
    await help.connectDb();
    user = await help.createUser();
    return done();
  });

  afterAll(async (done) => {
    await help.cleanDB();
    await help.disconnectDb();
    return done();
  });

  test('should register a user', async (done) => {
    const body = { email: 'gima@gmail.com', password: 'password', username: 'usernames' };
    const response = await server().post('/register').send(body);
    expect(response.status).toBe(201);
    expect(response.body._id).toBeTruthy();
    return done();
  });

  test('should return 400 while registering with existin username', async (done) => {
    const body = { email: 'gim@gmail.com', password: 'password', username: 'usernames' };
    const response = await server().post('/register').send(body);
    expect(response.status).toBe(400);
    return done();
  });

  test('should return 422 while registering with empty body', async (done) => {
    const response = await server().post('/register').send({});
    expect(response.status).toBe(422);
    return done();
  });

  test('should login succesfully ', async (done) => {
    const body = { email: 'n@gamil.com', password: 'password' };
    const response = await server().post('/login').send(body);
    expect(response.status).toBe(200);
    expect(response.body.token).toBeTruthy();
    return done();
  });

  test('should return 401 ', async (done) => {
    const body = { email: 'n@gamil.com', password: 'passwords' };
    const response = await server().post('/login').send(body);
    expect(response.status).toBe(401);
    expect(response.text).toBe('invalid operation');
    return done();
  });

  test('should return all users', async (done) => {
    const token = jwt.generateToken(user);
    const response = await server().get('/user').set({ Authorization: token });
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    return done();
  });

  test('should return 401', async (done) => {
    const response = await server().get('/user').set({ Authorization: 'tokenbgjjjthhjssjjhjen122bdjn' });
    expect(response.status).toBe(401);
    return done();
  });
});
