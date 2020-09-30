import React, { useReducer } from 'react';
// import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import SignupForm from './components/LoginForm/SignupForm'
import LoginForm from './components/LoginForm/LoginForm';
import HorizNavBar from './components/HorizNavBar';

//export const path = "http://localhost:8080/api"
export const userContext = React.createContext()

const initialState = { 
  isUserLoggedIn : false,
  userInfo :{
    username : '',
    email : ''
  }
}

const reducer = (state, action) => {
  switch(action.type){
    case 'signup':
      return {
        ...state,
        isUserLoggedIn : false        
      }
    case 'login-success':
      return {
        userInfo : {
          username : action.payload.username,
          email : action.payload.email
        },
        isUserLoggedIn : true
      }
    case 'login-failure':
      return {
        ...state,
        isUserLoggedIn : false
      }
    case 'reset':
      return initialState
    default:
      return state
  }
}

function App() {

  const [user, dispatch] = useReducer(reducer, initialState)

  return (
      <div className="App">
        
        <Router>
          <userContext.Provider value={{userState: user, userDispatch: dispatch}}>
            <Route path='/' exact component={HorizNavBar}/>
          </userContext.Provider>
          {/* <Route path='/' exact component={Homepage}/> */}
          <Route path="/login" component={LoginForm}/>
          <Route path='/signup' component={SignupForm}/>
        </Router>

        
      </div> 
  );
}

export default App;
