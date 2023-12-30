import * as React from 'react';
import { DataGrid,} from '@mui/x-data-grid';
import {useSelector } from 'react-redux/es/hooks/useSelector';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux";
import moment from 'moment';
import { ordersEdit } from '../../slices/ordersSlice';
import { ordersDelete } from "../../slices/ordersSlice";


import styled from "styled-components";
import { ordersFetch } from '../../slices/ordersSlice';


export default function OrderList() {
const { list } = useSelector((state)=> state.orders)
const navigate = useNavigate();
const dispatch = useDispatch()

React.useEffect(()=>{
    dispatch(ordersFetch());

}, [dispatch]);
let rows =[]
if (Array.isArray(list)){
rows = list.map(order =>{
  
    return{
        id: order._id,
        cName: order.shippingAddress.fullName, //.name
        amount:(order.totalPrice)?.toLocaleString(),
        dStatus: order.isDelivered, 
        date: moment(order.createdAt).fromNow(),

        };
        
});
}

const columns = [
    { field: 'id', headerName: 'ID', width: 220 },
    { field: 'cName', headerName: 'Name', width: 120,
     },
    { field: 'amount', headerName: 'Amount($)', width: 100 },
    {
      field: 'dStatus',
      headerName: 'Status',
      width: 100,
      renderCell:(params)=>{
        return <div>
            
            {params.row.dStatus === "pending" ? (<Pending>Pending</Pending>):
            params.row.dStatus === true ? (<Dispathched>Dispatched</Dispathched>):
            params.row.dStatus === false ? (<Delivered>Delivered</Delivered>): ("error")}
        </div>;
    },
    },
    {
    field: 'date',
      headerName: 'Date',
      width: 120,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 220,
      renderCell:(params)=>{
        return <Actions>
                <DispatchBtn className='button' onClick={()=> handleOrderDispatch(params.row.id)}>Dispatched</DispatchBtn>
                <DeliveryBtn className='button' onClick={()=> handleOrderDelivery(params.row.id)}>Delivery</DeliveryBtn>
                <Delete className='button' onClick={()=>handleDelete(params.row.id)}> Delete </Delete>
                <View className='button' onClick={()=> navigate(`/orders/${params.row.id}`)}>View</View>
            </Actions>;       
        },
      
    },
  ];

  const handleOrderDispatch = (id) =>{
    dispatch(ordersEdit({
        id,
        isDelivered: true,
    }));
  }

  const handleOrderDelivery = (id) =>{
    dispatch(ordersEdit({
        id,
        isDelivered: false,
    }));
  }
  
  const handleDelete = (_id)=>{
    if (window.confirm('Are you sure to delete?')){
    dispatch(ordersDelete(_id));}
};
  return (
    <div style={{ height: 650, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}

const Actions =styled.div`
    width:100%;
    display:flex;
    justify-content: space-between;
    .button{
        border: none;
        outline: none;
        padding: 2px;
        color: white;
        border-radius: 3px;
        cursor: pointer;
        font-size:12px;
        color:black;

    };


`;

const DispatchBtn = styled.div`
    background-color: rgb(38, 198, 249);
    padding: 3px 5px;
  border-radius: 3px;
  cursor: pointer;
 `;

const DeliveryBtn = styled.div`
  background-color: rgb(102, 108, 255);
  padding: 3px 5px;
  border-radius: 3px;
  cursor: pointer;
`;
const View = styled.div`
  background-color: rgb(114, 255, 40);
  padding: 3px 5px;
  border-radius: 3px;
`;

const Pending = styled.div`
  color: grb(253, 181, 40);
  background-color: rgb(253, 181, 40, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;
const Dispathched = styled.div`
  color: grb(255, 64, 0);
  background-color: rgb(255, 64, 0, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;
const Delivered = styled.div`
  color: grb(38, 198, 249);
  background-color: rgb(38, 198, 249, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;
const Delete = styled.button`
background-color:rgb(255, 77, 77)
`;








