from sqlalchemy.orm import Session

from datetime import datetime, timedelta
from typing import Optional, OrderedDict
import json

import models, schemas


def create_employee(db:Session, employee:schemas.Employee):
    user = models.Employee(name=employee.name,id=employee.id)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def get_employee(db:Session,id:str):
    return db.query(models.Employee).filter(models.Employee.id==id).first()

def get_employees(db:Session):
    return db.query(models.Employee).all()

def create_timesheet(db:Session,timesheet:schemas.Timesheet):
    timesheet_db = models.Timesheet(id=timesheet.id,employee_id=timesheet.employee_id,date=timesheet.date,hours=timesheet.hours)
    db.add(timesheet_db)
    db.commit()
    db.refresh(timesheet_db)
    return timesheet_db

def list_timesheets(db:Session,id:str):
    return db.query(models.Timesheet).filter(models.Timesheet.employee_id==id).all()

def get_timesheet(db:Session,employee_id:str,date:str):
    return db.query(models.Timesheet).filter(models.Timesheet.employee_id==employee_id,models.Timesheet.date==date).first()
