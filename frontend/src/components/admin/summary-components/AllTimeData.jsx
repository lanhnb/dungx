import { useSelector } from "react-redux/es/hooks/useSelector";
import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import { url, setHeaders } from "../../slices/api";

const AllTimeData = () => {

    const { items } = useSelector(state => state.products)
    const [users, setUser] = useState([])
    const [income, setIncome] = useState([]);
    const [orders, setOrders] = useState([]);
    function compare(a, b) {
        if (a.id < b.id) {
            return 1
        }
        if (a.id > b.id) {
            return -1
        }
        return 0;

    }

    // User Stats
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${url}/users/stats`, setHeaders())

        res.data.sort(compare)
        console.log(res.data)
        setUser(res.data);
        

      } catch (err) {
        console.log(err)
      }

    }
    fetchData()
  }, [])

    //Income Stats
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get(`${url}/orders/income`, setHeaders())

                res.data.sort(compare)
                setIncome(res.data);


            } catch (err) {
                console.log(err)
            }

        }
        fetchData()
    }, [])

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get(`${url}/orders/stats`, setHeaders())

                res.data.sort(compare)
                setOrders(res.data);


            } catch (err) {
                console.log(err)
            }

        }
        fetchData()
    }, [])


    return <Main>
        <h3> All Times</h3>
        <Infor>
            <Title>Users</Title>
            <Data>{users[0]?.total}</Data>
        </Infor>
        <Infor>
            <Title>Products</Title>
            <Data>{items.length}</Data>
        </Infor>
        <Infor>
            <Title>Orders</Title>
            <Data>{orders[0]?.total}</Data>
        </Infor>
        <Infor>
            <Title>Earnings</Title>
            <Data>${income[0]?.total ? income[0]?.total : " "}</Data>
        </Infor>
    </Main>
};

export default AllTimeData;

const Main = styled.div`
    background: rgb(48, 51, 78);
    color: rgba(234, 234, 255, 0.87);
    padding: 1rem;
    border-radius: 5px;
    font-size: 14px;
    margin-top:20px;
    
`;
const Infor = styled.div`
 display: flex;
 font-size: 14px;
 margin-top-1rem;
 padding: 0.5rem;
 border-radius: 3px;
 background: rgba(38, 198, 249, 0.12);
 &:nth-chid(even){
    background: rgba(102, 108, 255, 0.12);
 }
`;
const Title = styled.div`
 flex: 1;
 color:rgb(255, 255, 255);
 font-size: 14px;
`;
const Data = styled.div`
flex: 1;
 color:rgb(255, 255, 255);
 font-size: 14px;
`;
