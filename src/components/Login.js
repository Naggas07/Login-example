import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import TweetHackServices from '../services/services'
import { WithAuthConsumer } from '../context/AuthContext';

class Login extends Component {
    state= {
        data: {
            email: '',
            password: '',
          },
          error: false, 
          loading: false
    }

    handleChange = (event) => {
        const { name, value} = event.target
    
        this.setState({
          data: {
            ...this.state.data,
            [name]: value
          }
        })
      }

    handleSubmit = (event) => {
        event.preventDefault()

        this.setState({loading: true, error: false}, () => {
            TweetHackServices.login({...this.state.data})
            .then(response => {
                debugger
                this.props.setUser(response.data)
            },
            () => {
                this.setState({error: true, loading: false})
            })
        })
    }

    render() { 
   
      if(this.props.currentUser){
        return <Redirect to="/home"/>
      }


        return ( 
            <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>

            <input
              value={this.state.data.email}
              onChange={this.handleChange}
              autoComplete="off"
              name="email"
              type="email"
              id="email"
              placeholder="Enter email"
            />
          </div>

          <div className="form-group mb-5">
            <label htmlFor="password">Password</label>

            <input
              value={this.state.data.password}
              onChange={this.handleChange}
              name="password"
              type="password"
              id="password"
              placeholder="Password"
            />
          </div>
              
          <button
            type="submit"
            className="btn btn-block btn-primary mb-3"
            disabled={this.state.loading}
          >
            Log in
          </button>

          <Link to="/register">Register</Link>
        </form>
      </div>
         );
    }
}
 
export default WithAuthConsumer(Login);