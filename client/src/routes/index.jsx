import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddBook from "../features/books/AddBook";
import BooksView from "../features/books/BooksView";
import ContactsView from "../features/contacts/ContactsView";
import EditBook from "../features/books/EditBook";
import Footer from "../layouts/Footer";
import Navbar from "../layouts/Navbar";
import Error from "../pages/Error";
// import Home from "../pages/Home";
import AddContact from "../features/contacts/AddContact";
import Main from "../Components/Main";
import EditContact from "../features/contacts/EditContact";

const Index = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/show-books" element={<BooksView />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/edit-book" element={<EditBook />} />
        <Route path="*" element={<Error />} />
        <Route path="/show-contacts" element={<ContactsView />} />
        <Route path="/add-contact" element={<AddContact />} />
        <Route path="/edit-contact" element={<EditContact />} />
      </Routes>
       <Footer />
    </BrowserRouter>
  );
};

export default Index;