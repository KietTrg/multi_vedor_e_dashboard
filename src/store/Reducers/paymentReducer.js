import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_seller_payment_details = createAsyncThunk(
  "payment/get_seller_payment_details",
  async (sellerId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/payment/seller-payment-details/${sellerId}`,
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
export const send_withdrawal_request = createAsyncThunk(
  "payment/send_withdrawal_request",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    console.log("info: ", info);
    try {
      const { data } = await api.post(
        `/payment/send-withdrawal-request`,
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
export const get_payment_request = createAsyncThunk(
  "payment/get_payment_request",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/payment/gets-payment-request`,

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
export const confirm_payment_request = createAsyncThunk(
  "payment/confirm_payment_request",
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        `/payment/confirm-payment-request`,
        { id },

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

export const paymentReducer = createSlice({
  name: "payment",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    pending_withdrawals: [],
    success_withdrawals: [],
    total_sale: 0,
    withdrawal_amount: 0,
    pending_amount: 0,
    available_amount: 0,
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      get_seller_payment_details.fulfilled,
      (state, { payload }) => {
        state.pending_withdrawals = payload.pending_withdrawals;
        state.success_withdrawals = payload.success_withdrawals;
        state.total_sale = payload.total_sale;
        state.pending_amount = payload.pending_amount;
        state.withdrawal_amount = payload.withdrawal_amount;
        state.available_amount = payload.available_amount;
      }
    );
    builder.addCase(send_withdrawal_request.pending, (state, _) => {
      state.loader = true;
    });
    builder.addCase(send_withdrawal_request.rejected, (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.message;
    });
    builder.addCase(send_withdrawal_request.fulfilled, (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload.message;
      state.pending_withdrawals = [
        ...state.pending_withdrawals,
        payload.withdrawal,
      ];
      state.available_amount =
        state.available_amount - payload.withdrawal.amount;
      state.pending_amount = payload.withdrawal.amount;
    });
    builder.addCase(get_payment_request.fulfilled, (state, { payload }) => {
      state.pending_withdrawals = payload.request;
    });

    builder.addCase(confirm_payment_request.pending, (state, _) => {
      state.loader = true;
    });
    builder.addCase(confirm_payment_request.rejected, (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.message;
    });
    builder.addCase(confirm_payment_request.fulfilled, (state, { payload }) => {
      const temp = state.pending_withdrawals.filter(
        (e) => e?._id !== payload.payment._id
      );
      state.loader = false;
      state.successMessage = payload.message;
      state.pending_withdrawals = temp;
    });
  },
});
export const { messageClear } = paymentReducer.actions;
export default paymentReducer.reducer;
