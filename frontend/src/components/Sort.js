import React from "react";
import styled from "styled-components";
import { BsFillGridFill, BsList } from "react-icons/bs";
import { useFilterContext } from "./FilterContext"
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Alert } from "@mui/material";
import MessageBox from "./admin/summary-components/MessageBox";
import { toast } from "react-toastify";





const Sort = () => {
    
    const { filter_products, grid_view, setGridView, setListView } = useFilterContext();
    return <Wrapper>
        {/* { 1st column} */}
        <div className="sorting-list--grid">
            <button className={grid_view ? "active sort-btn" : "sort-btn"}
                onClick={setGridView}>
                <BsFillGridFill className="icon" />
            </button>
            <button className={!grid_view ? "active sort-btn" : "sort-btn"}
                onClick={setListView}>
                <BsList className="icon" />
            </button>
        </div>
        {/* Cot 2 */}
        <div className="product-data">
            <p>{`${filter_products.length} Product Available`}</p>
        </div>
       

    </Wrapper>
};
export default Sort;
const Wrapper = styled.section`
    display:flex;
    justify-content: space-between;
    padding-right:127px;
    margin-top: 2rem;

    .sorting-list--grid{
        display: flex;
        gap: 2rem;
        margin-left: 20px;
        height:32px;
        
        .sort-btn{
            padding: 0.2rem 1rem;
            border:none;
            display:flex;
            justify-content: center;
            align-items: center;
            cursor:pointer;

        }
        .icon{
            font-size: 1.6rem;
        }
        .active{
            background-color:#e4563a;
            color: #fff;

        }
    }

`;
