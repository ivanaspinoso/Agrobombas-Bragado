import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ContactsView from "../features/contacts/ContactsView";
import Footer from "../layouts/Footer";
import Navbar from "../layouts/Navbar";
import Error from "../pages/Error";
import AddContact from "../features/contacts/AddContact";
import Main from "../Components/Main";
import EditContact from "../features/contacts/EditContact";
import EditConfig from "../features/config/EditConfig";
import GroupsView from "../features/groups/GroupsView";
import AddGroup from "../features/groups/AddGroup";
import EditGroup from "../features/groups/EditGroup";
import CashflowView from '../features/Caja/CashflowView.jsx';
import Next from "../pages/Next.jsx";
import LogIn from "../Components/LogIn";
import Register from "../Components/Register";
import UsersView from "../features/users/UsersView";
import EditUser from "../features/users/EditUser";
import EditMessage from "../features/messages/EditMessage";
import FamiliesView from "../features/families/FamiliesView";
import AddFamily from "../features/families/AddFamilies";
import EditFamily from "../features/families/EditFamilies";
import CompanysView from "../features/company/CompanysView";
import EditCompany from "../features/company/EditCompany";
import CustomersView from "../features/customers/CustomersView";
import EditCustomers from "../features/customers/EditCustomers";
import ProductsView from "../features/products/ProductsView";
import AddProduct from "../features/products/AddProducts";
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
import BuysView from "../features/Buys/BuysView.jsx";
import AddBuy from "../features/Buys/AddBuy.jsx";
import EditBuy from "../features/Buys/EditBuy.jsx";
import RptCaja from "../Components/Reports/RptCaja.jsx";
import BulkPriceUpdate from "../features/products/BulkPriceUpdate";
import SalesReport from "../features/Sales/SalesReport.jsx";
import BuysReport from "../features/Buys/BuysReport";

const Layout = ({ children }) => {
  return (
    <div className="h-screen flex flex-col inherit flex-grow">
      <Navbar />
      {children}
      <div className="bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/gestion" element={<Main />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/building" element={<Next />} />

          {/* Administración */}
          {/* Productos */}
          <Route path="/gestion/show-messages" element={<ProductsView />} />
          <Route path="/gestion/add-product" element={<AddProduct />} />
          <Route path="/gestion/edit-product" element={<EditProduct />} />
          <Route path="/gestion/bulk-price-update" element={<BulkPriceUpdate />} />

          {/* Mensajes */}
          <Route path="/gestion/add-message" element={<AddCustomers />} />
          <Route path="/gestion/queue-messages" element={<CustomersView />} />
          <Route path="/gestion/edit-customers" element={<EditCustomers />} />
          <Route path="/gestion/edit-message" element={<EditMessage />} />

          {/* Caja */}
          <Route path="/gestion/show-cashflows" element={<CashflowView />} />
          <Route path="/gestion/add-cashflow" element={<AddCashflow />} />
          <Route path="/gestion/edit-cashflow" element={<EditCashflow />} />
          <Route path="/gestion/reportCaja" element={<RptCaja />} />

          {/* Grupos */}
          <Route path="/gestion/show-groups" element={<GroupsView />} />
          <Route path="/gestion/add-group" element={<AddGroup />} />
          <Route path="/gestion/edit-group" element={<EditGroup />} />

          {/* Rubros */}
          <Route path="/gestion/show-families" element={<FamiliesView />} />
          <Route path="/gestion/add-families" element={<AddFamily />} />
          <Route path="/gestion/edit-families" element={<EditFamily />} />

          {/* Contactos */}
          <Route path="/gestion/show-contacts" element={<ContactsView />} />
          <Route path="/gestion/add-contact" element={<AddContact />} />
          <Route path="/gestion/edit-contact" element={<EditContact />} />

          {/* Configuración */}
          <Route path="/gestion/show-configs" element={<SalesView />} />
          <Route path="/gestion/edit-config" element={<EditConfig />} />

          {/* Ventas */}
          <Route path="/gestion/print-sale" element={<PrintSale />} />
          <Route path="/gestion/sales-report" element={<SalesReport />} />
          <Route path="/gestion/add-sale" element={<AddSales />} />
          <Route path="/gestion/edit-sale" element={<SaleEdit />} />

          {/* Compras */}
          <Route path="/gestion/show-buys" element={<BuysView />} />
          <Route path="/gestion/add-buy" element={<AddBuy />} />
          <Route path="/gestion/edit-buy" element={<EditBuy />} />
          <Route path="/gestion/buys-report" element={<BuysReport />} />

          {/* Empresa */}
          <Route path="/gestion/show-companys" element={<CompanysView />} />
          <Route path="/gestion/edit-company" element={<EditCompany />} />

          {/* Usuarios */}
          <Route path="/gestion/show-users" element={<UsersView />} />
          <Route path="/gestion/edit-user" element={<EditUser />} />

          {/* Cuentas corrientes */}
          <Route path="/gestion/show-caccounts" element={<CaccountsView />} />
          <Route path="/gestion/add-caccount" element={<AddCaccount />} />
          <Route path="/gestion/edit-caccount" element={<EditCaccount />} />

          {/* Comprobantes */}
          <Route path="/gestion/show-receipts" element={<Next />} />

          {/* Fallback */}
          <Route path="*" element={<Error />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Index;
