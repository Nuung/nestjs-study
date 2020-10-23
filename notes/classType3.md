# 2.2 Movies Service Part Start (10:48)
https://nomadcoders.co/nestjs-fundamentals/lectures/1947

###

> 리마인드, 서비스는 movies의 로직을 관리하는 역할을 할 것이다. 컨트롤러와 서비스의 역할차이 기억하자! 


## Movies Service part One
- 컨트롤러는 url 매핑, 리퀘 받고 쿼리 넘기고, 이제 service로 넘어와서 로직관리를 시작하자
    - nest cli커멘드로 컨트롤러와 같이 서비스도 만들자. 파일 업데이트 뿅! 
    ```bash
    nest g s
    movies
    ``` 
    - <div align = "center"><img src="./images/img5" width="70%" /></div>
- 이제 데이터 베이스를 만들자. 근데 '실제' 데이터베이스가 아닌, DB처럼 사용가능한 fake DB를 이용할 것이다. 
    - 이제 코드 참조 -> []()
    - entities 라는 폴더를 만들고, entity.ts 로 object들을 관리해준다! ORM 느낌으로! 
    - service 에서 그 entity obj를 import하고 비즈니스 로직을 작성한다. 
    - > Controller에서 만들어준 메소드 이름과 동일하게 해주면 더 좋은 규칙이 되는 것! 
    ```typescript
    getOne(id: string): Movie {
        return this.movies.find(movie => movie.id === +id); 
        // +가 Stirng to Number casting을 해준다.
    }
    ```
    - 다른 메소드 (함수)들은 코드를 참조! 
- Controller에서 이제, Service에서 만든 함수를에 접근해야 한다! 어떻게 접근할까 
    - 기본적으로 수동으로 import하는 것이 아니라! (**express 와 다른점!**) '요청'을 해야한다. 아래와 같은 식으로 아주 간단하게 브릿지를 만들어 줄 수 있다!!
    ```typescript
    constructor(private readonly movieService: MoviesService) {}

    @Get()
    getAll(): Movie[] {
        return this.movieService.getAll();
    }
    ```


## Movies Service part Two
- 