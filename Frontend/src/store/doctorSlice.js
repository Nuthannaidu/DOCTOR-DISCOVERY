import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getTopDoctors,
  getDoctors,
  getDoctorById
} from "../services/api";

export const fetchTopDoctors = createAsyncThunk(
  "doctors/fetchTopDoctors",
  async () => {
    const response = await getTopDoctors();
    return response.data;
  }
);

export const fetchDoctors = createAsyncThunk(
  "doctors/fetchDoctors",
  async (params) => {
    const response = await getDoctors(params);
    return {
      data: response.data,
      page: params.page || 1
    };
  }
);

export const fetchDoctorById = createAsyncThunk(
  "doctors/fetchDoctorById",
  async (id) => {
    const response = await getDoctorById(id);
    return response.data;
  }
);

const doctorSlice = createSlice({
  name: "doctors",
  initialState: {
    topDoctors: [],
    doctorList: [],
    selectedDoctor: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearDoctors: (state) => {
      state.doctorList = [];
    }
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchTopDoctors.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTopDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.topDoctors = action.payload;
      })
      .addCase(fetchTopDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchDoctors.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.loading = false;

        const { data, page } = action.payload;

        if (page === 1) {
          state.doctorList = data;
        } else {
          state.doctorList = [...state.doctorList, ...data];
        }
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchDoctorById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDoctorById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedDoctor = action.payload;
      })
      .addCase(fetchDoctorById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearDoctors } = doctorSlice.actions;

export default doctorSlice.reducer;
