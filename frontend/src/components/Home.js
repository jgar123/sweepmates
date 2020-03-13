import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Auth from '../lib/authMethods'

const Home = (props) => {

  const [groups, setGroups] = useState([])

  useEffect(() => {
    axios.get('/api/user', {
      headers: { Authorization: 'Bearer ' + Auth.getToken() }
    })
      .then(resp => {
        setGroups(resp.data.groups)
      })
  }, [])

  function handleClick(e) {
    props.history.push(`/group/${e.target.id}`)
  }

  return <section className="section">
    <p className="title">groups</p>
    {groups.map((group, i) => {
      return <div key={i}>
        <div className="container" onClick={handleClick} id={group.id}>{group.name}</div>
      </div>
    })}
  </section>
}

export default Home