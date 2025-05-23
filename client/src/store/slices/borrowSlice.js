import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import { toggleRecoredBookPopup } from "./popupSlice";

const borrowSlice = createSlice({
    name : "borrow",
    initialState:{
        loading: false,
        error: null,
        message: null,
        userBorrowedBooks: [],
        allBorrowedBooks: [],
    },
    reducers:{
        fetchUserBorrowedBooksReqeest(state){
            state.loading = true;
            state.message = null;
            state.error = null;
        },
        fetchUserBorrowedBooksSuccess(state, action){
            state.loading = false;
            state.userBorrowedBooks = action.payload;
        },
        fetchUserBorrowedBooksFailed(state, action){
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },


        recordBookRequest(state){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        recordBookSuccess(state, action){
            state.loading = false;
            state.message = action.payload;
        },
        recordBookFailed(state, action){
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },


        fetchAllBorrowedBooksRequest(state){
            state.loading = true;
            state.message = null;
            state.error = null;
        },
        fetchAllBorrowedBooksSuccess(state, action){
            state.loading = false;
            state.allBorrowedBooks = action.payload;
        },
        fetchAllBorrowedBooksFailed(state, action){
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },


        returnBookRequest(state){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        returnBookSuccess(state, action){
            state.loading = false;
            state.message = action.payload;
        },
        returnBookFailed(state, action){
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },

        resetBorrowSlice(state){
            state.loading = false;
            state.error = null;
            state.message = null;
        }
    },
});

export const fetchUserBorrowedBooks = () => async(dispatch) => {
    dispatch(borrowSlice.actions.fetchUserBorrowedBooksReqeest());
    await axios.get("https://library-management-system-eight-sandy.vercel.app/api/v1/borrow/my-borrowed-books", {
        withCredentials: true,
    }).then((res) => {
        dispatch(borrowSlice.actions.fetchUserBorrowedBooksSuccess(res.data.borrowedBooks))
    }).catch((error) => {
        dispatch(borrowSlice.actions.fetchUserBorrowedBooksFailed(error.response.data.message));
    });
};

export const fetchAllBorrowedBooks = () => async(dispatch) => {
    dispatch(borrowSlice.actions.fetchAllBorrowedBooksRequest());
    await axios.get("https://library-management-system-eight-sandy.vercel.app/api/v1/borrow/borrowed-books-by-users", {
        withCredentials: true,
    }).then((res) => {
        dispatch(borrowSlice.actions.fetchAllBorrowedBooksSuccess(res.data.borrowedBooks))
    }).catch((error) => {
        dispatch(borrowSlice.actions.fetchAllBorrowedBooksFailed(error.response.data.message));
    });
};

export const recordBorrowBook = (email, id) => async(dispatch) => {
    dispatch(borrowSlice.actions.recordBookRequest());
    await axios.post(`https://library-management-system-eight-sandy.vercel.app/api/v1/borrow/record-borrow-book/${id}`, {email}, {
        withCredentials: true,
        headers: {
            "Content-Type" : "application/json"
        }
    }).then((res) => {
        dispatch(borrowSlice.actions.recordBookSuccess(res.data.message));
        dispatch(toggleRecoredBookPopup());
    }).catch((error) => {
        dispatch(borrowSlice.actions.recordBookFailed(error.response.data.message));
    });
};

export const returnBook = (email, id) => async(dispatch) => {
    dispatch(borrowSlice.actions.returnBookRequest());
    await axios.put(`https://library-management-system-eight-sandy.vercel.app/api/v1/borrow/return-borrowed-book/${id}`, {email}, {
        withCredentials: true,
        headers: {
            "Content-Type" : "application/json"
        }
    }).then((res) => {
        dispatch(borrowSlice.actions.returnBookSuccess(res.data.message))
    }).catch((error) => {
        dispatch(borrowSlice.actions.returnBookFailed(error.response.data.message));
    });
};

export const resetBorrowSlice = () => async(dispatch) => {
    dispatch(borrowSlice.actions.resetBorrowSlice());
};

export default borrowSlice.reducer;  