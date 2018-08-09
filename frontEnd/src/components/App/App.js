import React, {Component} from 'react'
import './App.css'
import LandingPage from '../LandingPage/LandingPage'
import MainPage from '../MainPage/MainPage'
import Register from '../Register/Register'
import SignIn from '../SignIn/SignPage'
import Audio from '../Audio/Audio'

import io from 'socket.io-client'

// const socket = io('104.131.129.223:8080') // servers
const socket = io.connect('https://localhost:8080', {secure: true, reconnect: true});


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      register: false, //if false, go to sign in page, if true, go to login page
      chatting: true
    }
    this.signIn = this
      .signIn
      .bind(this)

    this.getSignedIn = this
      .getSignedIn
      .bind(this)

    this.switchToRegister = this
      .switchToRegister
      .bind(this)
    this.switchToLogin = this
      .switchToLogin
      .bind(this)
  }

  getRegister() {
    const register = localStorage.getItem('registered')
    let newState = this.state
    newState.register = true
    this.setState(newState)
  }
  switchToRegister() {
    console.log("switching register to true")
    let newState = this.state
    newState.register = false
    this.setState(newState)
  }
  switchToLogin() {
    console.log("switching register to false")
    let newState = this.state
    newState.register = true
    this.setState(newState)
  }

  getSignedIn() {
    console.log("signing in.")
    let state = this.state
    state.register = true
    this.setState(state)
  }

  signIn() {
    let state = this.state
    console.log(this.state)
    console.log(state)
    // state.chatting = true
    this.setState({chatting: true})
  }

  render() {
    /**
     * If signed in is true, then show main page.
     *  else, if register is true, show register page, otherwise show sign in page
     */
    return (this.state.chatting
      ? <MainPage {...this.props} socket={socket}/>
      : this.state.register
        ? <SignIn {...this.props} switchToRegister={this.switchToRegister} signIn={this.signIn} socket={socket}/>
        : <Register {...this.props} switchToLogin={this.switchToRegister}  switchToLogin={this.getSignedIn} socket={socket}/>)
  }
}

export default App
