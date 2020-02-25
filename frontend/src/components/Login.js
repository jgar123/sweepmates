import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Auth from '../lib/authMethods'


const initialData = {
  username: '',
  password: ''
}

const Login = (props) => {

  const [loginData, setLoginData] = useState(initialData)

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('/api/login', loginData)
      .then(resp => {
        Auth.setToken(resp.data.token)
        props.history.push('/home')
      })
  }

  const handleChange = (e) => {
    const newData = { ...loginData, [e.target.name]: e.target.value }
    setLoginData(newData)
  }

  return (
    <section className="hero is-success is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="title">login.</div>
          <form action="" className="form" onSubmit={handleSubmit}>
            <div className="field">
              <div className="control">
                <input
                  type="text"
                  name="username"
                  className="input"
                  placeholder="Enter username"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <input
                  type="text"
                  name="password"
                  className="input"
                  placeholder="Enter password"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="control">
              <button className="button is-success"></button>
            </div>
          </form>
        </div>
      </div>
      <div className="button"><Link to="/register">No account? Register here.</Link></div>
    </section> 
  )
}

export default Login