import { Button, Typography, Box } from "@mui/material";
import React,{useEffect,useState} from "react";
import { Link } from "react-router-dom";
import "./Book/Book.css";
import axios from "axios";
import BookShow from "./Book/BookShow";
const URL = "http://localhost:5000/books";
const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};
const Home = () => {
  const [books, setBooks] = useState();
  useEffect(() => {
    fetchHandler().then((data) => setBooks(data.books));
  }, []);
  return (
    <div>
      <ul>
        {books &&
          books.map((book, i) => (
            <li key={i}>
              <BookShow book={book} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Home;
