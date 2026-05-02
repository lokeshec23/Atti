from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class WorkspaceMember(BaseModel):
    user_id: str
    role: str = "member" # 'admin' or 'member'

class WorkspaceBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)

class WorkspaceCreate(WorkspaceBase):
    pass

class WorkspaceInDB(WorkspaceBase):
    id: str
    owner_id: str
    members: List[WorkspaceMember] = []
    created_at: datetime

class WorkspaceResponse(WorkspaceInDB):
    pass
