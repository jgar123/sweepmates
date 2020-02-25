import React, { useState } from 'react'
import axios from 'axios'

const initialData = {
  username: '',
  password: '',
  passwordConfirmation: ''
}

const Register = (props) => {

  const [registerData, setRegisterData] = useState(initialData)

  const handleChange = (e) => {
    const newData = { ...registerData, [e.target.name]: e.target.value }
    setRegisterData(newData)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('/api/register', registerData)
      .then(() => {
        props.history.push('/')
      })
  }

  return <section className="hero is-success is-fullheight">
    <div className="hero-body">
      <div className="container">
        <div className="title">register.</div>
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
          <div className="field">
            <div className="control">
              <input
                type="text"
                name="passwordConfirmation"
                className="input"
                placeholder="Confirm password"
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
  </section>
}

export default Register