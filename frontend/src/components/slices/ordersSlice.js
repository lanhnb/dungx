import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url, setHeaders } from "./api";
import { toast } from "react-toastify";

const initialState ={
    list: [],
    status: null,
};
export const ordersFetch = createAsyncThunk("orders/ordersFetch", async() =>{
    try{
        const response = await axios.get(`${url}/orders`, setHeaders());
        return response.data;
    } catch(error){
        console.log(error);
    }
});
export const ordersEdit = createAsyncThunk(
    "orders/ordersEdit",
    async (values, {getState}) =>{
        const state = getState();
        let currentOrder = state.orders.list.filter(
            (order) =>order._id === values.id
        );
        const newOrder = {
            ...currentOrder[0],
            isDelivered: values.isDelivered,
        };
        try{
            const response = await axios.put(
                `${url}/orders/${values.id}`,
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

export const ordersDelete = createAsyncThunk("orders/ordersDelete",async (_id) => {
      try {
        const response = await axios.delete(`${url}/orders/${_id}`, setHeaders());
  
        return response.data;
      } catch (error) {
        console.log(error);
        toast.error(error.response.data);
      }
    }
  );


const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers:{},
    extraReducers:{
        [ordersFetch.pending]: (state, action) =>{
            state.status = "pending";
        },
        [ordersFetch.fulfilled]:(state, action)=>{
            state.list = action.payload;
            state.status = "success";
        },
        [ordersFetch.rejected]: (state, action) =>{
            state.status = "rejected";
        },

        [ordersEdit.pending]: (state, action) =>{
            state.status = "pending";
        },
        [ordersEdit.fulfilled]:(state, action)=>{
            state.list = action.payload;
            state.status = "success";
        },
        [ordersEdit.rejected]: (state, action) =>{
            state.status = "rejected";
        },

    }
});
export default ordersSlice.reducer;