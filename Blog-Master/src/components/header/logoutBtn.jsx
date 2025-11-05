import React, { use } from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth' // this is a object (we need to access its methods as they define the backend logic)
import {logout} from '../../store/authSlice'

function logoutBtn() {

    const dispatch = useDispatch();
    const logoutHandler= () => {
        // authService.logout() returns a promise.
        authService.logout().then( ()=>{
            dispatch(logout());
        })
    }

    return (
    <button
        className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
        onClick={logoutHandler}>
            Logout
    </button>
    )
}

export default logoutBtn
