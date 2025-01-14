import { configureStore, combineReducers} from "@reduxjs/toolkit";
import contactsReducer from "../features/contacts/ContactsSlice";
import configsReducer from "../features/config/ConfigSlice"
import groupsReducer from "../features/groups/GroupsSlice"
import familiesReducer from "../features/families/FamiliesSlice"
import messagesReducer from '../features/messages/MessagesSlice'
import usersReducer from '../features/users/usersSlice'
import receiptsReducer from '../features/receipts/receiptsSlice'
import companysReducer from '../features/company/CompanysSlice'
import storage from "redux-persist/lib/storage"
import { persistReducer } from "redux-persist"
import customersReducer from '../features/customers/CustomerSlice'
// import { customersSlice } from "../features/customers/CustomerSlice";
import productsReducer from '../features/products/ProductsSlice'
import cashflowReducer from '../features/Caja/CashflowSlice'
import salesReducer from '../features/Sales/salesSlice'
import caccountsReducer from '../features/Caccounts/CaccountsSlice'
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["contactsReducer", "configsReducer", "groupsReducer", "messagesReducer", "usersReducer", "receiptsReducer", "familiesReducer", "companysReducer","customersReducer"
    ,"productsReducer","cashflowReducer","salesReducer","caccountsReducer"],
}

const rootReducer = combineReducers({
  contactsReducer: contactsReducer,
  configsReducer: configsReducer,
  groupsReducer: groupsReducer,
  messagesReducer: messagesReducer,
  usersReducer: usersReducer,
  receiptsReducer: receiptsReducer,
  familiesReducer: familiesReducer, 
  companysReducer: companysReducer,
  customersReducer:customersReducer,
  productsReducer: productsReducer,
  cashflowReducer: cashflowReducer,
  salesReducer: salesReducer,
  caccountsReducer: caccountsReducer,

  // Nombre que usaremos en useSelector
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  // devTools: true,
});