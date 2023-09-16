import request from 'supertest';
import { createServer} from '../config/app';

describe('exports',()=>{
  it('returns a 201 on successful signup', async () => {
    return request(createServer)
      .post('/v4/api/auth/signin')
      .send({
        username:"Test",
        email: 'test@gmail.com',
        password: 'password1234'
      })
      .expect(201);
  });
})

