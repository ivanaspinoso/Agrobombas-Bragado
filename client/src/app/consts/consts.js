// require('dotenv').config()
export const REACT_APP_API = process.env.REACT_APP_API //endpoint
export const REACT_APP_AUTHOR = process.env.REACT_APP_AUTHOR //endpoint
export const REACT_APP_CLOUDINARY_NAME = process.env.REACT_APP_CLOUDINARY_NAME
export const devornot = Boolean(process.env.REACT_APP_PRODUCTION)

// Users

export const allUsersEndpoint = REACT_APP_API + 'users/nodevs'
export const getUserEndpoint = REACT_APP_API + 'users/login'
export const addUserEndpoint = REACT_APP_API + 'users/add'
export const getQRUserEndpoint = REACT_APP_API + 'users/qrcode'
export const updUserssEndpoint = REACT_APP_API + 'users/update/';
export const updadmUserssEndpoint = REACT_APP_API + 'users/updateadm/';
export const delUsersEndpoint = REACT_APP_API + 'users/delete/';


//contacts
export const allContactsEndpoint = REACT_APP_API + 'contacts/';
export const userContactsEndpoint = REACT_APP_API + 'contacts/byuser/'
export const addContactsEndpoint = REACT_APP_API + 'contacts/add';
export const delContactsEndpoint = REACT_APP_API + 'contacts/delete/';
export const updContactsEndpoint = REACT_APP_API + 'contacts/update/';
export const byidContactsEndpoint = REACT_APP_API + 'contacts/byid/';

//configs

export const allConfigsEndpoint = REACT_APP_API + 'configs/';
export const addConfigsEndpoint = REACT_APP_API + 'configs/add/';
export const updConfigsEndpoint = REACT_APP_API + 'configs/update/';
export const usrConfigsEndpoint = REACT_APP_API + 'configs/byuser/';

//groups

export const allGroupsEndpoint = REACT_APP_API + 'suppliers';
export const userGroupsEndpoint = REACT_APP_API + 'categories/byuser/'
export const addGroupsEndpoint = REACT_APP_API + 'suppliers/add';
export const delGroupsEndpoint = REACT_APP_API + 'suppliers/delete/';
export const updGroupsEndpoint = REACT_APP_API + 'suppliers/update/';

//customers
export const allCustomersEndpoint = REACT_APP_API + 'customers';
export const addCustomerEndpoint = REACT_APP_API + 'customers/add';
export const updateCustomerEndpoint = REACT_APP_API + 'customers/update/';
export const deleteCustomerEndpoint = REACT_APP_API + 'customers/delete/';


//products

export const allProductsEndpoint = REACT_APP_API + 'products';
export const addProductsEndpoint = REACT_APP_API + 'products/add';
export const updateProductsEndpoint = REACT_APP_API + 'products/update/';
export const deleteProductsEndpoint = REACT_APP_API + 'products/delete/';
export const allProductsWebEndpoint = REACT_APP_API + 'products/web/';


//messages

export const allMessagesEndpoint = REACT_APP_API + 'messages/';
export const userMessagesEndpoint = REACT_APP_API + 'messages/byuser/'
export const addMessagesEndpoint = REACT_APP_API + 'messages/add';
export const delMessagesEndpoint = REACT_APP_API + 'messages/delete/';
export const updMessagesEndpoint = REACT_APP_API + 'messages/update/';
export const resMessagesEndpoint = REACT_APP_API + 'messages/result/';
export const senMessagesEndpoint = REACT_APP_API + 'messages/sended/';
export const queMessagesEndpoint = REACT_APP_API + 'messages/queue/';

// Families
export const allFamiliesEndpoint = REACT_APP_API + 'families';
export const addFamilyEndpoint = REACT_APP_API + 'families/add';
export const delFamilyEndpoint = REACT_APP_API + 'families/delete/';
export const updateFamilyEndpoint = REACT_APP_API + 'families/update';

// Company

export const allCompanysEndpoint = REACT_APP_API + 'ccompany/';
export const addCompanysEndpoint = REACT_APP_API + 'company/add/';
export const updCompanysEndpoint = REACT_APP_API + 'company/update/';
export const usrCompanysEndpoint = REACT_APP_API + 'company/byuser/';
export const getCompanysEndpoint = REACT_APP_API + 'company/';

// Sales (Ventas)
export const allSalesEndpoint = REACT_APP_API + 'sales';        
export const addSalesEndpoint = REACT_APP_API + 'sales/add';     
// export const updateSalesEndpoint = REACT_APP_API + 'sales/update/'; 
export const deleteSalesEndpoint = REACT_APP_API + 'sales/delete/'; 

//

//cashflows
export const allCashflowEndpoint = REACT_APP_API + 'cashflows';
export const addCashflowEndpoint = REACT_APP_API + 'cashflows/add';
export const updCashflowEndpoint = REACT_APP_API + 'cashflows/update/';
export const delCashflowEndpoint = REACT_APP_API + 'cashflows/delete/';
export const salCashflowEndpoint = REACT_APP_API + 'cashflows/saldo';

// caccounts
export const allCaccountEndpoint = REACT_APP_API + 'caccounts';
export const cusCaccountEndpoint = REACT_APP_API + 'caccounts/bycustomer/';
export const addCaccountEndpoint = REACT_APP_API + 'caccounts/add';
export const updCaccountEndpoint = REACT_APP_API + 'caccounts/update/';
export const delCaccountEndpoint = REACT_APP_API + 'caccounts/delete/';
export const salCaccountEndpoint = REACT_APP_API + 'caccounts/saldobycusto/';

//buys
export const allBuysEndpoint = REACT_APP_API + 'buys';
export const addBuysEndpoint = REACT_APP_API + 'buys/add';
export const updBuysEndpoint = REACT_APP_API + 'buys/update/';
export const delBuysEndpoint = REACT_APP_API + 'buys/delete/';
export const salBuysEndpoint = REACT_APP_API + 'buys/saldo';
export const byidBuyEndpoint = REACT_APP_API + 'buys/byid/';
// receipts

export const userReceiptsEndpoint = REACT_APP_API + 'receipts/byuser/'
export const delReceiptsEndpoint = REACT_APP_API + 'receipts/delete/';

// orderLines
export const allOrderLineEndpoint = REACT_APP_API + 'orderlines';
export const salOrderlineEndpoint = REACT_APP_API + 'orderlines/bysale/';

// Sorts

export const ASC = 'Contacts-A-Z';
export const DES = 'Contacts-Z-A';