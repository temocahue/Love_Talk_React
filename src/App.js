import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginRegisterForm from './LoginRegisterForm'
import UserContainer from './UserContainer'

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      loggedIn: false,
      loggedInUserEmail: null
    }
  }
  login = async (loginInfo) => {
    console.log(process.env);
    const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/users/login', {
      method: "POST",
      credential: 'include',
      body: JSON.stringify(loginInfo),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const parsedLoginResponse = await response.json()
    if (parsedLoginResponse.status.code === 200){
      this.setState({
        loggedIn: true,
        loggedInUserEmail: parsedLoginResponse.data.email
      })
    } else {
      console.log("Login Failed");
      console.log(parsedLoginResponse);
    }
  }
  register = async (registerInfo) => {
    const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/users/register/', {
      method: "POST",
      credential: 'include',
      body: JSON.stringify(registerInfo),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const parsedLoginResponse = await response.json()
    if (parsedLoginResponse.status.code === 201){
      this.setState({
        loggedIn: true,
        loggedInUserEmail: parsedLoginResponse.data.email
      })
    } else {
      console.log("Register Failed");
      console.log(parsedLoginResponse);
    }
  }
  render(){
    return(
      <div className="App">
      {
        this.state.loggedIn
        ?
        <UserContainer />
        :
        <LoginRegisterForm login={this.login} register={this.register}/>
      }
      </div>
    );
  }

}


export default App;
