import React from 'react';
import './AddUserForm.css';

const AddUserForm = ({ newUser, onChange, onSubmit }) => {
  return (
    <div className="add-user-form">
      <h2>Add User</h2>
      <div className="form-fields">
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={newUser.name}
          onChange={onChange}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={newUser.email}
          onChange={onChange}
        />
        <input
          type="text"
          placeholder="Department"
          name="department"
          value={newUser.department}
          onChange={onChange}
        />
      </div>
      <button onClick={onSubmit}>Add User</button>
    </div>
  );
};

export default AddUserForm;