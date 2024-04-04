import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fetchRecords } from '../../features/students/recordsSlices';
const Students = () => {
  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const dispatch = useDispatch();
  const [error,setError]=useState('')

  const addStudentHandler = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
  
    // Display confirmation dialog

    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name)) {
      setError('Name must contain only letters');

      return;
    }
    const rollNoRegex = /^\d+$/;
    if (!rollNoRegex.test(rollNo)) {
      setError('Roll number must contain only numbers');
      return;
    }
    const confirmed = window.confirm('Are you sure you want to add?');
    if (!confirmed) {
      return; 
    }
  
  
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/student/addstudent/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          rollNo
        })
      });
      const data = await response.json();
      if (response.ok) {

        setSuccessMessage('Student added successfully');
        setName('');
        setRollNo('');
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
        dispatch(fetchRecords())
      } else {
        throw new Error(data.error || 'Failed to add student');
      }
    } catch (error) {
      setError(error.message);
      setTimeout(() => {
        setError('');
      }, 2000); 
    }
  }
  


  
  return (
    <div className='flex h-auto md:w-full md:h-full content-center '>
    <div className='flex w-10/12 h-10/12 shadow-md rounded-2xl bg-green  m-auto'>
    <div className='hidden md:flex w-6/12 h-full bg-purple-100 rounded-xl'>
      <img src="/Untitled_design-removebg-preview.png" className='mx-auto' alt="Student Image" />
    </div>
  
      <div className="flex md:min-h-full w-6/12 flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error:</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          )}
          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Success:</strong>
              <span className="block sm:inline"> {successMessage}</span>
            </div>
          )}
          <form className="space-y-6" onSubmit={addStudentHandler}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Name Of Student
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="name"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="rollNo" className="block text-sm font-medium leading-6 text-gray-900">
                  Roll no of Student
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="rollNo"
                  name="rollNo"
                  type="rollNo"
                  autoComplete="rollNo"
                  required
                  value={rollNo}
                  onChange={(e) => setRollNo(e.target.value)}
                  className="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className='w-full m-auto content-center'>
              <button
                type="submit"
                className="flex w-1/3 justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Students;
