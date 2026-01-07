import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signin from "./components/Signin";
import ProtectedRoute from "./components/ProtectedRoute";
import HomeEmployees from "./page/HomeEmployees";
import UserHome from "./page/UserHome";
import UserDetail from "./page/UserDetail";
import Allocation from "./page/Allocation";
import EmployeePage from "./page/employeePage";
import './App.css'
function App() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<Login />} />
      <Route path="/signin" element={<Signin />} />

      {/* ADMIN */}
      <Route
  path="/admin/employees"
  element={
    <ProtectedRoute adminOnly>
      <HomeEmployees />
    </ProtectedRoute>
  }
/>


      <Route
        path="/employees"
        element={
          <ProtectedRoute adminOnly>
            <EmployeePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/allocation"
        element={
          <ProtectedRoute adminOnly>
            <Allocation />
          </ProtectedRoute>
        }
      />

      {/* EMPLOYEE */}
      <Route
  path="/employee/:id"
  element={
    <ProtectedRoute>
      <UserHome />
    </ProtectedRoute>
  }
/>

      <Route
        path="/userdetail"
        element={
          <ProtectedRoute>
            <UserDetail />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
