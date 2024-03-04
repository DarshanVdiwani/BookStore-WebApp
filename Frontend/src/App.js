import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import AddBook from "./components/AddBook";
import Books from "./components/Book/Books";
import About from "./components/About";
import BookDetail from "./components/Book/BookDetail";
import Cart from "./components/cart";
import Modal from 'react-modal';
import './App.css'; // Import your CSS for styling
Modal.setAppElement('#root');

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'username') {
      setUser(value);
    }

    if (name === 'password') {
      setPwd(value);
    }
  };

  const handleAdmin = () => {
    if (user === 'admin' && pwd === 'admin') {
      closeModal();
    }
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Login Modal"
        className="custom-modal"
        overlayClassName="custom-modal-overlay"
      >
        <div className="modal-content">
          <h2 className="modal-title">Admin Login</h2>
          <br/>

          <div className="modal-input-container">
            <div className="modal-input-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={user}
                onChange={handleChange}
                className="modal-input"
                required
              />
            </div>
            <br/>
            <div className="modal-input-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={pwd}
                onChange={handleChange}
                className="modal-input"
                required
              />
            </div>
          </div>
          <button className="modal-button right" onClick={handleAdmin}>
            Login
          </button>
        </div>
      </Modal>
      <React.Fragment>
        <header>
          <Header />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddBook />} />
            <Route path="/books" element={<Books />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/books/:id" element={<BookDetail />} />
          </Routes>
        </main>
      </React.Fragment>
    </div>
  );
}

export default App;
