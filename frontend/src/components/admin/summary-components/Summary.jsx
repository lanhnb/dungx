import { useState, useEffect } from "react";
import styled from "styled-components";
import { FaUsers, FaChartBar, FaClipboard } from "react-icons/fa";
import Widget from "./Widget";
import axios from "axios";
import { setHeaders, url } from "../../slices/api";
import Chart from "./Chart";
import Transactions from "./Transactions";
import AllTimeData from "./AllTimeData";




const Summary = () => {

  const [users, setUser] = useState([])
  const [usersPerc, setUsersPerc] = useState(0);
  const [orders, setOrders] = useState([]);
  const [ordersPerc, setOrdersPerc] = useState(0);
  const [income, setIncome] = useState([]);
  const [incomePerc, setIncomePerc] = useState(0)

  // console.log("users", orders);
  // console.log("ordersP", ordersPerc);


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
        setUsersPerc((res.data[0].total - res.data[1].total) / res.data[1].total * 100);

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
        setOrdersPerc((res.data[0].total - res.data[1].total) / res.data[1].total * 100);

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

        setIncome(res.data[0].total);
        setIncomePerc((res.data[0].total - res.data[1].total) / res.data[1].total * 100);
      } catch (err) {
        console.log(err)
      }

    }
    fetchData()
  }, [])


  const data = [
    {
      icon: <FaUsers />,
      digits: users[0]?.total,
      isMoney: false,
      title: "Users",
      color: "rgb(120, 108, 255)",
      bgcolor: "rgb(102 , 108, 255, 0.12)",
      percentage: usersPerc,
    },
    {
      icon: <FaChartBar />,
      digits: orders[0]?.total,
      isMoney: false,
      title: "Orders",
      color: "rgb(0, 191, 255)",
      bgcolor: "rgb(0, 191, 255, 0.12)",
      percentage: ordersPerc,
    },
    {
      icon: <FaClipboard />,
      digits: income,
      isMoney: true,
      title: "Earnings",
      color: "rgb(255, 191, 0)",
      bgcolor: "rgb(255, 191, 0, 0.12)",
      percentage: incomePerc,
    }

  ]
  return (
    <>

      <StyledSummary>
        <div className="row" id="home11">


          <div id="si2" className="w3-col s12 m8">

            <Overview>
              <Title>
                <h2> Overview</h2>
                <p>Compared to the previous month</p>
              </Title>
              <div id="si3" className="w3-col s12 m12">
                <WidgetWrapper>
                  {data?.map((data, index) => <Widget key={index} data={data} />)}
                </WidgetWrapper>
              </div>
            </Overview>

            <div id="si4" w3-col >
              <Chart />
            </div>
          </div>


          <div className="w3-col s12 m4">
            <SlideStats>
              <Transactions />

              <AllTimeData />
            </SlideStats>
          </div>

        </div>





      </StyledSummary >

    </>
  )
};

export default Summary;

const StyledSummary = styled.div`
div#si4 {

  


#si2{
  display:flex;
}
`;

const Title = styled.div`
  color: #f5deb3;
  p{
    font-size: 15px;
    color: rgb(234, 234, 255, 0.68);
  }
  h2{
    color:#fff;
  }
  
  `;


const WidgetWrapper = styled.div`
margin-top:-20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  `;
const SlideStats = styled.div`
margin-top:10px;
`;


const Overview = styled.div`
  width: 100%;
  background: rgb(68,51,78);
  padding: 1.5rem;
  height:170px;
  border-radius: 10px;
  display:flex;  
  flex-direction: column;
  justify-content: space-between;
`;
