import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getTopDoctors = () => API.get("/doctors/top");

export const getDoctors = (params) =>
  API.get("/doctors", { params });


export const getDoctorById = (id) =>
  API.get(`/doctors/${id}`);

export const createDoctor = (data) =>
  API.post("/doctors", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
