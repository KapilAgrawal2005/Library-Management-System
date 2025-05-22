import {createSlice} from "@reduxjs/toolkit";
import { toggleAddBookPopup } from "./popupSlice";
import axios from "axios";
import { toast } from "react-toastify";
const bookSlice = createSlice({
    name: "book",
    initialState:{
        loading: false,
        error: null,
        message: null,
        books: [],
    },
    reducers:{
        fetchBooksRequest(state){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        fetchBooksSuccess(state, action){
            state.loading = false;
            state.books = action.payload;
        },
        fetchBooksFailed(state, action){
            state.loading = false;
            state.error = action.payload;
        },
        

        addBookRequest(state){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        addBookSuccess(state, action){
            state.loading = false;
            state.message = action.payload;
            state.error = null;
        },
        addBookFailed(state, action){
            state.loading = false;
            state.error = action.payload;
        },

        
        deleteBookRequest(state){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        deleteBookSuccess(state, action){
            state.loading = false;
            state.message = action.payload;
        },
        deleteBookFailed(state, action){
            state.loading = false;
            state.error = action.payload;
        },

        resetBookSlice(state){
            state.loading = false;
            state.error = null;
            state.message = null;
        },

    },
});


export const fetchAllBooks = () => async(dispatch) => {
    dispatch(bookSlice.actions.fetchBooksRequest());
    await axios.get("https://library-management-system-eight-sandy.vercel.app/api/v1/books/allbooks", {
        withCredentials: true
    }).then((res) => {
        dispatch(bookSlice.actions.fetchBooksSuccess(res.data.books));
    }).catch((error) => {
        dispatch(bookSlice.actions.fetchBooksFailed(error.response.data.message));
    })
};

export const addBook = (data) => async(dispatch) => {
    dispatch(bookSlice.actions.addBookRequest());
    await axios.post("https://library-management-system-eight-sandy.vercel.app/api/v1/books/admin/addbook", data, {
        withCredentials: true,
        header:{
            "Content-Type" : "application/json"
        },
    }).then((res) => {
        dispatch(bookSlice.actions.addBookSuccess(res.data.message));
        toast.success(res.data.message);
        dispatch(toggleAddBookPopup());
        dispatch(fetchAllBooks());
    }).catch((error) => {
        dispatch(bookSlice.actions.addBookFailed(error.response.data.message));
    })
};

export const deleteBook = (bookId) => async(dispatch) => {
    dispatch(bookSlice.actions.deleteBookRequest());
    await axios.delete(`https://library-management-system-eight-sandy.vercel.app/api/v1/books/admin/deletebook/${bookId}`, {
        withCredentials: true,
    }).then((res) => {
        dispatch(bookSlice.actions.deleteBookSuccess(res.data.message));
        toast.success(res.data.message);
        dispatch(fetchAllBooks());
    }).catch((error) => {
        dispatch(bookSlice.actions.deleteBookFailed(error.response.data.message));
    });
};

export const resetBookSlice = () => (dispatch) =>{
    dispatch(bookSlice.actions.resetBookSlice());
};

export default bookSlice.reducer;