import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from "./components/UserList/UserList";
import AddUserForm from "./components/AddUserForm/AddUserForm";
import EditUserForm from "./components/EditUserForm/EditUserForm";
import './App.css';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

const App = () => {
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({ name: '', email: '', department: '' });

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
        users={users} 
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
     
    </div>
  );
};

export default App;