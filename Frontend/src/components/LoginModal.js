import React, { useState } from "react";
import Modal from "react-modal";

const LoginModal = ({ isOpen, onRequestClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Check if the username and password are correct 
    if (username === "admin" && password === "admin") {
      // Handle successful login,
      console.log("Login successful");
      onRequestClose();
    } else {
      // Handle unsuccessful login
      console.log("Login failed");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Login Modal"
    >
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </Modal>
  );
};

export default LoginModal;
