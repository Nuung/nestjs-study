# 2.6 Modules and Dependency Injection (07:07)
https://nomadcoders.co/nestjs-fundamentals/lectures/1951

###

> 저번 프로젝트 그대로 이어서 이번엔 그냥 앱을 **좀 더 좋은 구조로** 만들어 보자!

## 구조 바꾸기 
- app.module은 Movie~ controller와 provider를 가지고 있다!
    - 하지만 사실 그런 것들이 총 합쳐진 모듈인 AppController, AppProvider만 가지고 있어야 한다

- 그래서 Movie들을 모듈화 해서 독립시켜 주자! 
    - MoviesService, MoviesController -> movies.module로 바꾸기
    - nestJS가 이렇게 여러 모듈로 이뤄진다는 것을 알 수 있다. 

- nest cli를 체크해보자! -> 이번에는 모듈을 만들 것이다. 
    ```bash
    nest g mo
    ? What name would you like to use for the module? movies
    CREATE src/movies/movies.module.ts (83 bytes)
    UPDATE src/app.module.ts (348 bytes)
    ```

- **movies.module.ts** 를 중심으로 작업하자!
    - MoviesService, MoviesController를 app.module에서 삭제
    - 그것들을 그대로 MoviesModule로 이전!
    - app.module에서는 그냥 **imports: [MoviesModule],** 만 해주기!
    - <div align = "center"><img src="./images/img7" width="70%" /></div>

- 이제 다시 nest cli로 controller, service만들기 명령어로 이름은 app으로 만들어 주자!
    ```bash
    nest g co
    ? What name would you like to use for the controller? app
    CREATE src/app/app.controller.spec.ts (471 bytes)
    CREATE src/app/app.controller.ts (95 bytes)
    UPDATE src/app.module.ts (266 bytes)

    nest g s
    ? What name would you like to use for the service? app
    CREATE src/app/app.service.spec.ts (439 bytes)
    CREATE src/app/app.service.ts (87 bytes)
    UPDATE src/app.module.ts (324 bytes)
    ```
    - 이 controller는 무엇을 하게 만들까? 
        - 일단 심플하게 @Get으로 String return만 만들어 두자! 


## Dependency Injection
- 오우 글로 설명하기 매우 힘들다. [가벼운 설명](https://medium.com/crocusenergy/nestjs-providers-%EA%B0%9C%EB%85%90-%EB%B0%8F-%EC%8B%A4%EC%8A%B5-e811bccb809a)
- [Main Docs](https://docs.nestjs.com/providers)
- nestJS가 MoviesService를 import하고 Controller에 inject를 하는 것이다. 
    - ``` @Injectable() ``` 이 데코레이터를 생각해보자!
    - 사실 이 개념이 중요한 이유는 **왜 providers 자리에 service를 넣을까**를 이해하는 것이다!! 


## 2.7 Express on NestJS (03:22)
- nestjs는 express위에서 돌아간다. 
    > 그래서 컨트롤러에서 Request, Response object가 필요하면 사용할 수 있다. express와 fastify를 일단 생각해보자!

    - 기본적으로 express 프레임 워크 접근을 아래와 같이 사용할 수 있다. 
    ```typescript
    @Get()
    getAll(@Req() req, @Res() res): Movie[] {
        res.json();
        ...
    } // 이와 같이 사용이 가능하다! 

    // 하지만 nestJS는 기본적으로 2개의 프레임워크랑 작동한다. 
    // 기본적으로 express -> 이것을 Fastify라는 걸로 전환이 가능하다!! -> DOCS 참고
    // Express엣서의 req, res를 많이 사용하지 말자! 퍼포먼스 자체는 fastify가 빠르다! 

    ```