import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DataTable } from './features/UserList/UserList';

function App() {
  return (
    <div className="App">
      {/* <ThemeProvider theme={theme}> */}

      <BrowserRouter>
        <Routes>
          {/* <Route path="expenses" element={<Expenses />} />
          <Route path="invoices" element={<Invoices />} /> */}
          <Route path="/users/create" element={<div />} />
          <Route path="/users" element={<DataTable />} />
          <Route path="/*" element={<DataTable />} />
        </Routes>
      </BrowserRouter>
      {/* </ThemeProvider> */}
    </div>
  );
}

export default App;
