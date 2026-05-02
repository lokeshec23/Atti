from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from app.db.mongodb import get_database
from app.models.user import UserCreate, UserResponse, Token
from app.core.security import get_password_hash, verify_password, create_access_token
from datetime import datetime

router = APIRouter()

@router.post("/register", response_model=UserResponse)
async def register(user_in: UserCreate, db = Depends(get_database)):
    if await db["users"].find_one({"email": user_in.email}):
        raise HTTPException(status_code=400, detail="Email already registered")
        
    hashed_password = get_password_hash(user_in.password)
    user_doc = {
        "email": user_in.email,
        "full_name": user_in.full_name,
        "hashed_password": hashed_password,
        "created_at": datetime.utcnow()
    }
    result = await db["users"].insert_one(user_doc)
    user_doc["id"] = str(result.inserted_id)
    return user_doc

@router.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db = Depends(get_database)):
    user = await db["users"].find_one({"email": form_data.username})
    if not user or not verify_password(form_data.password, user["hashed_password"]):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
        
    access_token = create_access_token(subject=str(user["_id"]))
    return {"access_token": access_token, "token_type": "bearer"}
