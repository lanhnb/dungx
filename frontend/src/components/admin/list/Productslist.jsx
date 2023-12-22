import * as React from 'react';
import { DataGrid,} from '@mui/x-data-grid';
import {useSelector } from 'react-redux/es/hooks/useSelector';
import { useNavigate } from 'react-router-dom';
import { productsDelete} from "../../slices/productsSlice";
import {useDispatch} from "react-redux";


import styled from "styled-components";
import EditProduct from '../EditProducts';


export default function ProducsList() {
const { items } = useSelector((state)=> state.products)
const navigate = useNavigate();
const dispatch = useDispatch()

const rows = items && items.map(item =>{
    return{
        id: item._id ?? 0,
        image: item.image,
        pName: item.name,
        pDesc: item.description,
        price:item.price.toLocaleString()
    }
})


const columns = [
    { field: '_id', headerName: 'ID', width: 220 },
    { field: 'image', headerName: 'Image', width: 80,
    renderCell:(params)=>{
        return(
            <ImageContainer>
                <img src={params.row.image[0]?.url} alt =""/>
            </ImageContainer>
        )
    } },
    { field: 'pName', headerName: 'Name', width: 130 },
    {
      field: 'pDesc',
      headerName: 'Decs',
      width: 130,
    },
    {
    field: 'price',
      headerName: 'Price',
      width: 80,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 170,
      renderCell:(params)=>{
        return(
            <Actions>
                
                <Delete className='button' onClick={()=>handleDelete(params.row.id)}> Delete </Delete>
                <EditProduct productId = {params.row.id}/>
                
                <View className='button' onClick={()=> navigate(`/productdetail/${params.row.id}`)}> View </View>
                
            </Actions>
        )
    } 
    
    },
  ];
   const handleDelete = (_id)=>{
    if (window.confirm('Are you sure to delete?')){
    dispatch(productsDelete(_id));}
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

const ImageContainer = styled.div`
  img{
    width:80px;
  }
  
  `;

const Actions =styled.div`
    width:100%;
    display:flex;
    justify-content: space-between;
    .button{
        border: none;
        outline: none;
        padding: 5px;
        color: white;
        border-radius: 3px;
        cursor: pointer;

    };


`;
const Delete = styled.div`
    background-color:rgb(255, 77, 77)
`;

const View = styled.div`
    background-color:rgb(114, 255, 40)
`;




