import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DataTable } from "./features/UserList/UserList";
import DateAdapter from "@mui/lab/AdapterDayjs";
import { CreateUpdateUser } from "./features/CreateUpdateUser/CreateUpdateUser";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

function App() {
  return (
    <div className="App">
      <LocalizationProvider dateAdapter={DateAdapter}>
        <BrowserRouter>
          <Routes>
            <Route path="/users/create" element={<CreateUpdateUser />} />
            <Route path="/users" element={<DataTable />} />
            <Route path="/*" element={<DataTable />} />
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </div>
  );
}

export default App;
