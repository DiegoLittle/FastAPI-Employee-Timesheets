import { randomUUID } from 'crypto'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

const Home: NextPage = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [job, setJob] = useState('')

  const [employees, setEmployees] = useState([])
  const [timesheets, setTimesheets] = useState([])
  const [timesheet, setTimesheet] = useState("")
  const [date, setDate] = useState('')

  const [employee, setEmployeeID] = useState('')
  const [hours, setHours] = useState(0)
  const [employeeRecord, setEmployeeRecord] = useState('')

  async function employee_record_by_id() {
    const response = await fetch(`http://localhost:4000/employee?id=${employee}`)
    const data = await response.json()
    console.log(data)
    setEmployeeRecord(data)
  }
  async function add_employee() {
    const response = await fetch('http://localhost:4000/employee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: uuidv4().toString(),
        name: name,
        email: email,
        job: job
      })
    })
    let data = await response.json()
    setEmployees((employees) => [...employees, data])
    console.log(data)
  }
  async function create_timesheet() {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const response = await fetch('http://localhost:4000/timesheet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: uuidv4().toString(),
        employee_id: employee,
        date: new Date().toISOString().split('T')[0],
        hours: hours
      })
    })
    let data = await response.json()
    console.log(data)
  }
  async function list_employees() {
    const response = await fetch("http://localhost:4000/employees")
    let data = await response.json()
    setEmployees(data)
  }
  async function timesheets_for_employee() {
    const response = await fetch("http://localhost:4000/timesheets?id=" + employee)
    let data = await response.json()
    console.log(data)
    setTimesheets(data)
  }
  async function get_timesheet() {
    const response = await fetch("http://localhost:4000/timesheet?employee_id=" + employee + "&date=" + date)
    let data = await response.json()
    if (data) {
      setTimesheet(data)
    }
    else {
      setTimesheet("")
    }


  }

  useEffect(async () => {
    let res = await fetch("http://localhost:4000/employees")
    let data = await res.json()
    setEmployees(data)
  }, [])

  return (
    <div className="flex py-y pl-4">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <div className='flex my-4'>
          <div className='p-3 border rounded-xl ml-4'>
            <div>Create an Employee Record</div>
            <label>Name</label>
            <input onChange={(e) => {
              setName(e.target.value)
            }} className='block bg-gray-100 rounded-lg p-1'></input>
            <button onClick={() => {
              add_employee()
            }} className='bg-blue-500 rounded-xl text-white p-1 mt-3'>Add employee</button>
          </div>
          <div className='p-3 border rounded-xl ml-4'>
            <div>Create a Timesheet</div>
            <label>EmployeeID</label>
            <input onChange={(e) => {
              setEmployeeID(e.target.value)
            }} className='block bg-gray-100 rounded-lg p-1'></input>
            <label>Hours</label>
            <input onChange={(e) => {
              setHours(parseInt(e.target.value))
            }} className='block bg-gray-100 rounded-lg p-1'></input>
            <button onClick={() => {
              create_timesheet()
            }} className='bg-blue-500 rounded-xl text-white p-1 mt-3'>Add timesheet</button>
          </div>
        </div>

        <div className='flex my-4'>
          <div className='p-3 border rounded-xl ml-4'>
            <div>List employee records</div>
            <button  className='bg-blue-500 rounded-xl text-white p-1 mt-3'
            onClick={() => {
              list_employees()
            }}>Submit</button>
            {employees.map((employee) =>
              <div className='shadow p-2 rounded-lg'>
                <div>{employee.id}</div>
                <div>{employee.name}</div>
              </div>
            )}
          </div>
          <div className='p-3 border rounded-xl ml-4'>

            <div >Get Employee Record for Employee ID</div>
            <input onChange={(e) => {
              setEmployeeID(e.target.value)
            }} className='block bg-gray-100 rounded-lg p-1'></input>
            <button className='bg-blue-500 rounded-xl text-white p-1 mt-3'
            onClick={() => {
              employee_record_by_id()
            }}>Submit</button>
            {employeeRecord &&
              <div className='shadow p-2 rounded-lg'>
                <div>{employeeRecord.id}</div>
                <div>{employeeRecord.name}</div>
              </div>
            }
          </div>

        </div>
        <div className='flex my-4'>
          <div className='mx-4 border p-2 rounded-xl'>

            <div >List Timesheets for Employee ID</div>
            <input onChange={(e) => {
              setEmployeeID(e.target.value)
            }} className='block bg-gray-100 rounded-lg p-1'></input>
            <button className='bg-blue-500 rounded-xl text-white p-1 mt-3'
            onClick={() => {
              timesheets_for_employee()
            }}>Submit</button>
            {timesheets.map((timesheet) =>
              <div className='shadow p-2 rounded-lg'>
                <div>Employee ID: {timesheet.employee_id}</div>
                <div>Date: {timesheet.date}</div>
                <div>Hours: {timesheet.hours}</div>
              </div>
            )}
          </div>

          <div className='mx-4 border p-2 rounded-xl'>

            <div >Get Timesheet for Employee ID and Date</div>
            <label>EmployeeID</label>
            <input onChange={(e) => {
              setEmployeeID(e.target.value)
            }} className='block bg-gray-100 rounded-lg p-1'></input>
            <label>Date</label>
            <input type="date" onChange={(e) => {
              console.log(e.target.value)
              setDate(e.target.value)
            }} className='block bg-gray-100 rounded-lg p-1'></input>

            <button className='bg-blue-500 rounded-xl text-white p-1 mt-3' onClick={() => {
              get_timesheet()
            }}>Submit</button>
            {timesheet &&
              <div className='shadow p-2 rounded-lg'>
                <div>Employee ID: {timesheet.employee_id}</div>
                <div>Date: {timesheet.date}</div>
                <div>Hours: {timesheet.hours}</div>
              </div>
            }
          </div>
        </div>


      </main>
    </div>
  )
}

export default Home
