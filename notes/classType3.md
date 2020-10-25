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

- Data Transfer Object를 만들자 (DTO)
    - DTO folder -> create-movie.dto.ts
    ```typescript
    export class CreateMovieDto {
        readonly title: string;
        readonly year: number;
        readonly genres: string[];
    }
    ```
    - 이제 수신 전송할때 이 object를 이용하면 된다
    - movieData의 타입은 **CreateMovieDto**가 되는 것이다.  

- DTO는 왜쓰지?
    1. 코드의 간결성!
    2. nestJS가 들어오는 쿼리에 대해 유효성 검사가 가능하다! -> 이걸 위해서 main.ts에 '파이프(코드가 지나가는 자리)'를 만들어 주자!
    > ***유효성 검사는?!***
    - 바로 위에서 설명한 Pipe를 통해 할 것이다! 아래 코드를 main에 추가해주자! 그리고 모듈을 추가로 설치해 주자! 바로 class의 유효성 검사를 위해! 
    ```typescript
    app.useGlobalPipes(new ValidationPipe());
    ```
    ```bash
    npm i class-validator class-transformer
    ```

- 이제 DTO를 다시 살펴보자!
    - 데코레이터를 추가로 사용할 것이다. 아래와 같이 사용하자! 
    ```typescript
    import { IsNumber, IsString } from 'class-validator';
    export class CreateMovieDto {
        @IsString()
        readonly title: string;
        
        @IsNumber()
        readonly year: number;

        @IsString({ each: true })
        readonly genres: string[];
    }
    ```
    - fuxking simple해진다!!! 존나게 개꿀이다 솔직히!! 유효성 검사가 DTO에서 추가 모듈로 초 심플해져 부렸다~ 하지만 pipe line 없으면 안된다는 점! (그냥 파이프라인이 아님 ValidationPipe)
    - 근데 이 전달하는, 즉, request자체가 도달하기 전에 막아버릴 수 있다!! main에서 아래와 같이 '화이트 리스트' 옵션들 이용하자!
    ```typescript
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true
    }));
    ```
    - **transform** 을 추가하면 형 변환을 자동으로 지원해 줄 수 있다! 물론 기본적인 규칙은 지켜야 한다!! Controller, Service에서 tpyeOf 체크 해보고 id string to number로 다 바꿔주자! 이게 transfrom의 힘이닷! **프레임 워크의 유용성!**


## Update Data DTO의 설정과 유효성 
- update-movie.dto.ts 만들기 
    - ```readonly title?: string;``` 이런식으로 **?** 를 붙여서 필수가 아님을 명시해주자! 왜나면 하나만 update 해줄 수 있으니까
- Controller와 Service에서 @Patch도 Data type을 UpdateMovieDto로 바꿔주자
- 여기서 다른 방식으로 UpdateMovieDto를 만들 수 있다! 
    - ```sudo npm i @nestjs/mapped-types``` 일단 설치부터 하자 
    - [자세한 사항](https://www.npmjs.com/package/@nestjs/mapped-types)
    ```
    A good example of such a variant is a Data Transfer Object (DTO). A Data Transfer Object is an object that is used to encapsulate data, and send it from one part of your application to another. DTO’s help us define the input and output interfaces of our system.
    ```

- **PartialType** 요놈을 통해서 우린 CreateMovieDto를 그대로 따르면서 쉽게 변형할 수 있다! 코드 참조! 