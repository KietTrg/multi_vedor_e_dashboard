import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_seller_dashboard = createAsyncThunk(
  "dashboard/get_seller_dashboard",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/seller/get-seller-dashboard`, {
        withCredentials: true,
      });
      console.log("data: ", data);

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const get_admin_dashboard = createAsyncThunk(
  "dashboard/get_admin_dashboard",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/admin/get-admin-dashboard`, {
        withCredentials: true,
      });
      console.log("data: ", data);

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const dashboardReducer = createSlice({
  name: "dashboard",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    totalSale: 0,
    totalOrder: 0,
    totalProduct: 0,
    totalPendingOrder: 0,
    totalSeller: 0,
    recentOrders: [],
    recentMessage: [],
    resultMoney: [],
    resultOrder: [],
    resultSeller: [],
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(get_seller_dashboard.fulfilled, (state, { payload }) => {
      state.totalSale = payload.totalSale;
      state.totalProduct = payload.totalProduct;
      state.totalOrder = payload.totalOrder;
      state.totalPendingOrder = payload.totalPendingOrder;
      state.recentMessage = payload.message;
      state.recentOrders = payload.recentOrders;
      state.resultMoney = payload.result;
      state.resultOrder = payload.resultOrder;
    });
    builder.addCase(get_admin_dashboard.fulfilled, (state, { payload }) => {
      state.totalSale = payload.totalSale;
      state.totalProduct = payload.totalProduct;
      state.totalOrder = payload.totalOrder;
      state.totalSeller = payload.totalSeller;
      state.recentMessage = payload.message;
      state.recentOrders = payload.recentOrders;
      state.resultMoney = payload.result;
      state.resultOrder = payload.resultOrder;
      state.resultSeller = payload.resultSeller;
    });
  },
});
export const { messageClear } = dashboardReducer.actions;
export default dashboardReducer.reducer;
