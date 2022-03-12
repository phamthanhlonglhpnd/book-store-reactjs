import HomePage from "./components/home/HomePage";
import './App.scss';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ForgotPassword from "./components/auth/ForgotPassword";
import ChangePassword from "./components/auth/ChangePassword";
import System from "./route/System";
import {
  ManageAuthors, ManageBooks, ManageComments, ManageHandbooks, ManageTypeOfHandbook,
  ManageOrders, ManagePublishers, ManageStores, ManageUsers,
  EmployeeComments, EmployeeDiscounts, EmployeeOrders,
  Account, Comments, Orders, Wishlist, ManageAccount, Start, ManageLanguage
} from './components/index';
import PrivateRoute from './route/PrivateRoute';
import ProtectedRoute from "./route/ProtectedRoute";
import { ROLES } from "./utils/constant";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/system" element={<System />}>

              {/* Route of Admin */}
              <Route element={<ProtectedRoute role={[ROLES.ADMIN]} />}>
                <Route path='admin/manage-books' element={<ManageBooks />} />
              </Route>
              <Route element={<ProtectedRoute role={[ROLES.ADMIN]} />}>
                <Route path='admin/manage-users' element={<ManageUsers />} />
              </Route>
              <Route element={<ProtectedRoute role={[ROLES.ADMIN]} />}>
                <Route path='admin/manage-comments' element={<ManageComments />} />
              </Route>
              <Route element={<ProtectedRoute role={[ROLES.ADMIN]} />}>
                <Route path='admin/manage-authors' element={<ManageAuthors />} />
              </Route>
              <Route element={<ProtectedRoute role={[ROLES.ADMIN]} />}>
                <Route path='admin/manage-languages' element={<ManageLanguage />} />
              </Route>
              <Route element={<ProtectedRoute role={[ROLES.ADMIN]} />}>
                <Route path='admin/manage-stores' element={<ManageStores />} />
              </Route>
              <Route element={<ProtectedRoute role={[ROLES.ADMIN]} />}>
                <Route path='admin/manage-handbooks' element={<ManageHandbooks />} />
              </Route>
              <Route element={<ProtectedRoute role={[ROLES.ADMIN]} />}>
                <Route path='admin/manage-type-of-handbook' element={<ManageTypeOfHandbook />} />
              </Route>
              <Route element={<ProtectedRoute role={[ROLES.ADMIN]} />}>
                <Route path='admin/manage-publishers' element={<ManagePublishers />} />
              </Route>
              <Route element={<ProtectedRoute role={[ROLES.ADMIN]} />}>
                <Route path='admin/manage-orders' element={<ManageOrders />} />
              </Route>

              {/* Route of Employee */}
              <Route element={<ProtectedRoute role={[ROLES.EMPLOYEE]} />}>
                <Route path='employee/manage-comments' element={<EmployeeComments />} />
              </Route>
              <Route element={<ProtectedRoute role={[ROLES.EMPLOYEE]} />}>
                <Route path='employee/manage-orders' element={<EmployeeOrders />} />
              </Route>
              <Route element={<ProtectedRoute role={[ROLES.EMPLOYEE]} />}>
                <Route path='employee/manage-discounts' element={<EmployeeDiscounts />} />
              </Route>

              {/* Share Route */}

              <Route element={<ProtectedRoute role={[ROLES.EMPLOYEE, ROLES.ADMIN]} />}>
                <Route path='manage-account' element={<ManageAccount />} />
              </Route>
              <Route element={<ProtectedRoute role={[ROLES.USER, ROLES.EMPLOYEE, ROLES.ADMIN]} />}>

              </Route>
              <Route element={<ProtectedRoute role={[ROLES.USER, ROLES.EMPLOYEE, ROLES.ADMIN]} />}>
                <Route index element={<Start />} />
              </Route>


              {/* Route of User */}
              <Route element={<ProtectedRoute role={[ROLES.USER]} />}>
                <Route path='user/my-account' element={<Account />} />
              </Route>
              <Route element={<ProtectedRoute role={[ROLES.USER]} />}>
                <Route path='user/my-orders' element={<Orders />} />
              </Route>
              <Route element={<ProtectedRoute role={[ROLES.USER]} />}>
                <Route path='user/my-wishlist' element={<Wishlist />} />
              </Route>
              <Route element={<ProtectedRoute role={[ROLES.USER]} />}>
                <Route path='user/my-comments' element={<Comments />} />
              </Route>

            </Route>
          </Route>
          <Route path="/" element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path='change-password' element={<ChangePassword />} />
        </Routes>
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
        />
      </BrowserRouter>
    </>
  );
}

export default App;
