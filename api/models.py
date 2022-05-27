from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
import hashlib

from database import Base



class Employee(Base):
    __tablename__ = 'employee'
    id = Column(String, primary_key=True, index=True)
    name = Column(String(50), nullable=False)


class Timesheet(Base):
    __tablename__ = 'timesheet'
    id = Column(String, primary_key=True, index=True)
    employee_id = Column(String, ForeignKey('employee.id'))
    date = Column(String, nullable=False)
    hours = Column(Integer, nullable=False)
    employee = relationship('Employee')





