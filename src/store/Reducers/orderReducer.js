import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_admin_orders = createAsyncThunk(
  "order/get_admin_orders",
  async (
    { searchValue, page, parPage },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/admin/orders?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,
        {
          withCredentials: true,
        }
      );
      console.log("data: ", data);

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const get_admin_order = createAsyncThunk(
  "order/get_admin_order",
  async (orderId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/admin/order/${orderId}`, {
        withCredentials: true,
      });
      console.log("data: ", data);

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const admin_order_update_status = createAsyncThunk(
  "order/admin_order_update_status",
  async ({ orderId, info }, { rejectWithValue, fulfillWithValue }) => {
    // console.log("status: ", status);
    // console.log("orderId: ", orderId);
    try {
      const { data } = await api.put(
        `/admin/order-status/update/${orderId}`,
        info,
        {
          withCredentials: true,
        }
      );
      console.log("data: ", data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_seller_orders = createAsyncThunk(
  "order/get_seller_orders",
  async (
    { searchValue, page, parPage, sellerId },
    { rejectWithValue, fulfillWithValue }
  ) => {
    // console.log("status: ", status);
    // console.log("orderId: ", orderId);
    try {
      const { data } = await api.get(
        `/seller/orders/${sellerId}?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,
        {
          withCredentials: true,
        }
      );
      console.log("data: ", data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const seller_order_update_status = createAsyncThunk(
  "order/seller_order_update_status",
  async ({ orderId, info }, { rejectWithValue, fulfillWithValue }) => {
    // console.log("status: ", status);
    // console.log("orderId: ", orderId);
    try {
      const { data } = await api.put(
        `/seller/order-status/update/${orderId}`,
        info,
        {
          withCredentials: true,
        }
      );
      console.log("data: ", data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const get_seller_order = createAsyncThunk(
  "order/get_seller_order",
  async (orderId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/seller/order/${orderId}`, {
        withCredentials: true,
      });
      console.log("data: ", data);

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const add_shipping = createAsyncThunk(
  "order/add_shipping",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/admin/add-shipping", info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const orderReducer = createSlice({
  name: "order",
  initialState: {
    successMessage: "",
    errorMessage: "",
    totalOrder: 0,
    shipping_fee: 0,
    fee: 0,
    order: {},
    myOrders: [],
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(get_admin_orders.fulfilled, (state, { payload }) => {
      state.myOrders = payload.orders;
      state.totalOrder = payload.totalOrders;
      state.fee = payload.fee;
    });
    builder.addCase(get_admin_order.fulfilled, (state, { payload }) => {
      state.order = payload.order;
    });
    builder.addCase(
      admin_order_update_status.rejected,
      (state, { payload }) => {
        state.errorMessage = payload.message;
      }
    );
    builder.addCase(
      admin_order_update_status.fulfilled,
      (state, { payload }) => {
        state.successMessage = payload.message;
      }
    );
    builder.addCase(add_shipping.fulfilled, (state, { payload }) => {
      state.shipping_fee = payload.shipping_fee;
      state.successMessage = payload.message;
    });

    //seller
    builder.addCase(get_seller_orders.fulfilled, (state, { payload }) => {
      state.myOrders = payload.orders;
      state.totalOrder = payload.totalOrders;
    });
    builder.addCase(get_seller_order.fulfilled, (state, { payload }) => {
      state.order = payload.order;
    });
    builder.addCase(
      seller_order_update_status.rejected,
      (state, { payload }) => {
        state.errorMessage = payload.message;
      }
    );
    builder.addCase(
      seller_order_update_status.fulfilled,
      (state, { payload }) => {
        state.successMessage = payload.message;
      }
    );
  },
});
export const { messageClear } = orderReducer.actions;
export default orderReducer.reducer;
