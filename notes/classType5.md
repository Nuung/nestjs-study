# 3.0 Introduction to Testing in Nest (04:53)
https://nomadcoders.co/nestjs-fundamentals/lectures/1953

###

> Nest에서 Testing하는 방법!

## package.json file -> script
- 테스팅과 관련된 스크립트가 5가지 정도 있다. 
    <div align = "center"><img src="https://github.com/Nuung/nestjs-study/blob/master/notes/images/img8.png" width="70%" /></div>

- jest는 자바스크립트를 아주 쉽게 테스팅하는 npm package다. 
    - nestjs가 위와같이 미리 setup을 해 둔 것이다. 
    - 우리가 이때까지 만든 파일 중 .spec.ts라는 파일이 자동 생성 되어 있다. -> 이 파일들이 테스트를 포함한 파일이다.

- jest가 이런 .spec.ts 파일을 자동으로 찾는다. ```npm run test:cov```를 실행해보자. 
    - ```sudo npm install```로 미리 빼먹은 package module들 설치해 두자! 

    <div align = "center"><img src="https://github.com/Nuung/nestjs-study/blob/master/notes/images/img9.png" width="70%" /></div>
    
    - 이렇게 하면 모든 spec.ts파일 찾아서 몇 줄이 테스팅 되었는지 나온다.
    - 테스팅 하고 싶은 파일에 spec.ts 이름을 붙여도 된다.

- ```npm run test:watch``는 모든 테스트 파일 찾고 거기서 무슨 일이 일어나는지 체크하는 것
    - Press f to run only failed tests.
    - Press o to only run tests related to changed files.
    - Press p to filter by a filename regex pattern.
    - Press t to filter by a test name regex pattern.
    - Press q to quit watch mode.
    
- 유닛 테스팅은 모든 function을 따로 따로 테스팅 하는 것이다. 
    - 예를 들어 getAll() 하나만 테스트 하고 싶을때! ... like this ...

- e2e 테스팅은 이 페이지로 가면 특정 페이지가 나와야 하는 경우
    - 사용자 스토리! 사용자 관점에서 보는 것이다. 
    - **사용자가 특정 링크를 클릭하면 이 링크를 볼 수 있어야 한다!**를 테스트 할때! 

## More About Unit Test
- jest를 들어가보자! [jest](https://jestjs.io/)

- movies.service.spec.ts 파일로 가자! 아래 코드를 추가 해 보자!!
    ```typescript
    it("should be 4", () => {
        expect(2 + 2).toEqual(4);
    });
    ```
    - ```npm run test:watch``` 실행 시키면서 위 파일 변경하면서 결과를 보면 쉽다!
    - log에 *should be 4 (3 ms)* 라는 글이 찍힌다! 
    - 위 코드에서 toEqual(5)로 바꾸면?! 에러가 잡힌다!!! 개꿀띠! 

    <div align = "center"><img src="https://github.com/Nuung/nestjs-study/blob/master/notes/images/img10.png" width="70%" /></div>

- 이제 진짜 우리가 만든 함수 대상으로 유닛 테스트 실시해보자! 
    - getAll을 먼저해보자! service에 있는 함수를 바로 접근할 수 있다.
    ```typescript
    // 같은 이름일 필요는 없음 
    describe("getAll", () => {
        it("should return an array", () => {
        const result = service.getAll();
        expect(result).toBeInstanceOf(Array);
        })
    });
    // 콘솔창에 결과 어떻게 찍히는지가 핵심이다! 
    ```
    - 위와 같이 다른 함수도 바로 진행할 수 있다!! 코드를 참조하자! 
    > 핵심은 describe("text" () => { it("text", () => { *expect(obj).method* })}) 같은 간단한 형식으로도 테스팅이 바로바로, 그리고 실시간 모니터링으로도 가능하다는 점이다.
    
    - 404 error catch (throw 하는지 안하는지) / error message 값이 같은지 등 당연히 이런 테스트도 가능하다!

    - ```npm run test:cov```를 돌려보면 우리 커버리지가 증가한 것을 볼 수 있다! 더 많은 부분을 테스트하고 있기 때문이다! => **이 수치들이 우리가 얼마나 테스트를 하고 있는지 나타내어 주는 것!!**

    