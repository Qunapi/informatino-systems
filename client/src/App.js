import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DataTable } from "./features/UserList/UserList";
import DateAdapter from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { UpdateUser } from "./features/CreateUpdateUser/UpdateUser";
import { CreateUser } from "./features/CreateUpdateUser/CreateUser";
import { CreateAccount } from "./features/CreateUpdateAccount/CreateAccount";
import { AccountPage } from "./features/AccountPage/AccountPage";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <LocalizationProvider dateAdapter={DateAdapter}>
        <BrowserRouter>
          <Routes>
            <Route path="/users/create" element={<CreateUser />} />
            <Route path="/users/:id" element={<UpdateUser />} />
            <Route path="/users" element={<DataTable />} />
            <Route path="/accounts/create" element={<CreateAccount />} />
            <Route path="/accounts/:contractNumber" element={<AccountPage />} />
            <Route path="/*" element={<DataTable />} />
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </div>
  );
}

export default App;
