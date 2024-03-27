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
import Main from "../components/Main";
import EditContact from "../features/contacts/EditContact";
import EditConfig from "../features/config/EditConfig";
import ConfigsView from "../features/config/ConfigsView";
import GroupsView from "../features/groups/GroupsView";
import AddGroup from "../features/groups/AddGroup";
import EditGroup from "../features/groups/EditGroup";
import MessagesView from "../features/messages/MessagesView";
import Next from "../pages/Next";
import AddMessage from "../features/messages/AddMessage";
import LogIn from "../components/LogIn";
import Register from "../components/Register";

const Index = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/building" element={<Next />} />
        <Route path="/register" element={<Register />} />

        <Route path="/show-messages" element={<MessagesView />} />
        <Route path="/add-message" element={<AddMessage />} />
        <Route path="/edit-book" element={<EditBook />} />

        <Route path="/show-groups" element={<GroupsView />} />
        <Route path="/add-group" element={<AddGroup />} />
        <Route path="/edit-group" element={<EditGroup />} />

        <Route path="/show-contacts" element={<ContactsView />} />
        <Route path="/add-contact" element={<AddContact />} />
        <Route path="/edit-contact" element={<EditContact />} />
        
        <Route path="/show-configs" element={<ConfigsView />} />       
        <Route path="/edit-config" element={<EditConfig />} />
        
        <Route path="*" element={<Error />} />
      </Routes>
       <Footer />
    </BrowserRouter>
  );
};

export default Index;