from typing import List, Optional
from pydantic import BaseModel


class Employee(BaseModel):
    id: str
    name: str

class Timesheet(BaseModel):
    id: str
    employee_id: str
    date: str
    hours: int