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
- 코드 다 짜고 아래와 같이 테스트 해보자! insomnia 또는 postman이용!
- <div align = "center"><img src="./images/img6" width="70%" /></div>


## Movies Service part Two
- 우리가 만든 Data들은 메모리 위에 있는 (주메모리 - 플레시 메모리) DB이기 때문에 당연히 서버를 껏다 키면 모두 날라간다!! 하지만 서버를 켜 놓은 동안은 당연히 살아있다! 
- 먼저 Get :id method를 조금 개편해보자!
    - 즉 존재하지 않는 id 값 request or other 경우에 적어도 어떤 에러 화면은 보여줄 필요가 있다. **nestjs** 에서 미리 만들어 놓은 (제공하는) throw error를 이용할 수 있다! 
    ```typescript
    getOne(id: string): Movie {
        const movie = this.movies.find(movie => movie.id === +id); // +가 Stirng to Number casting을 해준다.
        if (!movie) {
            throw new NotFoundException(`Movie with ID ${} not found.`);
        }
        return movie;
    }
    ```
    - 이렇게 error catch ~ throw를 넣으면 delete에서도 ```this.getOne()``` 함수를 이용해서 다른 에러 처리 필요없이 처리할 수 있다. 
    - update도 이와 비슷하게 바꿔보자, 근데 수업 중에 진행하는 update함수는 좀 많이 구리다 ㅋㅋ 어쩔 수 없다,, db를 안쓰기 때문에 ㅎㅎ (실제 update를 사용하지도 않음)
- > ***유효성 검사는?!***
    - updateData 같은 경우는?! patch의 body값을 예로 들어보자! 
