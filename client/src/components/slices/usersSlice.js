import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url, setHeaders } from "./api";
import { toast } from "react-toastify";

const initialState ={
    list: [],
    status: null,
};
export const usersFetch = createAsyncThunk("users/usersFetch", async() =>{
    try{
        const response = await axios.get(`${url}/users`, setHeaders());
        return response.data;
    } catch(error){
        console.log(error);
    }
});

export const userDelete = createAsyncThunk("users/userDelete", async(_id) =>{
    try{
        const response = await axios.delete(`${url}/users/${_id}`, setHeaders());
        return response.data;
    } catch(error){
        console.log(error.response.data);
        toast.error(error.response.data)
    }
});
// UPDATE USERS
export const productsEdit = createAsyncThunk(
    "users/usersEdit",
    async (values) => {
      try {
        const response = await axios.put(`${url}/users/${values.user._id}`,values,setHeaders());
  
        return response.data;
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data);
      }
    }
  );



const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers:{},
    extraReducers:{
        [usersFetch.pending]: (state, action) =>{
            state.status = "pending";
        },
        [usersFetch.fulfilled]:(state, action)=>{
            state.list = action.payload;
            state.status = "success";
        },
        [usersFetch.rejected]: (state, action) =>{
            state.status = "rejected";
        },

        [userDelete.pending]: (state, action) =>{
            state.status = "pending";
        },
        [userDelete.fulfilled]:(state, action)=>{
            const newList =state.list.filter(
                (user) => user._id !== action.payload.id
            );
            state.list = newList;
            state.status = "success";
            toast.error("User Delete!", {
                position: "bottom-left",
            });
        },
        [userDelete.rejected]: (state, action) =>{
            state.status = "rejected";
        },

    }
});
export default usersSlice.reducer;