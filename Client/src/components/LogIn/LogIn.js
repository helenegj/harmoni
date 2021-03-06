//@flow
import * as React from 'react';
import { Component } from 'react';
import { PublicService } from '../../services/publicService.js';
import { string } from 'prop-types';
import './stylesheet.css';

/**
 * Component for login-site
 */
export default class LogIn extends Component<{}, { email: string, password: string }> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: string,
      password: string,
    };
  }

  render() {
    return (
      <div id="logincard" class="main">
        <div class="card-body bg-light d-flex justify-content-center">
          <form onSubmit={e => this.post(e)}>
            <p className="display-4 text-uppercase text-center m-4 border-bottom">logg inn</p>
            <div class="form-group text-center ml-5 mr-5">
              <p id="alert" style={{ color: 'red' }} hidden="true">
                Bruker ikke funnet, sjekk passord og email og prøv på nytt
              </p>
              <label for="inputEmail1">Brukernavn (e-post)</label>
              <input
                type="email"
                onChange={e => this.changeEmail(e)}
                name="email"
                class="form-control"
                id="inputEmail1"
                aria-describedby="emailHelp"
                placeholder="Skriv e-post"
                required
              ></input>
            </div>
            <div class="form-group text-center ml-5 mr-5">
              <label for="inputPassword1" className="">
                Passord
              </label>
              <input
                type="password"
                onChange={e => this.changePassword(e)}
                name="password"
                minlength="8"
                class="form-control"
                id="inputPassword1"
                placeholder="Passord"
                required
              ></input>
            </div>
            <div class="form-group text-center ml-5 mr-5">
              <label class="form-label" for="check1">
                <a href="/password">Glemt passord?</a>
              </label>
              <button type="submit" class="btn btn-success mr-3 ml-3">
                Logg inn
              </button>
            </div>
            <div class="form-group text-center ml-5 mr-5">
              <label for="profileNew" class="form-label">
                Har du ikke en konto? <a href="/register">Registrer deg her</a>
              </label>
            </div>
          </form>
        </div>
      </div>
    );
  }

  /**
   * Sets email state
   * @param e the input element
   */
  changeEmail(e: any) {
    const target = e.target;
    let value: string = target.value;
    this.setState({ email: value });
  }

  /**
   * Sets the password state
   * @param e the input element
   */
  changePassword(e: any) {
    const target = e.target;
    let value: string = target.value;
    this.setState({ password: value });
  }

  /**
   * Try to login the user.
   * If the information is valid the user is redirected to the profile page, if not an alert is displayed.
   * @param e the login-button
   */
  post(e: any) {
    e.preventDefault();
    //Logging in and returning nessesary information
    PublicService.logIn(this.state.email, this.state.password)
      .then(response => {
        localStorage.setItem('token', response.data.jwt);
        localStorage.setItem('userType', response.data.type);
        response.data.type == 'admin'
          ? (window.location = '/admin')
          : (window.location = '/profile');
      })
      //Catches errors and sets alert
      .catch(error => {
        // $FlowFixMe
        document.getElementById('alert').hidden = false;
      });
  }
}
