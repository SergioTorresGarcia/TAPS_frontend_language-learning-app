import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        credentials: {}
    },
    reducers: {
        login: (state, action) => {
            state.credentials = action.payload.credentials;
        },
        logout: (state) => {
            state.credentials = null;
        },
        updateUsername: (state, action) => {
            state.credentials.decoded.username = action.payload;
        }
    }
});

export const { login, logout, updateUsername } = userSlice.actions;

export const userData = (state) => state.user;

export default userSlice.reducer;

