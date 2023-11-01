import './App.css';
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Register from './components/Register';
import Login from './components/Login'
import FogotPassword from './components/FogotPassword'
import ResetPassword from './components/ResetPassword'
import NavBar from './components/NavBar';
import AdminHome from './components/AdminHome';
import UserHome from './components/UserHome';
import AdminSideRegister from './components/AdminSideRegister';
import ChangePass from './components/ChangePass';
import Profile from './components/Profile';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer';



import Cookies from 'js-cookie';

//sadeepa
import ViewAllUsers from './components/ViewAllUsers';
import UpdateUser from './components/UpdateUser';
import ManagerHome from './components/ManagerHome';
import OrderManagement from './components/OrderManagement';
import PaymentDetails from './components/PaymentDetails';
import InvoicesManagement from './components/InvoicesManagement';
import OrderDetailsDisplay from './components/OrderDetailsDisplay';
import InvoicePayment from './components/InvoicePayment';


//Thanuja
import SiteManagerCreateOrder from './components/SiteManagerCreateOrder';
import SiteManagerViewOrder from './components/SiteManagerViewOrder';
import SiteManagerViewOrderDetails from './components/SiteManagerViewOrderDetail';

import CreateInventory from './components/CreateInventory';
import InventoryDetailsDisplay from './components/InventoryDetailsDisplay';
import UpdateInventory from './components/UpdateInventory';






//kamishka
import SupplierView from './components/SupplierView';
import SupplierOrderView from './components/SupplierOrderView';
import InvoiceForm from './components/InvoiceForm';




function App() {


  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(localStorage.getItem('role') ? localStorage.getItem('role') : "");

  })


  // Function to handle beforeunload event
  const handleBeforeUnload = () => {
    // Clear the user data from localStorage when the browser is closed
    localStorage.removeItem('role');
  };


  return (
    <>
      <div className="App">

        <ToastContainer autoClose={3000} />
        {user && <NavBar />}



        {
          user === "admin" ? (

            <Router>
              <Routes>
                <Route path='/adminHome' element={<AdminHome />} />
                <Route path="/adminRegister" element={<AdminSideRegister />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/resetPassword' element={<ResetPassword />} />
                <Route path='/getUsers' element={<ViewAllUsers />} />
                <Route path='/supplierView' element={<SupplierView />} />



                <Route path='/updateUsers/:userId' element={<UpdateUser />} />









              </Routes>
            </Router>

          ) : user === 'user' ? (


            <Router>

              <Routes>

                <Route path='/userHome' element={<UserHome />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/resetPassword' element={<ResetPassword />} />
                <Route path='/supplierView' element={<SupplierView />} />
                <Route path='/SiteManagerCreateOrder' element={<SiteManagerCreateOrder />} />
                <Route path='/SiteManagerViewOrder' element={<SiteManagerViewOrder />} />
                <Route path='/SiteManagerViewOrderDetails/:orderId' element={<SiteManagerViewOrderDetails />} />



                <Route path='/CreateInventory' element={<CreateInventory />} />
                <Route path='/InventoryDetailsDisplay' element={<InventoryDetailsDisplay />} />
                <Route path='/UpdateInventory/:inventoryId' element={<UpdateInventory />} />


                <Route path='/managerHome' element={<ManagerHome />} />
                <Route path='/orderManagement' element={<OrderManagement />} />
                <Route path='/paymentDetails' element={<PaymentDetails />} />
                <Route path='/invoiceManagement' element={<InvoicesManagement />} />
                <Route path='/orderDetailsDisplay/:orderId' element={<OrderDetailsDisplay />} />
                <Route path='/invoicePayment/:invoiceId' element={<InvoicePayment />} />
                <Route path='/supplierOrderView/:orderId' element={<SupplierOrderView />} />
                <Route path='/InvoiceForm/:orderId' element={<InvoiceForm />} />



              </Routes>

            </Router>


          ) : null

        }


        <Router>
          <Routes>


            <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/fogotPassword' element={<FogotPassword />} />
            <Route path='/changePassword/:email' element={<ChangePass />} />

          </Routes>
        </Router>

      </div>
    </>
  );
}

export default App;