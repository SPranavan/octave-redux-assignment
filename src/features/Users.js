import {createSlice} from '@reduxjs/toolkit';
import { UsersData } from '../UsersData';

//Creating Redux Slice
export const usersSlice = createSlice({
    name:"users",
    initialState: {
        value: UsersData, 
    },
    reducers:{
        addUser: (state, action) => {
            state.value.push(action.payload);
        },
        deleteUser:(state, action)=>{
            state.value=state.value.filter((user)=>user.id !== action.payload.id)
        },
        resetUser: (state) => {
            state.value = [];
        }
    }
})

export const {resetUser} = usersSlice.actions;
export const {deleteUser} = usersSlice.actions;
export const {addUser} = usersSlice.actions;
export default usersSlice.reducer;