// require('dotenv').config()
export const REACT_APP_API = process.env.REACT_APP_API //endpoint

// Users

export const allUserssEndpoint = REACT_APP_API + 'users/'
export const getUserEndpoint = REACT_APP_API + 'users/login'

//contacts
export const allContactsEndpoint = REACT_APP_API + 'contacts/';
export const addContactsEndpoint = REACT_APP_API + 'contacts/add';
export const delContactsEndpoint = REACT_APP_API + 'contacts/delete/';
export const updContactsEndpoint = REACT_APP_API + 'contacts/update/';

//configs

export const allConfigsEndpoint = REACT_APP_API + 'configs/';
export const updConfigsEndpoint = REACT_APP_API + 'configs/update/';

//groups

export const allGroupsEndpoint = REACT_APP_API + 'categories/';
export const addGroupsEndpoint = REACT_APP_API + 'categories/add';
export const delGroupsEndpoint = REACT_APP_API + 'categories/delete/';
export const updGroupsEndpoint = REACT_APP_API + 'categories/update/';

//messages

export const allMessagesEndpoint = REACT_APP_API + 'messages/';
export const addMessagesEndpoint = REACT_APP_API + 'messages/add';
export const delMessagesEndpoint = REACT_APP_API + 'messages/delete/';
export const updMessagesEndpoint = REACT_APP_API + 'messages/update/';
