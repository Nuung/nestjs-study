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

- 