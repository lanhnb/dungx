import * as React from 'react';
import { DataGrid,} from '@mui/x-data-grid';
import {useSelector } from 'react-redux/es/hooks/useSelector';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux";
import { useEffect } from 'react';
import { usersFetch } from "../../slices/usersSlice";
import styled from "styled-components";
import { userDelete } from "../../slices/usersSlice";

export default function UserList() {
    const { list } = useSelector((state)=> state.users)
    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() =>{
        dispatch(usersFetch());

    }, [dispatch]);

    const rows = list && list.map(user =>{
        return{
            id: user._id,
            uName: user.name,
            uEmail: user.email,
            isAdmin: user.isAdmin,
        };
    });


    const columns = [
        { field: 'id', headerName: 'ID', width: 220 },
        { field: 'uName', headerName: 'Name', width: 150,
         },
        { field: 'uEmail', headerName: 'Email', width: 200 },
        {
        field: 'isAdmin',
        headerName: 'Role',
        width: 100,
        renderCell:(params)=>{
            return(
                <div>
                    {params.row.isAdmin ?( <Admin>Admin</Admin>):(
                        <Customer>Customer</Customer>
                    )}
                </div>
            )
        } 

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
                    <View className='button' onClick={()=> navigate(`/users/${params.row.id}`)}> View </View>
                    
                </Actions>
            );
        },
        
        },
    ];
    const handleDelete = (_id)=>{
        if (window.confirm('Are you sure to delete?')){
        dispatch(userDelete(_id));}
    };

    return (
        <div style={{ height: 400, width: '100%' }}>
        <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
            pagination: {
                paginationModel: { page: 0, pageSize: 5 },
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
            padding: 5px;
            color: white;
            border-radius: 3px;
            cursor: pointer;

        };


    `;
    const Delete = styled.button`
        background-color:rgb(255, 77, 77)
    `;

    const View = styled.button`
        background-color:rgb(114, 255, 40)
    `;
    const Customer = styled.div`
        color: grb(255, 64, 0);
        background-color: rgb(255, 64, 0, 0.12);
        padding: 3px 5px;
        border-radius: 3px;
        font-size: 14px;
        `;
    const Admin = styled.div`
        color: grb(38, 198, 249);
        background-color: rgb(38, 198, 249, 0.12);
        padding: 3px 5px;
        border-radius: 3px;
        font-size: 14px;
    `;
    const EditUsersBtn= styled.div`
    color: grb(255, 64, 0);
    background-color: rgb(255, 64, 0, 0.12);

    `




