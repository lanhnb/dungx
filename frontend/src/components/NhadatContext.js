import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import  reducer  from "./ProductReducer";



const API = "http://localhost:5000/api/nhadats";
 

const AppContext = createContext();

const initialState ={
    isLoading: false,
    isError: false,
    nhadats:[],
    isSingleLoading: false,
    singleNhadat:{},
}

const AppProvider = ({children})=>{

    const [state, dispatch] = useReducer(reducer, initialState)

    const getNhadats = async (url)=>{
        dispatch({type:"SET_LOADING"})
        try{
        const res = await axios.get(url);
        const nhadats = await res.data;
       
       
        dispatch({type:"SET_API_DATA", payload:nhadats});
        }catch(error){
            dispatch({type:"API_ERROR"})
        }

    };
    // my 2nd api call for single product
    const getSingleNhadat = async (url)=>{
        dispatch({type:"SET_SINGLE_LOADING"})
        try {
            const res = await axios.get(url);
            const singleNhadat = await res.data;
            
            dispatch({type:"SET_SINGLE_PRODUCT", payload:singleNhadat});
            
        } catch (error) {
            dispatch({type:"SET_SINGLE_ERROR"})
            
        }
    }
   
    useEffect(()=>{
        getNhadats(API);
    },[]);

    return <AppContext.Provider value={{...state, getSingleNhadat}}>
        {children}
        </AppContext.Provider>
};

//custom hooks
const useNhadatContext = ()=>{
    return useContext(AppContext)
}
export {AppProvider, AppContext, useNhadatContext}