import { createSlice } from '@reduxjs/toolkit';

const initialState={
    user: null, //user state
    category: null, //selected category state
    storages: null, //storages state
    categoryItemsReservation: [], //selected items to be reserved
    reservation: {} //selected reservation preview
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
        },
        setStorages: (state, action) => {
            state.storages = action.payload;
        },
        setCategoryItemsReservation: (state, action) => {
            state.categoryItemsReservation = action.payload;
        },
        setReservation: (state, action) => {
            state.reservation = action.payload;
        }
    }
})

//dispatch
export const { setUser, setCategoryState, setStorages, setCategoryItemsReservation, setReservation } = appSlice.actions;

//selectors
export const selectUser = (state) => state.app.user;
export const selectCategory = (state) => state.app.category;
export const selectStorages = (state) => state.app.storages;
export const selectCategoryItemsReservation = (state) => state.app.categoryItemsReservation;
export const selectReservation = (state) => state.app.reservation;

export default appSlice.reducer;