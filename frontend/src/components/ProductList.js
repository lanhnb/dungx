import React from "react";
import {useFilterContext} from "./FilterContext"
import GridView from "./GridView"
import ListView from "./ListView"


const ProductList=()=>{
    const { filter_products, filter_products1 ,grid_view} = useFilterContext();
    if (grid_view === true){
        return <GridView products={filter_products}/>
    }
    
    if (grid_view === false){
        return <ListView products={filter_products1}/>
    
    }
};
export default ProductList;