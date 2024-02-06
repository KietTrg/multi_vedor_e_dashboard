import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const add_product = createAsyncThunk(
  "product/add_product",
  async (product, { rejectWithValue, fulfillWithValue }) => {
    console.log("product: ", product);
    try {
      const { data } = await api.post("/product-add", product, {
        withCredentials: true,
      });
      console.log("data: ", data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const delete_product = createAsyncThunk(
  "product/delete_product",
  async ({ productId }, { rejectWithValue, fulfillWithValue }) => {
    console.log("productId: ", productId);
    try {
      const { data } = await api.post(
        `/product-delete`,
        { productId },
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
export const update_product = createAsyncThunk(
  "product/update_product",
  async (product, { rejectWithValue, fulfillWithValue }) => {
    console.log("product: ", product);

    try {
      const { data } = await api.post("/product-update", product, {
        withCredentials: true,
      });
      console.log("data: ", data);

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const product_image_update = createAsyncThunk(
  "product/product_image_update",
  async (
    { oldImage, newImage, productId },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const formData = new FormData();
      // formData.append("oldImage", oldImage);
      formData.append("newImage", newImage);
      formData.append("oldImage", oldImage);
      console.log("newImage: ", newImage);
      formData.append("productId", productId);

      const { data } = await api.post("/product-image-update", formData, {
        withCredentials: true,
      });
      console.log("data: ", data);

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_products = createAsyncThunk(
  "product/get_products",
  async (
    { searchValue, page, parPage },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/products-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,
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

export const get_product = createAsyncThunk(
  "product/get_product",
  async (productId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/product-get/${productId}`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const productReducer = createSlice({
  name: "product",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    products: [],
    product: "",
    totalProduct: 0,
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(add_product.pending, (state, _) => {
      state.loader = true;
    });
    builder.addCase(add_product.rejected, (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.error;
    });
    builder.addCase(add_product.fulfilled, (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload.message;
    });
    //get
    builder.addCase(get_products.fulfilled, (state, { payload }) => {
      state.totalProduct = payload.totalProduct;
      state.products = payload.products;
    });
    builder.addCase(get_product.fulfilled, (state, { payload }) => {
      state.product = payload.product;
    });
    //update
    builder.addCase(update_product.pending, (state, _) => {
      state.loader = true;
    });
    builder.addCase(update_product.rejected, (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.error;
    });
    builder.addCase(update_product.fulfilled, (state, { payload }) => {
      state.loader = false;
      state.product = payload.product;
      state.successMessage = payload.message;
    });
    //update_img

    builder.addCase(product_image_update.fulfilled, (state, { payload }) => {
      state.product = payload.product;
      state.successMessage = payload.message;
    });
    builder.addCase(delete_product.fulfilled, (state, { payload }) => {
      state.product = payload.product;
      state.successMessage = payload.message;
    });
  },
});
export const { messageClear } = productReducer.actions;
export default productReducer.reducer;
