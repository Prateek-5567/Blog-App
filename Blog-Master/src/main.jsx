import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter , createRoutesFromElements, Route } from 'react-router-dom'

// const router = createBrowserRouter(
//     createRoutesFromElements(
//         <Route path='/' element={App}>

//         </Route>
//     )
// )

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
)
