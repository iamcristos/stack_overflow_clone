import request from 'supertest';
import server from '../src/server';

function requestServer() {
  return request(server);
}

export default requestServer;
