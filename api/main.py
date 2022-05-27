from typing import List
from fastapi import Depends, FastAPI, HTTPException,Request
from sqlalchemy.orm import Session
import crud, models, schemas
from database import SessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware
import re
from fastapi.staticfiles import StaticFiles



ACCESS_TOKEN_EXPIRE_MINUTES = 30


models.Base.metadata.create_all(bind=engine)
app = FastAPI()
app.mount("/ui", StaticFiles(directory="ui",html=True), name="ui")



origins = "*"

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()



@app.post("/employee")
def create_employee(employee: schemas.Employee, db: Session = Depends(get_db)):
    print(employee)
    return crud.create_employee(db=db, employee=employee)

@app.get("/employee")
def get_employee(id:str,db: Session = Depends(get_db)):
    return crud.get_employee(db=db,id=id)

@app.get("/employees")
def get_employees(db: Session = Depends(get_db)):
    return crud.get_employees(db=db)

@app.post("/timesheet")
def create_timesheet(timesheet:schemas.Timesheet,db: Session = Depends(get_db)):
    return crud.create_timesheet(db=db,timesheet=timesheet)
@app.get("/timesheets")
def create_timesheet(id:str,db: Session = Depends(get_db)):

    return crud.list_timesheets(db=db,id=id)

@app.get("/timesheet")
def get_timesheet(employee_id:str,date:str,db: Session = Depends(get_db)):
    return crud.get_timesheet(db=db,employee_id=employee_id,date=date)


