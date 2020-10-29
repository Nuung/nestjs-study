import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    // 테스트 마다 createTestingModule을 하고 있다 
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    }));
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

    it('POST 201', () => {
      return request(app.getHttpServer())
      .post('/movies')
      .send({
        title:"Test",
        year: 2000,
        genres: ['test']
      })
      .expect(201); // create api가 잘 작동 되는지? 
    });

    it('POST 400', () => {
      return request(app.getHttpServer())
      .post('/movies')
      .send({
        title:"Test",
        year: 2000,
        genres: ['test'],
        other:"hecking things"
      })
      .expect(400); // create api가 잘 작동 되는지? 
    });

    it('DELETE', () => {
      return request(app.getHttpServer()).delete('/movies').expect(404);
    });
  }); // describe /movies

  describe('/movies/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer())
        .get('/movies/1')
        .expect(200);
    });
    it('GET 404', () => {
      return request(app.getHttpServer())
        .get('/movies/999')
        .expect(404);
    });
    it('PATCH', () => {
      return request(app.getHttpServer())
      .patch('/movies/1')
      .send({title: "Update Test"})
      .expect(200);
    });
    it('DELETE', () => {
      return request(app.getHttpServer())
      .delete('/movies/1')
      .expect(200);
    });
  });
});
