//@flow

import * as React from 'react';
import { Component } from 'react';
import './stylesheet.css';
import events from "../data.js";

export default class LogIn extends Component {
    render() 
    {  
       return ( 
        <div class="loginBox">
        <form>
            <div class="form-group">
                <label for="exampleInputEmail1" class="loginText">Email</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1" class="loginText">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"></input>
            </div>
            <div class="form-check p-2">
                <input type="checkbox" class="form-check-input" id="exampleCheck1"></input>
                <label class="form-check-label" for="exampleCheck1">Jeg godkjenner deres vilkår {events[0].name}</label>
            </div>
            <button type="submit" class="btn btn-success">Logg inn</button>
        </form>
        </div>
        )
    }
}