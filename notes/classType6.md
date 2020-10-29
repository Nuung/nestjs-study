# 4.0 Testing movies (08:31)
[https://nomadcoders.co/nestjs-fundamentals/lectures/1958]

###

> 이제 Testing 중에서 E2E 테스팅이다! 

## E2E testing! 
- E2E (end to end test) 기본 information
    - 예를 들어 비밀번호 생성하는 함수가 있고 잘 만들어지는지 체크를 하려면? 특히 함수가 굉장히 비지니스 로직 세부 단위로 쪼개져 있다면? 어떤때 하나만 하고 어떤때 모두 테스트를 해야할까? 이 부분에 모든 작업을 cover하기에 힘들 수 있다. 

    - 이때 e2e를 사용할 수 있다. **파일 경로가 test -> app.e2e-spec.ts 파일이다! 그리고 jest-e2e.json도 있다!**

- 기본적으로 unit testing때 살펴봤던 spec파일과 크게 다르지 않지만, request 자체, 로직 자체를 테스트할 수 있다. (api request를)
    - ```npm run test:e2e``` 를 일단 해보자! error가 뜬다! hello world가 아니랜다! 우리가 이전 코드 작업할때 localhost기본 return text를 바꿨다! 바꿔주고 다시 하면 잘 된다! 
    <div align = "center"><img src="https://github.com/Nuung/nestjs-study/blob/master/notes/images/img12.png" width="70%" /></div>

    - 여러가지를 할 수 있다!! unit test처럼 진행할 수 도 있고 여러 변형된 형태의 테스트도 가능하다! 

## Start coding to E2E testing!
- movies get api를 아래 코드를 추가해서 테스트할 수 있다
    ```typescript
    it('/movies (GET)', () => {
        return request(app.getHttpServer())
        .get('/movies')
        .expect(200)
        .expect([]); // temp arr를 (가짜 디비)사용하기 때문에 아무것도 없어야 한다 
    });
    ```
    - 사실 describe를 사용해서 더 좋게 테스트도 가능하다!!
    > 우린 /movies url에 method만 다른 여러 api를 사용하고 있다! 묶어서 it으로 method 형태마다 모두 테스트 가능하다! 아래와 같이! 

    ```typescript
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
    ```

## Missing Point
- nestJS는 테스트마다 어플리케이션을 생성하고 있다. -> 이건 실제 테스트할때 생성하는 것과는 전혀 다른 것이다! 
    - 매번 테스트할때마다 생기는 것을 원하지 않는다. 그래서 간단하게! **테스팅을 시작하기 전에 새 어플리케이션을 만들어 보자!** => ```beforeEach -> beforeAll``` 로 바꿔주자

    - 그런데 movie id 1 get을 하는 것이 테스팅 되지 않는다! [이건 봐야해](https://nomadcoders.co/nestjs-fundamentals/lectures/1959) 왜?

    - 리얼 서버와 테스트 서버에서 getOne 함수가 작동할때 consloe log로 typeof id 찍어보자! 
        > 리얼에서는 number, testing에서는 string으로 찍인다!! wow 왜??

    - **main.ts**에서 'transform'을 기억하자! controller에서 타입을 우리가 목적한 것으로 바꿔준다!! 즉, 이 transform이 testing server에서는 작동하지 않는다! -> 어떤 파이프에도 올리지 않았다는 것이다.
        > Tesing Server도 이런 서버 환경을 똑같이 세팅해줘야 한다는 것이다!!
    ```typescript
    // 아래 코드를 추가 꼭 해주자!! 
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    }));
    ```
- 테스팅 환경도 리얼과 똑같이 해줘야한다는 점 잊지말자!! 그리고 movie id, get 200, get404, delete, patch도 마저 다 완성시켜주자~ 
    - get & post request 200, 201, 400, 404 error code complite

## END UP 