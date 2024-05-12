import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        credentials: {}
    },
    reducers: {
        login: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        },
        logout: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        },
        updateUsername: (state, action) => {
            state.credentials.decoded.username = action.payload;
        }
    }
});

export const { login, logout, updateUsername } = userSlice.actions;

export const userData = (state) => state.user;

export default userSlice.reducer;
