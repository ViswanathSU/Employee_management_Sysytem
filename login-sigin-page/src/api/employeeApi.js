// import axios from "axios";
// import Cookies from "js-cookie";

// const api = axios.create({
//   baseURL: "https://hard-ingratiating-ila.ngrok-free.dev",
//   headers: {
//     "Content-Type": "application/json",
//     "Accept": "application/json",

//     // THIS IS THE FIX
//     "ngrok-skip-browser-warning": "true",
//   },
// });

// api.interceptors.request.use((config) => {
//   const token = Cookies.get("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// /* =====================
//    EMPLOYEE APIs
// ===================== */

// export const fetchEmployees = async () => {
//   const res = await api.get("/employees/getallemp");
//   return res.data; // array
// };

// export const createEmployee = async (data) => {
//   const res = await api.post("/employees/create", data);
//   return res.data.employee;
// };

// export const updateEmployee = async (id, data) => {
//   const res = await api.put(`/employees/update/${id}`, data);
//   return res.data.employee;
// };

// export const deleteEmployee = async (id) => {
//   return api.delete(`/employees/deletebyid/${id}`);
// };


// // for the employee page

import api from "./api";

/* =====================
   EMPLOYEE APIs
===================== */

export const fetchEmployees = async () => {
  const res = await api.get("/employees/getallemp");
  return res.data;
};

export const createEmployee = async (data) => {
  const res = await api.post("/employees/create", data);
  return res.data.employee;
};

export const updateEmployee = async (id, data) => {
  const res = await api.put(`/employees/update/${id}`, data);
  return res.data.employee;
};

export const deleteEmployee = async (id) => {
  return api.delete(`/employees/deletebyid/${id}`);
};
