from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class TaskBase(BaseModel):
    title: str = Field(..., min_length=3, max_length=200)
    description: Optional[str] = None
    status: str = "todo" # 'todo', 'in_progress', 'review', 'done'
    assignee_id: Optional[str] = None
    tags: List[str] = []

class TaskCreate(TaskBase):
    workspace_id: str

class TaskInDB(TaskBase):
    id: str
    workspace_id: str
    creator_id: str
    created_at: datetime
    updated_at: datetime

class TaskResponse(TaskInDB):
    pass
