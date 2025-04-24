import React from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import ContactsView from "../features/contacts/ContactsView";
import Footer from "../layouts/Footer";
import Navbar from "../layouts/Navbar";
import Error from "../pages/Error";
import AddContact from "../features/contacts/AddContact";
import Main from "../Components/Main";
import EditContact from "../features/contacts/EditContact";
import EditConfig from "../features/config/EditConfig";
// import ConfigsView from "../features/config/ConfigsView";
import GroupsView from "../features/groups/GroupsView";
import AddGroup from "../features/groups/AddGroup";
import EditGroup from "../features/groups/EditGroup";
// import MessagesView from "../features/messages/MessagesView";
// import Next from "../pages/Next";
import CashflowView from '../features/Caja/CashflowView.jsx'
import Next from "../pages/Next.jsx";
// import AddMessage from "../features/messages/AddMessage";
import LogIn from "../Components/LogIn";
import Register from "../Components/Register";
import UsersView from "../features/users/UsersView";
import EditUser from "../features/users/EditUser";
// import QueuedView from "../features/messages/QueueView";
// import SendedView from "../features/messages/SendedView";
// import ReceiptsView from "../features/receipts/ReceiptsView";
import EditMessage from "../features/messages/EditMessage";
import FamiliesView from "../features/families/FamiliesView";
import AddFamily from "../features/families/AddFamilies";
import EditFamily from "../features/families/EditFamilies";
import CompanysView from "../features/company/CompanysView";
import EditCompany from "../features/company/EditCompany";
import CustomersView from "../features/customers/CustomersView";
// import EditMessages from "../features/messages/EditMessage";
import EditCustomers from "../features/customers/EditCustomers";
import ProductsView from "../features/products/ProductsView";
import AddProduct from "../features/products/AddProducts";
// import EditCustomers from "../features/customers/EditCustomers";
import AddCustomers from "../features/customers/AddCustomers";
import EditProduct from "../features/products/EditProduct";
import Home from "../Components/Main/Home.jsx";
import AddCashflow from "../features/Caja/AddCashflow.jsx";
import EditCashflow from "../features/Caja/EditCashflow.jsx";
import SalesView from "../features/Sales/SalesView.jsx";
import AddSales from "../features/Sales/AddSales.jsx";
import CaccountsView from "../features/Caccounts/CaccountsView.jsx";
import SaleEdit from "../features/Sales/EditSale.jsx";
import AddCaccount from "../features/Caccounts/AddCaccount.jsx";
import EditCaccount from "../features/Caccounts/EditCaccount.jsx";
import PrintSale from "../features/Sales/PrintSales.jsx";
// import SalePrint from "../features/Sales/SalePrint.jsx";
import BuysView from "../features/Buys/BuysView.jsx";
import AddBuy from "../features/Buys/AddBuy.jsx";
import EditBuy from "../features/Buys/EditBuy.jsx";
import RptCaja from "../Components/Reports/RptCaja.jsx";
// import rptCaja from "../Components/Reports/rptCaja.jsx";
import BulkPriceUpdate from "../features/products/BulkPriceUpdate";


const Layout = ({ children }) => {
  return (
    <div className="h-screen flex flex-col inherit flex-grow">
      <Navbar />
      {children}
      <div className=" bottom-0 w-full"><Footer /></div>
    </div>
  );
};

const excludedRoutes = ['/'];

const Index = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gestion" element={<Main />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/building" element={<Next />} />
          <Route path="/register" element={<Register />} />

          <Route path="/show-messages" element={<ProductsView />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/edit-product" element={<EditProduct />} />
          <Route path="/bulk-price-update" element={<BulkPriceUpdate />} />

          {/* Rutas para mensajes ? */}
          <Route path="/add-message" element={<AddCustomers />} />
          <Route path="/queue-messages" element={<CustomersView />} />
          <Route path="/edit-customers" element={<EditCustomers />} />

          {/* Rutas para movimientos de caja */}    
          <Route path="/show-cashflows" element={<CashflowView />} />
          <Route path="/add-cashflow" element={<AddCashflow />} />
          <Route path="/edit-cashflow" element={<EditCashflow />} />
          <Route path="/edit-message" element={<EditMessage />} />

          {/* Rutas para grupos? */}
          <Route path="/show-groups" element={<GroupsView />} />
          <Route path="/add-group" element={<AddGroup />} />
          <Route path="/edit-group" element={<EditGroup />} />

          {/* Rutas para rubros */}
          <Route path="/show-families" element={<FamiliesView />} />
          <Route path="/add-families" element={<AddFamily />} />
          <Route path="/edit-families" element={<EditFamily />} />

          {/* Rutas para contactos? */}
          <Route path="/show-contacts" element={<ContactsView />} />
          <Route path="/add-contact" element={<AddContact />} />
          <Route path="/edit-contact" element={<EditContact />} />

          {/* Rutas para ventas */}
          <Route path="/print-sale" element={<PrintSale />} />
          <Route path="/show-configs" element={<SalesView />} />

          
          <Route path="/edit-config" element={<EditConfig />} />
          <Route path="/add-sale" element={<AddSales />} />
          <Route path="/edit-sale" element={<SaleEdit />} />
{/*           <Route path="/print-sale" element={<SalePrint />} /> */}
          
          {/* Rutas para empresa propietaria */}
          <Route path="/show-companys" element={<CompanysView />} />
          <Route path="/edit-company" element={<EditCompany />} />

          {/* Rutas para usuarios */}
          <Route path="/show-users" element={<UsersView />} />
          <Route path="/edit-user" element={<EditUser />} />

          {/* Rutas para cuentas corrientes */}
          <Route path="/show-caccounts" element={<CaccountsView />} />
          <Route path="/add-caccount" element={<AddCaccount />} />
          <Route path="/edit-caccount" element={<EditCaccount />} />

          <Route path="/show-receipts" element={<Next />} />

          {/* Rutas para ventas */}
          <Route path="/show-buys" element={<BuysView />} />
          <Route path="/add-buy" element={<AddBuy />} />
          <Route path="/edit-buy" element={<EditBuy />} />

          {/* Rutas experimental para informes */}
                     {/* Rutas para caja */}
          <Route path="/reportCaja" element={<RptCaja /> } />

          {/* Ruta equivocada muestra Error/en desarrollo */}
          <Route path="*" element={<Error />} />
        </Routes>
      </Layout>
    </BrowserRouter >
  );
};

export default Index;
