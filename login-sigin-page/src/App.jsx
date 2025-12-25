import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signin from "./components/Signin";
import EmployeePage from "./page/employeePage";
import ProtectedRoute from "./components/ProtectedRoute";
import './app.css'
import Allocation from "./page/Allocation";
import EmployeeAssets from './page/EmployeeAssets'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signin" element={<Signin />} />
      <Route
        path="/employees"
        element={
          <ProtectedRoute>
            <EmployeePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/allocation"
        element={
          <ProtectedRoute>
            <Allocation />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employee-assets"
        element={
          <ProtectedRoute>
            <EmployeeAssets />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
