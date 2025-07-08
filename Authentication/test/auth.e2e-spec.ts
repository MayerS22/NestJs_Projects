import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('Authentication System (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a signup request', () => {
    const email = "test12345@test.com";
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({email, password:"123456"})
      .expect(201)
      .then((res) => {
        const {id, email} = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(email);
      })
      
  });

  it('signup as a new user then get the currently logged in user', async () => {
    const email = "test12345@test.com";
    const password = "123456";
    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({email, password})
      .expect(201)
      .catch(err => {
        console.log('Signup error:', err.response.body);
        throw err;
      });

    const cookie = res.get('Set-Cookie');
    expect(cookie).toBeDefined();

    const cookieHeader = Array.isArray(cookie) ? cookie[0] : cookie;

    const { body } = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookieHeader || '')
      .expect(200);

    expect(body.email).toEqual(email);
  });
});
