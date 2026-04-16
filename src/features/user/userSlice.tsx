import { createSlice } from '@reduxjs/toolkit';
import { logInUser, registerUser, updateUser } from '../api/accountAPI';
import type { UserProfile } from '../../utils/types';

export const initialState: UserProfile = {
    firstName: '',
    lastName: '',
    login: '',
    roles: [],
};


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearUser: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.fulfilled, (_state, action) => action.payload.user)
            .addCase(logInUser.fulfilled, (_state, action) => action.payload.user)
            .addCase(updateUser.fulfilled, (state, action) => {
                state.firstName = action.payload.firstName;
                state.lastName = action.payload.lastName;
            })
    }
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;