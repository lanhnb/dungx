import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { setHeaders, url } from "../../slices/api";
import moment from "moment";

import * as React from 'react';



function compare(a,b){
    if(a.id < b.id){
      return 1
    }
    if(a.id > b.id){
      return -1
    }
    return 0;

  }


const Transactions = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [income, setIncome] = useState([]);

    useEffect(() => {
        async function ferchData() {
            setLoading(true);
            try {
                const res = await axios.get(`${url}/orders/?new=true`, setHeaders());

                setOrders(res.data);

            } catch (err) {
                console.log(err);

            }
            setLoading(false);
        }
        ferchData();
    }, []);

    //Income
    //Income Stats
    useEffect(() =>{
        async function fetchData(){
        try{
            const res =  await axios.get(`${url}/orders/income`, setHeaders())

            res.data.sort(compare)
            setIncome(res.data);
            

        }catch(err){
            console.log(err)
        }

        }
        fetchData()
    }, [])




    return (
        <Root>
            <StyledTransactions>
                {isLoading ? (
                    <p> Transactions loading...</p>
                ) : (
                    <><h3>Latest Transactions</h3>
                        <table aria-label="custom pagination table">
                            <thead>
                                <tr>
                                    <th>Ship status</th>
                                    <th>Times</th>
                                    <th>Total</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                            
                                {
                                    orders?.map((orders, index) => <tr>
                                          <td>  
                                            {orders.isDelivered === "pending" ? (
                                            "Pending"
                                            ) : orders.isDelivered === true ? (
                                            "Dispatched"
                                         ) : orders.isDelivered === false ? (
                                            "Delivery"
                                            ) : ("error")}
                                        
                                         </td>
                                        <td>{moment(orders.createdAt).fromNow()}</td>
                                        <td>${(orders.totalPrice).toLocaleString()}</td>
                                        </tr>)}
                                
                            </tbody>
                            <tfoot>
                                <tr>
                                <th colspan="2">Total</th>
                                <th>${income[0]?.total ? income[0]?.total:" "}</th>   
                                </tr>
                            </tfoot>
                        </table>

                    </>

                )}
            </StyledTransactions>
        </Root>
    );
};


export default Transactions;

const StyledTransactions = styled.div`
    background: rgb(48, 51, 78);
    color: rgba(234, 234, 255, 0.87);
    padding: 1rem;
    border-radius: 5px;
`;
const Transaction = styled.div`
 
 font-size: 14px;
 margin-top-1rem;
 padding: 0.5rem;
 border-radius: 3px;
 background: rgba(38, 198, 249, 0.12);
 
`;
const Root = styled('div')(
    ({ theme }) => `
    table {
      font-family: IBM Plex Sans, sans-serif;
      font-size: 0.875rem;
      border-collapse: collapse;
      width: 100%;
    }
  
    td,
    th {
      border: 1px solid ;
      text-align: left;
      padding: 8px;
    }
  
    th {
      background-color:rgba(102, 108, 255, 0.12) ;
    }
    `,
);


