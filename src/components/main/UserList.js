import React, { useState, useEffect } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editMode, setEditMode] = useState(null);

  useEffect(() => {
    // Fetching the JSON file
    fetch("./data.json")
      .then((response) => response.json())
      
      .catch((error) => console.error('Error fetching users:', error));
  }, []);
  console.log("users",users)

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const currentDate = new Date();
    return currentDate.getFullYear() - birthDate.getFullYear();
  };

  const handleAccordionClick = (index) => {
    if (editMode !== null) return;

    setEditMode(null);
    setUsers((prevUsers) =>
      prevUsers.map((user, i) => ({
        ...user,
        isOpen: i === index ? !user.isOpen : false,
      }))
    );
  };

  const handleEditClick = (index) => {
    setEditMode(index);
  };

  const handleSaveClick = (index) => {
    // Implement save functionality
    // Validate changes and update user details
    setEditMode(null);
  };

  const handleCancelClick = () => {
    // Implement cancel functionality
    setEditMode(null);
  };

  const handleDeleteClick = (index) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      // Implement delete functionality
      setUsers((prevUsers) => prevUsers.filter((user, i) => i !== index));
      setEditMode(null);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by celebrity name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {users
          .filter((user) => user.first.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((user, index) => (
            <li key={index}>
              <div onClick={() => handleAccordionClick(index)}>
                {user.name} ({calculateAge(user.dob)} years old) {user.isOpen ? '-' : '+'}
              </div>
              {user.isOpen && (
                <div>
                  <label>
                    Gender:
                    <select disabled={editMode !== null}>
                      {/* Dropdown options */}
                    </select>
                  </label>
                  <label>
                    Country:
                    <input type="text" disabled={editMode !== null} />
                  </label>
                  <label>
                    Description:
                    <textarea disabled={editMode !== null} />
                  </label>
                  {editMode === index ? (
                    <>
                      <button onClick={() => handleSaveClick(index)} >
                        Save
                      </button>
                      <button onClick={handleCancelClick}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEditClick(index)}>Edit</button>
                      <button onClick={() => handleDeleteClick(index)}>Delete</button>
                    </>
                  )}
                </div>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default UserList;
