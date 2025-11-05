import {configureStore} from '@reduxjs/toolkit';
import postSlice from './postSlice';
import authSlice from './authSlice';

const store = configureStore({
    reducer:{
        posts: postSlice,
        auth: authSlice
    }
})
export default store;