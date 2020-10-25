# 0.3 Project Setup (02:58)
https://nomadcoders.co/nestjs-fundamentals/lectures/1941

###

## Installing
- [DOCS](https://docs.nestjs.com/)
```bash
(sudo) npm i -g @nestjs/cli
nest new project-name

npm run start:dev
```

## Overview
- NestJs 는 무조건 main.ts 파일, 그 이름 그대로 가져야 한다. 내부 함수 이름이나 동적인 부분은 변경이 가능하다. 
- AppMoudle는 클래스며 따라가보면 -> @ 골뱅이 부분, '데코레이터'라는 부분이 있다. 기본적으로 클래스에 함수 기능을 추가할 수 있다. 가볍게 클래스 위의 함수, 클래스를 위해 움직인다고 생각하자. 
- controllers와 providers가 존재한다.
    - controllers에 AppService가 또 존재한다. -> getHello() 함수의 결과가 출력된다. 
    - 이런 작은 부분을 실습과 동시에 거꾸로 접근해서 역할을 알아보자! 
- 모듈은 어플리케이션의 일부분이다. 한 가지의 역할을 하는 한 부분.
    - 인스타 그램에서 photo 모듈 ~ video 모듈 ~ 같은 느낌
    - 컨트롤러가 프로바이더가 핵심이다. 

## Controllers
- 기본적으로 url을 가져오고 함수를 실행하는 것이다. -> node **express의 라우터** 같은 존재다.
- ```@Get()``` 같은 부분을 보면 닮아있는 것을 볼 수 있다. -> 물론 @Post() 도 가능허다~
    - ``` @Get('/hello')
          sayHello(): string {
            return "Hello everyone! this is get method from controller";
          } ```
    - Go to http://localhost:3000/hello and check the result!!
    - 한가지 주의할 점은 @~ (데코레이터)와 함수가 떨어져 있으면 안되고 붙어 있어야 한다!
    - Error Page가 참 보기 좋은 것 같다 (JSONView 설치 권고)
    - <div align = "center"><img src="https://github.com/Nuung/nestjs-study/blob/master/notes/images/img1.png" width="70%" /></div>

## Service
- ```this.appService.getHello();``` 여기서 appService의 존재는 무엇이란 말인가!
    - 기본적으로 NestJS는 컨트롤러를 비즈니스 로직이랑 구분짓고 싶어한다.
    - 컨트롤러는 그냥 url을 가져오는 역할과 function run!
    - 나머지 부분은 (비즈니스 로직) 서비스로 가며 일반적으로 실제 function을 가지는 부분이다.
- **app.service.ts** 파일을 살펴보자!
    - 위에서 짠 Controller의 Get /hello method에서 실제 함수 return을 NestJS가 지향하는 방법으로 바꾸려면 ```return this.appService.getHi(); ``` 로 바꾸고, app.service.ts 파일에서 getHi 메소드를 만들어서 실제 함수를 만들어 줘야하는 것이다!
    - 실제 비즈니스 로직은 다 여기 있는 것이다! 

### main.ts, app.module.ts 빼고 src에서 모두 지우고 시작하자! 