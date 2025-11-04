import React from 'react'
import authService from './appwrite/auth'
import {logout,login } from './store/authSlice'
import {useDispatch} from 'react-redux'
import {Header,Footer} from './components/index'
import {useEffect,useState} from 'react'
import './App.css'

function App() {

  const dispatch = useDispatch(); // it isused to dispatch actions to the redux store (connect with reduxStore)
  const [loading, setLoading] = useState(true);

  useEffect( ()=>{
    authService.getCurrentUser()
    .then(

    )
    .catch((error)=>{
      console.log("No user logged in");
    })
    .finally( ()=>{
      setLoading(false);
    } )
  },[])

  return (
    <>
      <h1 className="text-3xl font-bold underline">
      life is going on!...
      </h1>
    </>
  )
}

export default App
