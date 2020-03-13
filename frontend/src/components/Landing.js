import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Auth from '../lib/authMethods'

const Landing = (props) => {

  useEffect(() => {
    if (!Auth.isAuthorized()) {
      return
    } else {
      props.history.push('/home')
    }
  }, [])

  return <section className="hero is-success is-fullheight">
    <div className="hero-body">
      <div className="container">
        <div className="title">
          <Link to="/login">login</Link>
        </div>
        <p className="subtitle">or</p>
        <div className="title">
          <Link to="/register">register</Link>
        </div>
      </div>
    </div>
  </section>
}

export default Landing