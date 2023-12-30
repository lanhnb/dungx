import { useFilterContext } from "./FilterContext"
import styled from "styled-components";
import { FaCheck } from "react-icons/fa";
import FormatPrice from "./FormatPrice";
import { Button } from "../styles/Button";


const FilterSection = () => {
    const {
        filters: { text, category, color, price, maxPrice, minPrice },
        updateFilterValue,
        all_products,
        clearFilters,
    } = useFilterContext();

    // get the unique values of each property
    const getUniqueData = (data, attr) => {
        let newVal = data.map((curElem) => {
            return curElem[attr];
        });

        if (attr === "colors") {

            return (newVal= ["All", ...new Set([].concat(...newVal))]);
            // newVal = newVal.flat();

        } else {
            return (newVal = ["All", ...new Set(newVal)]);
        }
    }

    // we need to have the individual data of each in an array format
    const categoryData = getUniqueData(all_products, "category");
    const companyData = getUniqueData(all_products, "company");
    const colorsData = getUniqueData(all_products, "colors");



    return (
        <Wrapper>

            <div className="filter-search">
                <h4>Filter by Names</h4>
                <form onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="text"
                        name="text"
                        value={text}
                        placeholder="Search"
                        onChange={updateFilterValue}
                        
                    />
                </form>
            </div>

            <div className="filter-category">
                <h3> Category</h3>
                <div className="category_btn">
                    {categoryData.map((curElem, index) => {
                        return (<button
                            key={index}
                            type="button"
                            name="category"
                            value={curElem}
                            onClick={updateFilterValue}
                            className={curElem === category ? "active" : ""}
                        >{curElem}</button>
                        );
                    })

                    }
                </div>
            </div>

            <div className="filter-company">
                <h3> Company</h3>
                <form action="#">
                    <select
                    style={{borderRadius:"5px", border: "1px solid rgba(98, 84, 243, 0.5)"}}
                        name="company"
                        id="company"
                        className="filter-search"
                        onClick={updateFilterValue}>
                        {
                            companyData.map((curElem, index) => {
                                return (
                                    <option value={curElem} name="company" key={index}>{curElem}</option>
                                )

                            })
                        }

                    </select>
                </form>
            </div>

            <div className="filter-color">
                <h3> Colors</h3>
                <div className="filter-color-style">
                    {colorsData.map((curColor, index) => {
                        if(curColor === "All"){
                            return (
                                <button
                                    key={index}
                                    value={curColor}
                                    type="button"
                                    name="color"
                                    // style={{ backgroundColor: curColor }}
                                    className="btnStyle1"
                                    onClick={updateFilterValue}>
                                    All
                                </button>
                            ); 
                        }
                        return (
                            <button
                                key={index}
                                value={curColor}
                                type="button"
                                name="color"
                                style={{ backgroundColor: curColor }}
                                className="btnStyle"
                                onClick={updateFilterValue}>
                                {color === curColor ? <FaCheck className='checkStyle'/> : null}
                            </button>
                        );

                    })}
                </div>
                <div className="filter_price">
                    <h3>Price</h3>
                    <p><FormatPrice price={price}/></p>
                    <p>
                        <input 
                        name="price"
                        type="range" 
                        min={minPrice} 
                        max={maxPrice} 
                        value={price}
                        onChange={updateFilterValue}/>
                    </p>
                </div>
                <div className="Clear_button">
                    <Button className="btn" onClick={clearFilters}>Clear Filter</Button>

                </div>
            </div>



        </Wrapper>





    )
};
export default FilterSection;

const Wrapper = styled.section`

    padding: 3rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    width:207px;
    h3{
        padding: 2rem 0;
        font-size: bold;
    }
    .filter-category{
        .category_btn{
            display:grid;
            width:100px;
            button{
            background:none;
            border:none;
            cursor:pointer;
            text-align:left;
           }
        }
        
        
    }
    .filter-search{
        input{
            padding: 4px;
            width:100%;
           
        }
        font-size:15px;
    }

    .filter-color{
        .filter-color-style{
            button.btnStyle {
                width:2rem;
                height:2rem;
                border:none;
                outline:none;
                cursor:pointer;
                border-radius:50%;
                margin-left:1rem;
            }
            button.btnStyle1{
                background:none;
                border:none;
                
            }
            .checkStyle{
                font-size: 1rem;
                color:#fff;
            }
            
        }
    }
    .filter-company{
        .filter-company-select{
            cursor:pointer;
            option{
                cursor:pointer;
            }
            
        }
        select#company {
            width: 165px;
            padding-top:3px;
            padding-bottom:3px;
           color:gray;
           font-size:14px;
        }

    }
    .Clear_button{
        .btn{
            background-color:red;
        }
    }
  
`;







