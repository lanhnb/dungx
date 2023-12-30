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

export const nhadatsFetch = createAsyncThunk(
  "nhadats/nhadatsFetch",
  async () => {
    try {
      const response = await axios.get(`${url}/nhadats`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
//tao ORderX
export const nhadatsCreated = createAsyncThunk(
  "nhadats/nhadatsCreated",
  async (values) => {
    try {
      const response = await axios.post(`${url}/nhadats/created`, values,setHeaders());

      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
);



export const nhadatsEdit = createAsyncThunk(
  "nhadats/nhadatsEdit",
  async (values) => {
    try {
      const response = await axios.put(`${url}/nhadats/${values.nhadat._id}`,values,setHeaders());

      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
);


export const nhadatsDelete = createAsyncThunk(
  "nhadats/nhadatsDelete",
  async (_id) => {
    try {
      const response = await axios.delete(`${url}/nhadats/${_id}`,setHeaders());

      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
);

const nhadatsSlice = createSlice({
  name: "nhadats",
  initialState,
  reducers: {},
  extraReducers: {
    [nhadatsFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [nhadatsFetch.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [nhadatsFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },
    [nhadatsCreated.pending]: (state, action) => {
      state.createStatus = "pending";
    },
    [nhadatsCreated.fulfilled]: (state, action) => {
      state.items.push(action.payload);
      state.createStatus = "success";
      toast.success("Nha dat Created!");
    },
    [nhadatsCreated.rejected]: (state, action) => {
      state.createStatus = "rejected";
    },


    [nhadatsEdit.pending]: (state, action) => {
      state.editStatus = "pending";
    },
    [nhadatsEdit.fulfilled]: (state, action) => {
      const updateNhadats = state.items.map((nhadat) =>
      nhadat._id === action.payload.id ? action.payload: nhadat);

      state.items = updateNhadats;
      state.editStatus = "success";
      toast.info("Nha dat Edit!");
    },
    [nhadatsEdit.rejected]: (state, action) => {
      state.editStatus = "rejected";
    },

    [nhadatsDelete.pending]: (state, action) => {
      state.deleteStatus = "pending";
    },
    [nhadatsDelete.fulfilled]: (state, action) => {
       
      const newList = state.items.filter((item)=>item.id !== action.payload.id)
      state.items = newList

      state.deleteStatus = "success";
      toast.error("Nhadat Delete!");
    },
    [nhadatsDelete.rejected]: (state, action) => {
      state.deleteStatus = "rejected";
    },
  },
});

export default nhadatsSlice.reducer;
