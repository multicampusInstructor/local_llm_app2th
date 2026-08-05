import uvicorn
from typing import Optional

from fastapi import FastAPI
from pydantic import BaseModel, HttpUrl

app = FastAPI()

class UserCreate(BaseModel):
    name: str
    password: str
    avatar_url: Optional[HttpUrl] = None

class UserResponse(BaseModel):
    name: str
    avatar_url: Optional[HttpUrl] = None


@app.get("/")
def read_root():
    word = "안녕 fastapi"
    # 비즈니스 로직 처리
    # DB 조회
    # AI와 통신한 결과
    return {"Hello": word}

# @app.post("/user_info")
# def create_user(user: UserCreate):
#     return user



# # 요청 API
# @app.post("/user_info")
# def createUser(user: UserCreate):
#     # 비즈니스 로직처리
#     return user


# 응답 데이터 모델
@app.get("/user_info/me", response_model=UserResponse)
def getUser(user: UserCreate):
    return user

# 요청 및 응답 API
@app.post("/user_info", response_model=UserResponse)
def get_user(user: UserCreate):
    # 비즈니스 로직 처리
    # DB 저장 처리
    print("user: ", user)
    user_info = UserResponse(
        name=user.name,
        avatar_url=user.avatar_url
    )
    # Pydantic model 객체를 JSON으로 직렬화해서 응답함.
    return user_info


   



def main():
    uvicorn.run(
        "main:app",      # 파일명이 main.py인 경우
        host="0.0.0.0",
        port=8000,
        reload=True
    )


if __name__ == "__main__":
    main()