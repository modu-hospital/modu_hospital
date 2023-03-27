# 프로젝트명: 모두의 병원[![Node.js CI](https://github.com/modu-hospital/modu_hospital/actions/workflows/node.js.yml/badge.svg)](https://github.com/modu-hospital/modu_hospital/actions/workflows/node.js.yml)

#### 팀원: 최준혁, 주민석, 김기민, 이희찬, 김범석

## 프로젝트 설명

내 주변 병원들을 손쉽게 찾을 수 있을 뿐만 아니라 리뷰를 통해 해당병원이 자신과 맞는지 알아볼 수 있는
플랫폼

(나중에 노션링크 걸기)
모두의 병원 notion

(사이트링크 걸기)
서비스 이용해기

![image](https://user-images.githubusercontent.com/111362623/227514902-eb1ee38e-61d4-4860-9c3f-1dd29327ba77.png)

아키텍처
아키텍처 사진 나중에 올리기

## 기술스택

<div align=center><h1>📚 STACKS</h1></div>


<div align=center>
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> 
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 
  <img src="https://img.shields.io/badge/jquery-0769AD?style=for-the-badge&logo=jquery&logoColor=white">
  <br>
  
  <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"> 
  <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
  <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">
  <img src="https://img.shields.io/badge/bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white">
  <br>

  <img src="https://img.shields.io/badge/amazonaws-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white"> 
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
  <img src="https://img.shields.io/badge/fontawesome-339AF0?style=for-the-badge&logo=fontawesome&logoColor=white">
  <br>	
  
  <img src="https://img.shields.io/badge/Amazon-S3-569A31?style=flat&logo=Amazon-S3&4a154b=white" />
<img src="https://img.shields.io/badge/Amazon-EC2-FF9900?style=flat&logo=Amazon-EC2&4a154b=white" />
<img src="https://img.shields.io/badge/Amazon-RDS-527FFF?style=flat&logo=Amazon-RDS&4a154b=white" />
  <img src="https://img.shields.io/badge/Visual Studio Code-007acc?style=flat&logo=Visual Studio Code&logoColor=white" />
	<img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=GitHub&181717=white" />
  <br>
	
  
<img src="https://img.shields.io/badge/slack-4a154b?style=flat&logo=slack&4a154b=white" />
<img src="https://img.shields.io/badge/Notion-000000?style=flat&logo=Notion&4a154b=white" />
  <br>
  
</div>



## MVP(Minimum Viable Product)

1. 로그인 / 회원가입 / 마이페이지

-   user CRUD
-   JWT 발급과 이메일 인증을 통한 로그인

2. 병원, 약국 지도 페이지

-   카카오 맵 API를 활용한 병원 위치 조회

3. 사용자 마이페이지

-   진료 예약
-   병원 이용 리뷰 작성

4. 병원 상세 페이지

-   병원측과 환자측 간의 웹소켓을 이용한 실시간 채팅 상담


## 기술적 의사결정
+ 웹프레임워크와 ORM
  + Express(nodejs)
    + 자유도가 높아 팀에게 맞는 라이브러리를 쓰기 좋고 비동기 방식이라 한번에 많은 request를 처리 할 수 있어 서버 부하가 적다
  + sequelize
    + 재사용, 유지보수에 편리하고,  Promise 기반으로 구현되었기 때문에 비동기 로직을 편리하게 작성이 가능하다
+ 배포
  + CI/CD 파이프라인 구축(GitHub Action을 사용하여 AWS EC2 서버 배포)
    + GitHub Action사용하면 GitHub 레포지토리에서 바로 사용할 수 있어서 별도의 CI/CD를 구축할 필요가 없고 AWS EC2 서버에 코드 변경 사항이 감지가 되면 자동으로 배포가 됨으로 개발자가 수동으로 배포하는 불편함을 줄일 수 있다

## 트러블 슈팅
  #### 문제1: 이미지 다중 업로드시 기업 비용 부담 발생 이슈
  + 방법1
    + 프론트단에서 받은 파일을 서버에서 압축해서 외부 클라우드 스토리지 업로드 하는 방법
      + 장점: 클라이언트가 압축을 처리하지 않아서 클라이언트는 이용하기 편함. 
      + 단점: 서버에서 압축 처리 및 스토리지 연결 등 여러 상황 및 추가작업이 필요함.
  + 방법2
    + 클라이언트에게 직접 파일을 압축 하도록 권하는 방법
      + 장점: 서버에서 압축을 처리 하지 않아 코드가 상대적으로 간단함 .
      + 단점: 클라이언트가 직접 압축을 하기 때문에 클라이언트 성능에 따라 처리 속도가 달라짐. 또한 압축률에 따라 효과적인 용량 감소를 기대하기 어렵고 이미지 품질에 영향을 줄 수도 있음.
  
  + 해결
    + 위 두 가지 장,단점을 고려해서 파일을 압축하기보다는 한번에 올릴 수 있는 파일을 제한 하기로 했음. 
      + 프론트단에서 이미지 파일을 업로드 할 때 5MB 미만으로 올리라는 제한을 걸기로 함
      + 서버에서 이미지 파일을 5개 이하로만 보내게 셋팅을 함.
  <br>
  
  #### 문제2: 비밀번호 재설정 기능 구현
  + 방법1
    + 생성된 임시비밀번호를 메일로 전송하는 방법
      + 단점
        + 본인 아닌 사용자가 타인 메일로 비밀번호 재설정 메일 전송 요청(임시비밀번호로 변경) 가능, 사용자 불편 초래
        + 메일을 통해 임시비밀번호가 암호화 없이 전송되므로 메일 관리상 보안 취약 가능성 / 사용자가 임시비밀번호를 변경하지 않을 경우 보안 취약 가능성
      
  + 방법2
    + 메일로 비밀번호 재설정 페이지 링크를 전송하는 방법
      + 2-1) 양방향 암호화를 통한 구현
        + userId를 jwt로 암호화하여 메일로 전송
        + 사용자가 jwt, 이메일, 변경될 비밀번호 입력
        + 서버에서 jwt 복호화, jwt의 userId와 email로 조회한 유저의 userId 일치 확인
        + 비밀번호 변경
          + 언제 사용자가 비밀번호 재설정을 요청했는지 기록하고 통제할 수 없음
      + 2-2) 무작위 식별자를 발급하여 db와 대조하는 방법
        + 식별자 생성, db에 userId와 관련지어 저장, 메일로 식별자 전송
        + 사용자가 식별자, 변경될 비밀번호 입력
        + 사용자가 제공한 식별자가 db에서 조회될 경우 비밀번호 변경
          + 사용자의 요청에 대한 기록이 가능하므로 유효시간 설정, 사용자 분쟁 조정 등 기능 시행이 통제가능함
  + 해결
    + 2-2) 방법인 무작위 식별자를 발급하여 db와 대조하는 방향으로 결정함


  #### 문제3: 화면 좌측 하단 좌표와 우측 상단 좌표 기준 내에 있는 병원을 가져오는 방법
  + 방법1
    + DB에 있는 병원들의 주소를 좌표 형태로 바꿔주는 api를 사용해서 마커를 찍어주는 방법
      + 지도에 마커를 찍기 전에 거쳐야 하는 api가 있기 때문에 많은 양에 데이터를 처리할 때 비교적 효율적이지 못할 것 같다
  + 방법2
    + 좌표를 DB에 저장해 마커를 불러오기
      + db index를 이용하여 효율 향상시킴
        + 데이터 중복도가 낮은 컬럼을 JOIN이나 WHERE 또는 ORDER BY를 자주 사용하게 되는데 db index 조회를 통해 속도나 그에 따른 성능 향상을 기대할 수 있다.
  + 해결
    + 좌표를 DB에 저장하는 방법으로 결정함 / 테스트를 통해 인덱스 추가하는 방식은 범위를 사용할 때 비효율적인 걸 알 게 되었다. 그리고 between을 사용해서 가져오는 것보다 부등호를 이용해서 가져오면 CPU cycle을 줄일 수 있다는 것을 알 게 되어 적용하였다.
    
    
    	+ 테스트 환경
		+![테스트 환경](https://user-images.githubusercontent.com/118159400/227681656-29e2ef17-e6de-4176-9ee6-8423e58b6f72.png)
	+ 인덱스를 사용하였을 때
		+![2023 03 20  index 효율](https://user-images.githubusercontent.com/118159400/227681690-5901ae4b-0d3a-44d3-baaf-a46a8229e32f.png)
	+ 인덱스 X (between)	
		+![2023 03 20  index 효율 인덱스 X](https://user-images.githubusercontent.com/118159400/227681709-c03bd1e4-fe58-4329-8bfd-fe5b852d5dd5.png)
	+ 인덱스 X (부등호)
		+![2023 03 20  index 효율 인덱스 X between 말구 부등호](https://user-images.githubusercontent.com/118159400/227681724-9d5ffb8a-47ea-4ccc-bb5b-868f60ecbfb3.png)
		
	+ 테스트 결과
		+ 인덱스를 사용했을 시와 인덱스 사용하지 않고 between 사진을 비교해보면 평균 시간은 비슷하지만 인덱스 사용한 부분은 최대 시간이 상당히 많이 차이가 나게 된다. between 사진과 부등호 사진을 비교 해보면 최대 시간은 크게 차이가 나지 않지만 평균 시간이 많이 차이가 나는 것을 알 게 되었다. 그래서 인덱스 사용하지 않고 between 대신 부등호를 사용하는 방식으로 수정하게 되었다. 
		
	+ 알 게 된 사실
		+ 인덱스를 사용 할 때에는 JOIN이나 WHERE 또는 ORDER BY에 자주 사용되는 컬럼, 데이터의 중복도가 낮은 컬럼 등에만 사용하고 신중하게 적용해야 한다. DB의 저장공간이 필요로 하기 때문에 무분별한 인덱스 생성은 DB를 더 느리게 만든다. 


