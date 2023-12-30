import { createContext, useContext, useReducer, useEffect } from "react";
import { useProductContext } from "./ProductContext";

import reducer from "./FilterReducer";



const FilterContext = createContext();

const initialState = {
	filter_products: [],
	filter_products1: [],
	all_products: [],
	grid_view: true,
	sorting_value: "lowest",
	filters: {
		text: "",
		category: "All",
		company: "All",
		color: "All",
		maxPrice:0,
		minPrice:0,
		price:0,

	},
	
};

export const FilterContextProvider = ({ children }) => {
	const { products } = useProductContext();
	

	const [state, dispatch] = useReducer(reducer, initialState);

	// to sort the product

	// to set the grid view

	const setGridView = () => {
		return dispatch({ type: "SET_GRID_VIEW" });
	};
	// to set the list view

	const setListView = () => {
		return dispatch({ type: "SET_LIST_VIEW" });
	}

	// to Clear filter
	const clearFilters = ()=>{
		dispatch({type:"CLEAR_FILTERS"});
	}

	// sorting function

	const sorting = (event) => {
		let userValue = event.target.value;
		dispatch({ type: "GET_SORT_VALUE", payload: userValue });
	}

	// update the filter values

	const updateFilterValue = (event) => {
		let name = event.target.name;
		let value = event.target.value;

		return dispatch({ type: "UPDATE_FILTERS_VALUE", payload: { name, value } });
	};

	useEffect(() => {
		dispatch({ type: "FILTER_PRODUCTS"});
		dispatch({ type: "SORTING_PRODUCTS", payload: products });

	}, [products, state.sorting_value, state.filters, ]);



	// to load all the products for grid and list views

	useEffect(() => {
		dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
		}, [products ]);

	return (
		<FilterContext.Provider
			value={{
				...state,
				setGridView,
				setListView,
				sorting,
				updateFilterValue,
				clearFilters,
			}}>
			{children}

		</FilterContext.Provider>
	);
};
export const useFilterContext = () => {
	return useContext(FilterContext);
};









