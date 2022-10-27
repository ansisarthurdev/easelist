import { createSlice } from '@reduxjs/toolkit';

const initialState={
    user: null,
    category: null
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setCategoryState: (state, action) => {
            state.category = action.payload;
        }
    }
})

//dispatch
export const { setUser } = appSlice.actions;
export const { setCategoryState } = appSlice.actions;

//selectors
export const selectUser = (state) => state.app.user;
export const selectCategory = (state) => state.app.category;

export default appSlice.reducer;