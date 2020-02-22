import React, { useState, useEffect } from 'react'
import axios from 'axios'

const initialData = {
  username: '',
  password: ''
}

const Home = () => {

  const [loginData, setLoginData] = useState(initialData)

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('/api/login', loginData)
      .then(resp => {
        console.log(resp.data)
      })
  }

  const handleChange = (e) => {
    const newData = { ...loginData, [e.target.name]: e.target.value }
    setLoginData(newData)
  }

  return (
    <section className="hero is-success is-fullheight">
      <div className="hero-body">
        <div className="container has-text-centered">
          <div className="title">SWEEPMATES</div>
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
    </section>
  )
}

export default Home