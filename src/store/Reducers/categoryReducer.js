import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const categoryAdd = createAsyncThunk(
  "category/categoryAdd",
  async ({ name, image }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("image", image);
      const { data } = await api.post("/category-add", formData, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_categorys = createAsyncThunk(
  "category/get_categorys",
  async (
    { searchValue, page, parPage },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/categorys-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,
        {
          withCredentials: true,
        }
      );

      return fulfillWithValue(data);
    } catch (error) {
      console.log("error: ", error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_category = createAsyncThunk(
  "category/get_category",
  async (categoryId, { rejectWithValue, fulfillWithValue }) => {
    console.log("categoryId: ", categoryId);
    try {
      const { data } = await api.get(`/category-get/${categoryId}`, {
        withCredentials: true,
      });
      console.log("data: ", data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const delete_category = createAsyncThunk(
  "category/delete_category",
  async ({ categoryId }, { rejectWithValue, fulfillWithValue }) => {
    console.log("categoryId: ", categoryId);
    try {
      const { data } = await api.post(
        `/category-delete`,
        { categoryId },
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

export const categoryReducer = createSlice({
  name: "category",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    categorys: [],
    category: "",
    totalCategory: 0,
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(categoryAdd.pending, (state, _) => {
      state.loader = true;
    });
    builder.addCase(categoryAdd.rejected, (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.error;
    });
    builder.addCase(categoryAdd.fulfilled, (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload.message;
      state.categorys = [...state.categorys, payload.category];
      state.category = payload.category;
    });
    builder.addCase(get_categorys.fulfilled, (state, { payload }) => {
      state.totalCategory = payload.totalCategory;
      state.categorys = payload.categorys;
    });
    builder.addCase(get_category.fulfilled, (state, { payload }) => {
      state.category = payload.category;
    });
    builder.addCase(delete_category.fulfilled, (state, { payload }) => {
      state.category = payload.category;
      state.successMessage = payload.message;
    });
  },
});
export const { messageClear } = categoryReducer.actions;
export default categoryReducer.reducer;
