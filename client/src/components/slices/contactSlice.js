import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url, setHeaders } from "./api";
import { toast } from "react-toastify";

const initialState ={
    list: [],
    status: null,
};
export const contactFetch = createAsyncThunk("contact/contactFetch", async() =>{
    try{
        const response = await axios.get(`${url}/contact`, setHeaders());
        return response.data;
    } catch(error){
        console.log(error);
    }
});

export const contactDelete = createAsyncThunk("contact/contactDelete", async(_id) =>{
    try{
        const response = await axios.delete(`${url}/contact/${_id}`, setHeaders());
        return response.data;
    } catch(error){
        console.log(error.response.data);
        toast.error(error.response.data)
    }
});

export const contactEdit = createAsyncThunk(
    "contact/contactEdit",
    async (values, {getState}) =>{
        const state = getState();
        let currentContact = state.contact.list.filter(
            (contact) =>contact._id === values.id
        );
        const newContact = {
            ...currentContact,
            isCall: values.isCall,
        };
        try{
            const response = await axios.put(
                `${url}/contact/${values.id}`,
                newContact,
                setHeaders()
            );
            return response.data;
        }catch(error){
            console.log(error);
        }
    }
);



const contactSlice = createSlice({
    name: "contact",
    initialState,
    reducers:{},
    extraReducers:{
        [contactFetch.pending]: (state, action) =>{
            state.status = "pending";
        },
        [contactFetch.fulfilled]:(state, action)=>{
            state.list = action.payload;
            state.status = "success";
        },
        [contactFetch.rejected]: (state, action) =>{
            state.status = "rejected";
        },

        [contactDelete.pending]: (state, action) =>{
            state.status = "pending";
        },
        [contactDelete.fulfilled]:(state, action)=>{
            const newList =state.list.filter(
                (contact) => contact._id !== action.payload.id
            );
            state.list = newList;
            state.status = "success";
            toast.error("Contact Delete!", {
                position: "bottom-left",
            });
        },
        [contactDelete.rejected]: (state, action) =>{
            state.status = "rejected";
        },

    }
});
export default contactSlice.reducer;