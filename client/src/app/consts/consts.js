// require('dotenv').config()
export const REACT_APP_API = process.env.REACT_APP_API //endpoint


//contacts
export const allContactsEndpoint = REACT_APP_API + 'contacts/';
export const addContactsEndpoint = REACT_APP_API + 'contacts/add';
export const delContactsEndpoint = REACT_APP_API + 'contacts/delete/';
export const updContactsEndpoint = REACT_APP_API + 'contacts/update/';

//messages

export const categoriesEndpoint= REACT_APP_API + 'categories/';

// configs y users

export const usersEndpoint= REACT_APP_API + 'users/';
export const configByIdEndpoint = REACT_APP_API + 'configs/';
