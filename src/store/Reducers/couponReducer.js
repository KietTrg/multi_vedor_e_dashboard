import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const couponAdd = createAsyncThunk(
  "coupon/couponAdd",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/coupon", info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getCoupons = createAsyncThunk(
  "coupon/getCoupons",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/get-coupons", {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteCoupon = createAsyncThunk(
  "coupon/deleteCoupon",
  async (cId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(`/delete-coupons/${cId}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const couponReducer = createSlice({
  name: "coupon",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    totalCoupon: 0,
    coupons: [],
    coupon: {},
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(couponAdd.pending, (state, { payload }) => {
      state.loader = true;
    });
    builder.addCase(couponAdd.rejected, (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.message;
    });
    builder.addCase(couponAdd.fulfilled, (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload.message;
    });
    builder.addCase(getCoupons.fulfilled, (state, { payload }) => {
      state.coupons = payload.coupons;
      state.totalCoupon = payload.totalCoupon;
    });
    builder.addCase(deleteCoupon.pending, (state, { payload }) => {
      state.loader = true;
    });
    builder.addCase(deleteCoupon.rejected, (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.message;
    });
    builder.addCase(deleteCoupon.fulfilled, (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload.message;
    });
  },
});
export const { messageClear } = couponReducer.actions;
export default couponReducer.reducer;
