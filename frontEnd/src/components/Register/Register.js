import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
//import axios from 'axios'
import SignPage from '../SignIn/SignPage'
import './Register.css'
import AccountKit from 'react-facebook-account-kit'
const sha256 = require('js-sha256')

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      password: ''
    }
    this
      .props
      .socket
      .on('registerReply', reply => {
        console.log(reply)
        if (reply === 'error') {
          console.log("invalid username or password")
        } else {
          this
            .props
            .getSignedIn()

        }
      })
  }

  register(event) {
    const payload = {
      "first_name": this.state.first_name,
      "last_name": this.state.last_name,
      "username": this.state.username,
      "email": this.state.email,
      "password": sha256.hex(this.state.password)
    }
    console.log("payload:",payload)
    this
      .props
      .socket
      .emit("registerRequest", payload)
  }

  render() {

    return (
      <div className="register">
        <div className="register-body">
          <div className="centered">
            <div>
              <MuiThemeProvider>
                <div>
                  <AppBar title="Register"/>
                  <TextField
                    hintText="Enter your First Name"
                    floatingLabelText="First Name"
                    onChange=
                    {(event,newValue) => this.setState({first_name:newValue})}/>
                  <br/>

                  <TextField
                    hintText="Enter your Last Name"
                    floatingLabelText="Last Name"
                    onChange=
                    {(event,newValue) => this.setState({last_name:newValue})}/>
                  <br/>

                  <TextField
                    hintText="Username"
                    floatingLabelText="Codechat Alias"
                    onChange=
                    {(event,newValue) => this.setState({Username:newValue})}/>
                  <br/>
                  <TextField
                    hintText="Enter your Email"
                    type="email"
                    floatingLabelText="Email"
                    onChange=
                    {(event,newValue) => this.setState({email:newValue})}/>
                  <br/>
                  <TextField
                    type="password"
                    hintText="Enter your Password"
                    floatingLabelText="Password"
                    onChange=
                    {(event,newValue) => this.setState({password:newValue})}/>
                  <br/>
                  <RaisedButton
                    label="Submit"
                    primary={true}
                    style={style}
                    onClick={() => this.register()}/>
                  <RaisedButton
                    label="Clear"
                    primary={true}
                    style={style}
                    onClick={(event) => this.handleClick(event)}/>

                </div>

              </MuiThemeProvider>

            </div>
          </div>
        </div>

      </div>

    )

  }
}
const style = {
  margin: 15
}

export default Register
