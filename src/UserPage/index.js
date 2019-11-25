import React, { Component } from 'react';

class UserPage extends Component {
    constructor(){
        super()
        this.state = {
        user: null
        }
    }
    componentDidMount(){
        this.login();
    }
   login = async (loginInfo) => {
    console.log('THIS IS THE APP.JS in the login')
    // console.log(process.env.REACT_APP_API_URL);
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
        user: parsedLoginResponse.data
      })
    } else {
      console.log("Login Failed");
      console.log(parsedLoginResponse);
    }
  }

    render() {
        return( 
            <div>
                <h1>this is users page</h1>

            </div>
        )
    }
}

export default UserPage;
