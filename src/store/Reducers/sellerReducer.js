import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_seller = createAsyncThunk(
  "seller/get_seller",
  async (sellerId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/get-seller/${sellerId}`, {
        withCredentials: true,
      });
      console.log("data: ", data);

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const seller_status_update = createAsyncThunk(
  "seller/seller_status_update",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    console.log("info: ", info);
    try {
      const { data } = await api.post(`/seller-status-update`, info, {
        withCredentials: true,
      });
      console.log("data: ", data);

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const get_active_sellers = createAsyncThunk(
  "seller/get_active_sellers",
  async (
    { searchValue, page, parPage },
    { rejectWithValue, fulfillWithValue }
  ) => {
    // console.log("info: ", info);
    try {
      const { data } = await api.get(
        `/get-sellers?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,
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
export const get_deactive_sellers = createAsyncThunk(
  "seller/get_deactive_sellers",
  async (
    { searchValue, page, parPage },
    { rejectWithValue, fulfillWithValue }
  ) => {
    // console.log("info: ", info);
    try {
      const { data } = await api.get(
        `/get-deactive-sellers?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,
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
export const get_seller_request = createAsyncThunk(
  "seller/get_seller_request",
  async (
    { searchValue, page, parPage },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/request-seller-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,
        {
          withCredentials: true,
        }
      );

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const sellerReducer = createSlice({
  name: "seller",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    sellers: [],
    seller: "",
    totalSeller: 0,
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(get_seller_request.fulfilled, (state, { payload }) => {
      state.totalSeller = payload.totalSeller;
      state.sellers = payload.sellers;
    });
    builder.addCase(get_seller.fulfilled, (state, { payload }) => {
      state.seller = payload.seller;
    });
    builder.addCase(seller_status_update.fulfilled, (state, { payload }) => {
      state.seller = payload.seller;
      state.successMessage = payload.message;
    });
    builder.addCase(get_active_sellers.fulfilled, (state, { payload }) => {
      state.sellers = payload.sellers;
      state.totalSeller = payload.totalSeller;
    });
    builder.addCase(get_deactive_sellers.fulfilled, (state, { payload }) => {
      state.sellers = payload.sellers;
      state.totalSeller = payload.totalSeller;
    });
  },
});
export const { messageClear } = sellerReducer.actions;
export default sellerReducer.reducer;
