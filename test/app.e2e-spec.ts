import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/cats (GET)', () => {
    return request(app.getHttpServer()).get('/cats').expect(200).expect([]);
  });

  it('/cats (POST)', () => {
    return request(app.getHttpServer())
      .post('/cats')
      .send({ name: 'Fluffy', age: 3, color: 'white' })
      .expect(201)
      .expect({ id: 1, name: 'Fluffy', age: 3, color: 'white' });
  });

  it('/cats (GET)', () => {
    return request(app.getHttpServer()).get('/cats').expect(200).expect([]);
  });

  it('/cats/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/cats/1')
      .expect(200)
      .expect({ name: 'Fluffy', age: 3, color: 'white', id: 1 });
  });

  it('/cats/:id (PUT)', () => {
    return request(app.getHttpServer())
      .put('/cats/1')
      .send({ name: 'Whiskers', age: 4, color: 'gray' })
      .expect(200)
      .expect({ id: 1, name: 'Whiskers', age: 4, color: 'gray' });
  });

  it('/cats/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/cats/1')
      .expect(204)
      .expect({});
  });
});
