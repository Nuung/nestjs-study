import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
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
});
