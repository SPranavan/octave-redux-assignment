import {createSlice} from '@reduxjs/toolkit';
import { UsersData } from '../FakeData';

//Creating Redux Slice
export const usersSlice = createSlice({
    name:"users",
    initialState: {
        value: UsersData, 
    },
    reducers:{
        addUser: (state, action) => {
            //Codes for adding user
        },
    }
})

export default usersSlice.reducer;