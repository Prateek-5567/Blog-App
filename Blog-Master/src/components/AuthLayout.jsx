import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

// file name and exporting function name may be diffrent.
export default function Protected({children, authentication = true}) {
    // authentication parameter is optional. (both cases covered.)

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        //TODO: make it more easy to understand

        // if (authStatus ===true){
        //     navigate("/")
        // } else if (authStatus === false) {
        //     navigate("/login")
        // }
        
        //let authValue = authStatus === true ? true : false

        if(authentication && authStatus !== authentication){
            navigate("/login")
        } else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])
    // dependencies is important here... , when you navigate from one page to another then useEffect runs this function => authentication check takes place.

  return loader? <h1> Loading... </h1> : <div>{children}</div>;
}
// purpose : conditional rendering of children ; if auth = true => render .

//. ittu sa kaam h bass : authenticated user hai to home pe le jao nahi to login page pe le jao ;
// authentication means : this user exists in database , email-password matches and is safely logged in..
