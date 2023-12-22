import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url, setHeaders } from "./api";
import { toast } from "react-toastify";

const initialState ={
    list: [],
    status: null,
};
export const commentFetch = createAsyncThunk("comment/commentFetch", async() =>{
    try{
        const response = await axios.get(`${url}/comment`, setHeaders());
        return response.data;
    } catch(error){
        console.log(error);
    }
});
export const commentEdit = createAsyncThunk(
    "comment/commentEdit",
    async (values, {getState}) =>{
        const state = getState();
        let currentComment = state.comment.list.filter(
            (comment) =>comment._id === values.id
        );
        const newComment = {
            ...currentComment,
            isCall: values.isCall,
        };
        try{
            const response = await axios.put(
                `${url}/comment/${values.id}`,
                newComment,
                setHeaders()
            );
            return response.data;
        }catch(error){
            console.log(error);
        }
    }
);

//delete Order

export const commentDelete = createAsyncThunk("comment/commentDelete",async (_id) => {
      try {
        const response = await axios.delete(`${url}/comment/${_id}`, setHeaders());
  
        return response.data;
      } catch (error) {
        console.log(error);
        toast.error(error.response.data);
      }
    }
  );


const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers:{},
    extraReducers:{
        [commentFetch.pending]: (state, action) =>{
            state.status = "pending";
        },
        [commentFetch.fulfilled]:(state, action)=>{
            state.list = action.payload;
            state.status = "success";
        },
        [commentFetch.rejected]: (state, action) =>{
            state.status = "rejected";
        },

        [commentEdit.pending]: (state, action) =>{
            state.status = "pending";
        },
        [commentEdit.fulfilled]:(state, action)=>{
            state.list = action.payload;
            state.status = "success";
        },
        [commentEdit.rejected]: (state, action) =>{
            state.status = "rejected";
        },

    }
});
export default commentSlice.reducer;