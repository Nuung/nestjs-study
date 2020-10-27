import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  // 작업 전에 하는 action들 
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });


  // 작업 후에 action
  afterAll(() => {
    console.log(service.getAll());
  });

  // 꼭 정의 되어야 하는 것!
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // it("should be 5", () => {
  //   expect(2 + 3).toEqual(5);
  // });

  // 같은 이름일 필요는 없음 
  describe("getAll", () => {
    it("should return an array", () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    })
  });

  describe("getOne", () => {
    it("should return a movie with id 1", () => {
      service.create({
        title: "Test Movie",
        genres: ['test'],
        year: 2000
      });

      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    })

    it("should throw 404 error cuz we dont have any 9999 id movie", () => {
      try {
       service.getOne(9999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual("Movie with ID 9999 not found.");
      }
    });
  });

  describe("deleteOne", () => {
    it("deletes a movie", () => {
      // 일단 create하고 
      service.create({
        title: "Test Movie",
        genres: ['test'],
        year: 2000
      });
      const allMovies = service.getAll().length; // 만들어졌는지 체크 
      service.deleteOne(1);
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(allMovies);
    });
    it("should return a 404", () => {
      try {
        service.deleteOne(9999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe("create", () => {
    it("should create a moive", () => {
      
      const beforeCreate = service.getAll().length;
      service.create({
        title: "Test Movie",
        genres: ['test'],
        year: 2000
      });
      const afterCreate = service.getAll().length;
      // console.log(beforeCreate, afterCreate);
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe("update", () => {
    it("should update a movie", () => {
      service.create({
        title: "Test Movie",
        genres: ['test'],
        year: 2000
      });

      const originTitle = service.getOne(1).title;
      service.update(1, {title: "Updated Test"});
      const movie = service.getOne(1);
      expect(movie.title).toEqual("Updated Test");
      expect(movie.title).not.toEqual(originTitle);
    });

    it("should throw a NotFoundException", () => {
      try {
        service.update(9999, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });

  });
});
