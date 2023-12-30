import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url, setHeaders } from "./api";
import { toast } from "react-toastify";

const initialState ={
    list: [],
    status: null,
};
export const ordersxFetch = createAsyncThunk("ordersx/ordersFetch", async() =>{
    try{
        const response = await axios.get(`${url}/ordersx`, setHeaders());
        return response.data;
    } catch(error){
        console.log(error);
    }
});

export const ordersxEdit = createAsyncThunk(
    "ordersx/ordersxEdit",
    async (values, {getState}) =>{
        const state = getState();
        let currentOrder = state.ordersx.list.filter(
            (orderx) =>orderx._id === values.id
        );
        const newOrder = {
            ...currentOrder,
            isCall: values.isCall,
        };
        try{
            const response = await axios.put(
                `${url}/ordersx/${values.id}`,
                newOrder,
                setHeaders()
            );
            return response.data;
        }catch(error){
            console.log(error);
        }
    }
);


//delete Order

export const ordersxDelete = createAsyncThunk("ordersx/ordersxDelete",async (_id) => {
      try {
        const response = await axios.delete(`${url}/ordersx/${_id}`, setHeaders());
  
        return response.data;
      } catch (error) {
        console.log(error);
        toast.error(error.response.data);
      }
    }
  );



const ordersxSlice = createSlice({
    name: "ordersx",
    initialState,
    reducers:{},
    extraReducers:{
        [ordersxFetch.pending]: (state, action) =>{
            state.status = "pending";
        },
        [ordersxFetch.fulfilled]:(state, action)=>{
            state.list = action.payload;
            state.status = "success";
        },
        [ordersxFetch.rejected]: (state, action) =>{
            state.status = "rejected";
        },

        [ordersxEdit.pending]: (state, action) =>{
            state.status = "pending";
        },
        [ordersxEdit.fulfilled]:(state, action)=>{
            state.list = action.payload;
            state.status = "success";
        },
        [ordersxEdit.rejected]: (state, action) =>{
            state.status = "rejected";
        },

    }
});
export default ordersxSlice.reducer;