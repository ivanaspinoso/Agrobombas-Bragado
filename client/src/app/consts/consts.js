// require('dotenv').config()
export const REACT_APP_API = process.env.REACT_APP_API //endpoint


//contacts
export const allContactsEndpoint = REACT_APP_API + 'contacts/';
export const addContactsEndpoint = REACT_APP_API + 'contacts/add';
export const delContactsEndpoint = REACT_APP_API + 'contacts/delete/';
export const updContactsEndpoint = REACT_APP_API + 'contacts/update/';

//configs

export const allConfigsEndpoint = REACT_APP_API + 'configs/1';
export const updConfigsEndpoint = REACT_APP_API + 'configs/update/';

//groups
export const allGroupsEndpoint = REACT_APP_API + 'categories/';
export const addGroupsEndpoint = REACT_APP_API + 'categories/add';
export const delGroupsEndpoint = REACT_APP_API + 'categories/delete/';
export const updGroupsEndpoint = REACT_APP_API + 'categories/update/';