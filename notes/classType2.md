# 2.0 Movies Controller (09:36)
https://nomadcoders.co/nestjs-fundamentals/lectures/1945

###

## 실습 방향과 시작 
- 영화 restAPI를 만들어 보자 
- url ~ function만 가져오는 것 부터 만들자 -> 바로 controller 부터! 
    - **nestJS cli** 쓸만한 좋은 명령어들이 굉장히 많다. 
    - <div align = "center"><img src="./images/img2" width="70%" /></div>
        ```bash
        nest g co 
        movies
        ``` 
    - <div align = "center"><img src="./images/img3" width="70%" /></div>
    - 위와 같이 자동으로 파일도 생겼고, app.module에 자동으로 MoviesController를 import하고 controller로 사용을 한다!!  / spec 파일은 테스트 파일이며 지금은 지워도 된다. 나중에 다시 할꺼다!
    - ```@Controller('movies')``` 이게 entry point가 되어 자동으로 url이 접두사 마냥 이게 붙게 되어 있다. 즉 어떤 api를 만들든 movies/{...} 형태가 되는 것, 아래와 같은 코드를 movies.controller.ts를 바꿔주자! 
        ```javascript
        import { Controller, Get } from '@nestjs/common';
        @Controller('movies')
        export class MoviesController {
            @Get()
            getAll() {
                return "This will return all movies";
            }

            @Get("/:id")
            getOne() {
                return "This will return one movie";
            }
        }
        ```
    - 무언가가 필요하면 우리가 요청을 해야한다! 즉 /:id로만 하면 안되고 아래와 같이야 한다는 것! 파라미터가 무엇인지, 무엇이 필요한지 선언을 해야함! 그 외 코드는 사진에서 확인하자!
        ```javascript
        @Get("/:id")
        getOne(@Param("id") id: string) { // id: string에서 는 아무 이름으로 바뀌어도 된다 ~ 물론 바뀌면 아래 return 변수에서도 바뀌어야 함 
            return `This will return one movie with the id: ${id}`;
        }
        ```
    - 다양한 method를 데코레이터로 지원한다는 것이다.
        - Get Post Delete Put(특정 대상보단 덩어리로 작업 할때) Patch(특정 대상만 작업할때)


## Routes 요청에 대해서 좀 더 자세히! 
- Post Method에서 요청의 Body값을 어떻게 다룰까? 
    - 데코레이터 하단의 함수 이름에서 @Body()를 사용하면 된다. 
    ```javascript
    @Post()
    create(@Body() movieData) {
        console.log(movieData);
        return movieData;
    }
    ```