import React from 'react';
import './UserList.css';

const UserList = ({ users, onEdit, onDelete }) => {
  return (
    <div className="user-list">
      {users.map((user) => (
        <div key={user.id} className="user-card">
          <div className="user-details">
            <p><strong>ID</strong>: {user.id}</p>
            <p><strong>Name</strong>: {user.name}</p>
            <p><strong>Email</strong>: {user.email}</p>
            <p><strong>Department</strong>: {user.department || 'N/A'}</p>
          </div>
          <div className="user-actions">
            <button onClick={() => onEdit(user)} className='edit-button'>Edit</button>
            <button onClick={() => onDelete(user.id)} className="delete-button">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;