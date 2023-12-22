import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url, setHeaders } from "./api";
import { toast } from "react-toastify";



const initialState = {
  items: [],
  status: null,
  createStatus: null,
  deleteStatus: null,
  editStatus: null,
};

export const productsFetch = createAsyncThunk(
  "products/productsFetch",
  async () => {
    try {
      const response = await axios.get(`${url}/products`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const productsCreate = createAsyncThunk(
  "products/productsCreate",
  async (values) => {
    try {
      const response = await axios.post(`${url}/products/create`, values,setHeaders());

      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
);
export const productsEdit = createAsyncThunk(
  "products/productsEdit",
  async (values) => {
    try {
      const response = await axios.put(`${url}/products/${values.product._id}`,values,setHeaders());

      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
);


export const productsDelete = createAsyncThunk(
  "products/productsDelete",
  async (_id) => {
    try {
      const response = await axios.delete(`${url}/products/${_id}`,setHeaders());

      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    [productsFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [productsFetch.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [productsFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },
    [productsCreate.pending]: (state, action) => {
      state.createStatus = "pending";
    },
    [productsCreate.fulfilled]: (state, action) => {
      state.items.push(action.payload);
      state.createStatus = "success";
      toast.success("Product Created!");
    },
    [productsCreate.rejected]: (state, action) => {
      state.createStatus = "rejected";
    },


    [productsEdit.pending]: (state, action) => {
      state.editStatus = "pending";
    },
    [productsEdit.fulfilled]: (state, action) => {
      const updateProducts = state.items.map((product) =>
      product._id === action.payload.id ? action.payload: product);

      state.items = updateProducts;
      state.editStatus = "success";
      toast.info("Product Edit!");
    },
    [productsEdit.rejected]: (state, action) => {
      state.editStatus = "rejected";
    },

    [productsDelete.pending]: (state, action) => {
      state.deleteStatus = "pending";
    },
    [productsDelete.fulfilled]: (state, action) => {
       
      const newList = state.items.filter((item)=>item.id !== action.payload.id)
      state.items = newList

      state.deleteStatus = "success";
      toast.error("Product Delete!");
    },
    [productsDelete.rejected]: (state, action) => {
      state.deleteStatus = "rejected";
    },
  },
});

export default productsSlice.reducer;
