import React, { Component } from 'react';
import SignIn from '../Components/SignIn/SignIn';
import Name from '../Components/Name/Name';
import Navigation from '../Components/Navigation/Navigation';
import Filterinput from '../Components/Filterinput/Filterinput';
import About from '../Components/About/About';
import Scroll from '../Components/Scroll/Scroll';
import Cards from '../Components/Cards/Cards';
import Register from '../Components/Register/Register';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      route: 'signin',
      isSignedIn: false,
      isAbout: false,
      isRegister: false,
      filterinput: '',
      cards: [],
      inputPassword: '',
      inputEmail: '',
      inputName: ''
    }
  }
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then(response => response.json())
      .then(photos => this.setState({ cards: photos }));
  }
  // componentDidMount() {
  //   fetch('http://localhost:3000/')
  //     .then(response => response.json())
  //     .then(console.log);
  // }
  onSearchChange = (event) => {
    this.setState({ filterinput: event.target.value })
  }
  onPasswordChange = (event) => {
    this.setState({ inputPassword: event.target.value })
    console.log(this.state.inputPassword);
  }
  onEmailChange = (event) => {
    this.setState({ inputEmail: event.target.value })
  }
  onNameChange = (event) => {
    this.setState({ inputName: event.target.value })
  }
  onRouteChange = (route) => {
    if (route === 'signin') {
      this.setState({ isSignedIn: false });
      this.setState({ isRegister: false });
      this.setState({ isAbout: false });
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    } else if (route === 'about') {
      this.setState({ isAbout: true })
      this.setState({ isSignedIn: false })
    } else if (route === 'register') {
      this.setState({ isRegister: true })
      this.setState({ isSignedIn: false })
    }
    this.setState({ route: route });
  }

  onRegisterClick = () => {
    fetch('https://serene-plateau-03206.herokuapp.com/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: this.state.inputName,
        email: this.state.inputEmail,
        password: this.state.inputPassword
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data === 'some data is not filled in') {
          window.alert('Fill all in please');
          this.onRouteChange('register');
        } else {
          window.alert('Registration successful');
          this.onRouteChange('home');
        }
      })
  }

  onSignInClick = () => {
    fetch('https://serene-plateau-03206.herokuapp.com/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        password: this.state.inputPassword
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data === 'error loggin in') {
          window.alert('The password is not correct');
        } else if (data === 'the password is not filled in') {
          window.alert('The password must be filled in');
        } else {
          window.alert('The password is correct, wait a sec...');
          this.onRouteChange('home');
        }
      })
  }


  render() {
    const filteredCards = this.state.cards.filter(item => {
      return item.title.toLowerCase().includes(this.state.filterinput.toLowerCase());
    });
    return (
      this.state.route === 'signin'
        ?
        <div className="app">
          <Navigation
            isSignedIn={this.state.isSignedIn}
            isAbout={this.state.isAbout}
            isRegister={this.state.isRegister}
            routeChange={this.onRouteChange}
          />
          <Name className='center' />
          <SignIn
            passwordChange={this.onPasswordChange}
            signinClick={this.onSignInClick}
          />

        </div>
        :
        (
          this.state.route === 'register'
            ?
            <div className="app">
              <Navigation
                isSignedIn={this.state.isSignedIn}
                isAbout={this.state.isAbout}
                isRegister={this.state.isRegister}
                routeChange={this.onRouteChange}
              />
              <Register
                passwordChange={this.onPasswordChange}
                emailChange={this.onEmailChange}
                nameChange={this.onNameChange}
                registerClick={this.onRegisterClick}
              />
            </div>
            : (
              this.state.route === 'home'
                ?
                <div className="app">
                  <Navigation
                    isSignedIn={this.state.isSignedIn}
                    isAbout={this.state.isAbout}
                    isRegister={this.state.isRegister}
                    routeChange={this.onRouteChange}
                  />
                  <Filterinput searchChange={this.onSearchChange} />
                  <Scroll>
                    <Cards cards={filteredCards} />
                  </Scroll>
                </div>
                : (
                  this.state.route === 'about'
                    ?
                    <div className="app">
                      <Navigation
                        isSignedIn={this.state.isSignedIn}
                        isAbout={this.state.isAbout}
                        isRegister={this.state.isRegister}
                        routeChange={this.onRouteChange}
                      />
                      <About />
                    </div>
                    :
                    <div className="app">
                      <Navigation
                        isSignedIn={this.state.isSignedIn}
                        isAbout={this.state.isAbout}
                        isRegister={this.state.isRegister}
                        routeChange={this.onRouteChange}
                      />
                      <Name className='center' />
                      <SignIn
                        passwordChange={this.onPasswordChange}
                        signinClick={this.onSignInClick}
                      />
                    </div>
                )
            )
        )
    );
  }
}

export default App;
