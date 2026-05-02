from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from bson import ObjectId
from app.db.mongodb import get_database
from app.api.deps import get_current_user
from app.models.workspace import WorkspaceCreate, WorkspaceResponse
from datetime import datetime

router = APIRouter()

@router.post("/", response_model=WorkspaceResponse)
async def create_workspace(
    workspace_in: WorkspaceCreate,
    current_user: dict = Depends(get_current_user),
    db = Depends(get_database)
):
    workspace_doc = {
        "name": workspace_in.name,
        "owner_id": current_user["id"],
        "members": [{"user_id": current_user["id"], "role": "admin"}],
        "created_at": datetime.utcnow()
    }
    result = await db["workspaces"].insert_one(workspace_doc)
    workspace_doc["id"] = str(result.inserted_id)
    return workspace_doc

@router.get("/", response_model=List[WorkspaceResponse])
async def get_my_workspaces(
    current_user: dict = Depends(get_current_user),
    db = Depends(get_database)
):
    cursor = db["workspaces"].find({"members.user_id": current_user["id"]})
    workspaces = await cursor.to_list(length=100)
    for ws in workspaces:
        ws["id"] = str(ws["_id"])
    return workspaces

@router.get("/{workspace_id}", response_model=WorkspaceResponse)
async def get_workspace(
    workspace_id: str,
    current_user: dict = Depends(get_current_user),
    db = Depends(get_database)
):
    workspace = await db["workspaces"].find_one({
        "_id": ObjectId(workspace_id),
        "members.user_id": current_user["id"]
    })
    if not workspace:
        raise HTTPException(status_code=404, detail="Workspace not found")
    workspace["id"] = str(workspace["_id"])
    return workspace
