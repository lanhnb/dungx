import * as React from 'react';
import { DataGrid,} from '@mui/x-data-grid';
import {useSelector } from 'react-redux/es/hooks/useSelector';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux";
import moment from 'moment';
import { contactEdit } from '../../slices/contactSlice';
import { contactDelete } from "../../slices/contactSlice";


import styled from "styled-components";
import { contactFetch } from '../../slices/contactSlice';


export default function OrderxList() {
const { list } = useSelector((state)=> state.contact)
const navigate = useNavigate();
const dispatch = useDispatch()

React.useEffect(()=>{
    dispatch(contactFetch());

}, [dispatch]);
let rows =[]
if (Array.isArray(list)){
  

 rows = list.map(contact =>{
  
    return{
        id: contact._id,
        namex: contact.namex, //.name
        email:contact.email,
        phone: contact.phone,
        desc: contact.desc,
        dStatus: contact.isCall,
        

        date: moment(contact.createdAt).fromNow(),

        };
        
});
}

const columns = [
    { field: 'id', headerName: 'ID', width: 120 },
    { field: 'namex', headerName: 'Name', width: 120,
     },
    { field: 'phone', headerName: 'Phone Number', width: 100 },
    { field: 'email', headerName: 'Email', width: 100 },
    { field: 'desc', headerName: 'Description', width: 100 },
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
                <DispatchBtn className='button' onClick={()=> handleContactDispatch(params.row.id)}>Call Status</DispatchBtn>
                
                <Delete className='button' onClick={()=>handleDelete(params.row.id)}> Delete </Delete>
                
            </Actions>;       
        },
      
    },
  ];

  const handleContactDispatch = (id) =>{
    dispatch(contactEdit({
        id,
        isCall: true,
    }));
  }

  
  
  const handleDelete = (_id)=>{
    if (window.confirm('Are you sure to delete?')){
    dispatch(contactDelete(_id));}
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








