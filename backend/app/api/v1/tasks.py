from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from bson import ObjectId
from app.db.mongodb import get_database
from app.api.deps import get_current_user
from app.models.task import TaskCreate, TaskResponse
from datetime import datetime

router = APIRouter()

@router.post("/", response_model=TaskResponse)
async def create_task(
    task_in: TaskCreate,
    current_user: dict = Depends(get_current_user),
    db = Depends(get_database)
):
    # Verify user is part of the workspace
    workspace = await db["workspaces"].find_one({
        "_id": ObjectId(task_in.workspace_id),
        "members.user_id": current_user["id"]
    })
    if not workspace:
        raise HTTPException(status_code=403, detail="Not authorized to create tasks in this workspace")

    task_doc = task_in.model_dump()
    task_doc["creator_id"] = current_user["id"]
    task_doc["created_at"] = datetime.utcnow()
    task_doc["updated_at"] = datetime.utcnow()
    
    result = await db["tasks"].insert_one(task_doc)
    task_doc["id"] = str(result.inserted_id)
    return task_doc

@router.get("/workspace/{workspace_id}", response_model=List[TaskResponse])
async def get_tasks(
    workspace_id: str,
    current_user: dict = Depends(get_current_user),
    db = Depends(get_database)
):
    # Verify access
    workspace = await db["workspaces"].find_one({
        "_id": ObjectId(workspace_id),
        "members.user_id": current_user["id"]
    })
    if not workspace:
        raise HTTPException(status_code=403, detail="Not authorized to view this workspace")
        
    cursor = db["tasks"].find({"workspace_id": workspace_id})
    tasks = await cursor.to_list(length=1000)
    for t in tasks:
        t["id"] = str(t["_id"])
    return tasks
