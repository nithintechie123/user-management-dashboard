import React from 'react';
import './EditUserForm.css';

const EditUserForm = ({ editingUser, onChange, onSubmit }) => {
  return (
    <div className="edit-user-form">
      <h2>Edit User</h2>
      <div className="form-fields">
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={editingUser.name}
          onChange={(e) => onChange(e, true)}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={editingUser.email}
          onChange={(e) => onChange(e, true)}
        />
        <input
          type="text"
          placeholder="Department"
          name="department"
          value={editingUser.department}
          onChange={(e) => onChange(e, true)}
        />
      </div>
      <button onClick={onSubmit}>Update User</button>
    </div>
  );
};

export default EditUserForm;