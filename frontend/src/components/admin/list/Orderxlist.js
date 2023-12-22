import * as React from 'react';
import { DataGrid,} from '@mui/x-data-grid';
import {useSelector } from 'react-redux/es/hooks/useSelector';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux";
import moment from 'moment';
import { ordersxEdit } from '../../slices/ordersxSlice';
import { ordersxDelete } from "../../slices/ordersxSlice";


import styled from "styled-components";
import { ordersxFetch } from '../../slices/ordersxSlice';


export default function OrderxList() {
const { list } = useSelector((state)=> state.ordersx)
const navigate = useNavigate();
const dispatch = useDispatch()

React.useEffect(()=>{
    dispatch(ordersxFetch());

}, [dispatch]);
let rows =[]
if (Array.isArray(list)){
  

 rows = list.map(orderx =>{
  
    return{
        id: orderx._id,
        fullName: orderx.fullName, //.name
        address:orderx.address,
        phoneN: orderx.phoneN,
        namex: orderx.namex,
        categoryx: orderx.categoryx,
        companyx:orderx.companyx,
        mesX: orderx.mesX,
        dStatus: orderx.isCall,

        date: moment(orderx.createdAt).fromNow(),

        };
        
});
}

const columns = [
    { field: 'id', headerName: 'ID', width: 120 },
    { field: 'fullName', headerName: 'FullName', width: 120,
     },
    { field: 'address', headerName: 'Address', width: 100 },
    { field: 'phoneN', headerName: 'Phone Number', width: 100 },
    { field: 'namex', headerName: 'Job', width: 100 },
    { field: 'categoryx', headerName: 'Country', width: 100 },
    { field: 'companyx', headerName: 'Company', width: 100 },
    { field: 'mesX', headerName: 'MessX', width: 100 },
    {
      field: 'dStatus',
      headerName: 'Status',
      width: 100,
      renderCell:(params)=>{
        return <div>
            
            {params.row.dStatus === "pending" ? (<Pending>Pending</Pending>):
            params.row.dStatus === true ? (<Dispathched>Call OK</Dispathched>):
            params.row.dStatus === false ? (<Delivered>Call wait</Delivered>): ("error")}
        </div>;
    },
    },
    {
    field: 'date',
      headerName: 'Date',
      width: 80,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 200,
      renderCell:(params)=>{
        return <Actions>
                <DispatchBtn className='button' onClick={()=> handleOrderDispatch(params.row.id)}>Change Status</DispatchBtn>
                
                <Delete className='button' onClick={()=>handleDelete(params.row.id)}> Delete </Delete>
                
            </Actions>;       
        },
      
    },
  ];

  const handleOrderDispatch = (id) =>{
    dispatch(ordersxEdit({
        id,
        isCall: true,
    }));
  }

  
  
  const handleDelete = (_id)=>{
    if (window.confirm('Are you sure to delete?')){
    dispatch(ordersxDelete(_id));}
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








