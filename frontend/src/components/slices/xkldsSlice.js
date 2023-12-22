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

export const xkldsFetch = createAsyncThunk(
  "xklds/xkldsFetch",
  async () => {
    try {
      const response = await axios.get(`${url}/xklds`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
//tao ORderX
export const xkldsCreatex = createAsyncThunk(
  "xklds/xkldsCreatex",
  async (values) => {
    try {
      const response = await axios.post(`${url}/xklds/createx`, values,setHeaders());

      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
);
//End tao OrDERx

export const xkldsCreate = createAsyncThunk(
  "xklds/xkldsCreate",
  async (values) => {
    try {
      const response = await axios.post(`${url}/xklds/create`, values,setHeaders());

      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
);
export const xkldsEdit = createAsyncThunk(
  "xklds/xkldsEdit",
  async (values) => {
    try {
      const response = await axios.put(`${url}/xklds/${values.xkld._id}`,values,setHeaders());

      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
);


export const xkldsDelete = createAsyncThunk(
  "xklds/xkldsDelete",
  async (_id) => {
    try {
      const response = await axios.delete(`${url}/xklds/${_id}`,setHeaders());

      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
);

const xkldsSlice = createSlice({
  name: "xklds",
  initialState,
  reducers: {},
  extraReducers: {
    [xkldsFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [xkldsFetch.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [xkldsFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },
    [xkldsCreate.pending]: (state, action) => {
      state.createStatus = "pending";
    },
    [xkldsCreate.fulfilled]: (state, action) => {
      state.items.push(action.payload);
      state.createStatus = "success";
      toast.success("Xkld Created!");
    },
    [xkldsCreate.rejected]: (state, action) => {
      state.createStatus = "rejected";
    },


    [xkldsEdit.pending]: (state, action) => {
      state.editStatus = "pending";
    },
    [xkldsEdit.fulfilled]: (state, action) => {
      const updateXklds = state.items.map((xkld) =>
      xkld._id === action.payload.id ? action.payload: xkld);

      state.items = updateXklds;
      state.editStatus = "success";
      toast.info("Xkld Edit!");
    },
    [xkldsEdit.rejected]: (state, action) => {
      state.editStatus = "rejected";
    },

    [xkldsDelete.pending]: (state, action) => {
      state.deleteStatus = "pending";
    },
    [xkldsDelete.fulfilled]: (state, action) => {
       
      const newList = state.items.filter((item)=>item.id !== action.payload.id)
      state.items = newList

      state.deleteStatus = "success";
      toast.error("Xkld Delete!");
    },
    [xkldsDelete.rejected]: (state, action) => {
      state.deleteStatus = "rejected";
    },
  },
});

export default xkldsSlice.reducer;
