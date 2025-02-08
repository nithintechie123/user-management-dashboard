import React, { useState, useEffect } from 'react';
import { FaRegArrowAltCircleLeft,FaRegArrowAltCircleRight } from "react-icons/fa";

import axios from 'axios';
import UserList from "./components/UserList/UserList";
import AddUserForm from "./components/AddUserForm/AddUserForm";
import EditUserForm from "./components/EditUserForm/EditUserForm";


import './App.css';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

const App = () => {
  const [users, setUsers] = useState([]); //users is used to store the list of users
  const [isEditing, setIsEditing] = useState(false);//isEditing is used to check if the user is editing
  const [editingUser, setEditingUser] = useState(null);//editingUser is used to edit the user
  const [newUser, setNewUser] = useState({ name: '', email: '', department: '' });//new user is used to add a new user
  const [currentPage,setCurrentPage] = useState(1);

  //pagination
  const usersPerPage=4;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalUsers = users.length;
  const totalPages = Math.ceil(totalUsers / usersPerPage);

  //fetching the users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(API_URL);
        setUsers(response.data);
      } catch (error) {
        alert('Error fetching users. Please try again later.');
      }
    };
    fetchUsers();
  }, []);

  //handleInputChange is used to handle the input change
  const handleInputChange = (e, isEdit = false) => {
    const { name, value } = e.target;
    if (isEdit) {
      setEditingUser({ ...editingUser, [name]: value });
    } else {
      setNewUser({ ...newUser, [name]: value });
    }
  };

  const addUser = async () => {
    try {
      const response = await axios.post(API_URL, newUser);
      setUsers([...users, response.data]);
      setNewUser({ name: '', email: '', department: '' });
    } catch (error) {
      alert('Error adding user. Please try again later.');
    }
  };

  const editUser = async () => {
    try {
      await axios.put(`${API_URL}/${editingUser.id}`, editingUser);
      setUsers(users.map((user) => (user.id === editingUser.id ? editingUser : user)));
      setEditingUser(null);
      setIsEditing(false);
    } catch (error) {
      alert('Error updating user. Please try again later.');
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      alert('Error deleting user. Please try again later.');
    }
  };

  return (
    <div className="app-container">
      <h1>User Management Dashboard</h1>
      <div className='add-user-user-list-container'>
        <AddUserForm 
        newUser={newUser} 
        onChange={handleInputChange} 
        onSubmit={addUser} />
        <UserList 
        users={currentUsers} 
        onEdit={(user) => { setEditingUser(user); setIsEditing(true); }} 
        onDelete={deleteUser} />
         {isEditing && (
        <EditUserForm 
          editingUser={editingUser} 
          onChange={handleInputChange} 
          onSubmit={editUser}
          className='edit-user-form'
        />
      )}
      </div>
      <div className='pagination-container'>
        <button className='pagination-buttons' 
                onClick={() => setCurrentPage(currentPage - 1)} 
                disabled={currentPage === 1}>
          <FaRegArrowAltCircleLeft/>
        </button>
        <p className='current-page-num'>{currentPage}</p>
        <button className='pagination-buttons' 
                onClick={() => setCurrentPage(currentPage + 1)} 
                disabled={currentPage === totalPages}>
          <FaRegArrowAltCircleRight/>
        </button>
      </div>
      
    </div>
  );
};

export default App;