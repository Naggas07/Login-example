import React, { Component } from 'react';
import { WithAuthConsumer } from '../context/AuthContext';
import { Redirect } from 'react-router-dom';
import services from '../services/services';

class Register extends Component {
  state = {
    data: {
      username: "",
      name: "",
      email: "",
      password: "",
      avatar: null
    },
    loading: false,
    error: false,
    success: false
  };


  handleChange = (event) => {
    const { name, value, files} = event.target

    this.setState({
      data: {
        ...this.state.data,
        [name]: files? files[0] : value
      }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData()

    // const {data} = this.state

    formData.append('username', this.state.data.username)
    formData.append('name', this.state.data.name)
    formData.append('email', this.state.data.email)
    formData.append('password', this.state.data.password)
    formData.append('avatar', this.state.data.avatar)

   this.setState({loading: true, error: false},() => {
       services.register(formData)
       .then(() => {
           this.setState({success: true})
       }).catch(() => {
           this.setState({success: false})
       })
   })
  }


  render() {

    if(this.state.success){
        return <Redirect to="/login" />
    }

    return (
      <div className="Register">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">username</label>

            <input
              value={this.state.data.username}
              onChange={this.handleChange}
              autoComplete="off"
              name="username"
              type="text"
              id="username"
              placeholder="Enter username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">name</label>

            <input
              value={this.state.data.name}
              onChange={this.handleChange}
              autoComplete="off"
              name="name"
              type="text"
              id="name"
              placeholder="Enter name"
            />
          </div>

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

          <div className="form-group mb-5">
            <label htmlFor="avatar">avatar</label>

            <input
              onChange={this.handleChange}
              name="avatar"
              type="file"
              id="avatar"
            />
          </div>

          <button
            type="submit"
            className="btn btn-block btn-primary mb-3"
            disabled={this.state.loading}
          >
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default  WithAuthConsumer(Register) ;
