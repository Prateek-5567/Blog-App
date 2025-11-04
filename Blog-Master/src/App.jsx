import React from 'react'
import authService from './appwrite/auth'
import {logout,login } from './store/authSlice'
import {useDispatch} from 'react-redux'
import {Header,Footer} from './components/index' 
import {useEffect,useState} from 'react'
import './App.css'
import {Outlet} from 'react-router-dom'

function App() {

  const dispatch = useDispatch(); // it is used to dispatch actions to the redux store (connect with reduxStore)
  const [loading, setLoading] = useState(true);

  useEffect( ()=>{
    authService.getCurrentUser()
    .then( (userData)=>{
      if(userData){
        dispatch(login(userData));
      }
      else{
        dispatch(logout());
      }
    })
    .catch((error)=>{
      console.log("No user logged in");
    })
    .finally( ()=>{
      setLoading(false);
    } )
  },[])
  // no dependency passed: call on mount. 

  return !loading?( 
    <>
      <div className='min-h-screen flex flex-wrap content-between bg-slate-900 text-slate-100'>
        <div className='w-full block'>
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </>
  ):(
    <div className="flex bg-slate-900 text-slate-100 justify-center items-center min-h-screen bg-transparent">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-slate-900 rounded-full animate-spin"></div>
    </div>
  )
}

export default App
