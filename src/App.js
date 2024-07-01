import React, { useState, useEffect } from 'react';
import './App.css';
import { EmployeeData } from './EmployeeData';

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [id, setId] = useState('0');
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    setData(EmployeeData);
  }, []);

  const handleEdit = (id) => {
    const dt = data.filter(item => item.id === id);
    if (dt !== undefined) {
      setIsUpdate(true);
      setId(id);
      setName(dt[0].firstName);
      setEmail(dt[0].email);
    }
  };

  const handleDelete = (id) => {
    if (id > 0) {
      if (window.confirm("Are you sure you want to delete this item?")) {
        const dt = data.filter(item => item.id !== id);
        setData(dt);
      }
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    let error = '';

    if (name === '') error += 'Name is required';
    if (email === '') error += 'Email is required';

    if (error) {
      // handle error, e.g., display error message
      return;
    }

    const dt = [...data];
    const newObject = {
      id: EmployeeData.length + 1,
      name: name,
      email: email,
    };
    dt.push(newObject);
    setData(dt);
  };

  const handleUpdate = () => {
    const index = data.map((item, index) => {
      return item.id;
    }).indexOf(id);

    const dt = [...data];
    dt[index].name = name;
    dt[index].email = email;

    setData(dt);
    handleClear();
  };

  const handleClear = () => {
    setId(0);
    setName('');
    setEmail('');
    setIsUpdate(false);
  };

  return (
    <div className="App">
      <div className="form-container">
        <div>
          <label>Name:</label>
          <input type='text' placeholder='Enter Name' onChange={(e) => setName(e.target.value)} value={name} />
        </div>
        <div>
          <label>Email:</label>
          <input type='text' placeholder='Enter email' onChange={(e) => setEmail(e.target.value)} value={email} />
        </div>
        <div>
          {!isUpdate ? (
            <button className='btn btn-primary' onClick={(e) => handleSave(e)}>Save</button>
          ) : (
            <button className='btn btn-primary' onClick={(e) => handleUpdate()}>Update</button>
          )}
          <button className='btn btn-danger' onClick={(e) => handleClear()}>Clear</button>
        </div>
      </div>
      <table className='table'>
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>
                <button className='btn btn-primary' onClick={() => handleEdit(item.id)}>Update</button>&nbsp;
                <button className='btn btn-danger' onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
