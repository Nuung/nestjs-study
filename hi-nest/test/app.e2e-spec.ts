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

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello! this is just app.controller');
  });

  describe('/movies (GET)', () => {
    it('GET', () => {
      return request(app.getHttpServer())
      .get('/movies')
      .expect(200)
      .expect([]); // temp arr를 (가짜 디비)사용하기 때문에 아무것도 없어야 한다 
    });

    it('POST', () => {
      return request(app.getHttpServer())
      .post('/movies')
      .send({
        title:"Test",
        year: 2000,
        genres: ['test']
      })
      .expect(201); // create api가 잘 작동 되는지? 
    });

    it('DELETE', () => {
      return request(app.getHttpServer()).delete('/movies').expect(404);
    });
  }); // describe /movies
});
