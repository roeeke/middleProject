import React, { createContext, useState } from 'react';

export const UserContext = createContext({
  users: [],
  setUsers: () => {},
  createNewUser: () => {},
  login: () => {},
});

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );

  const createNewUser = (newUser) => {
    setUsers((prev) => {
      if (prev.some((user) => user.username === newUser.username)) {
        alert(`User ${newUser.username} already exists`)
        return prev;
      }
      alert(`User ${newUser.username} has successfully been created`)
      localStorage.setItem("users", JSON.stringify([...prev, newUser]));
      return [...prev, newUser];
    });
  };

  const login = ({ username, password }) => {
    const userExists = users.find((user) => user.username === username);
    if (!userExists || userExists.password !== password) {
      alert("Wrong credentials!");
      return false;
    }
  
    return true; 
  };

  return (
    <UserContext.Provider value={{ users, setUsers, createNewUser, login }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;