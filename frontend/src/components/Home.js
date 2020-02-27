import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Auth from '../lib/authMethods'

const Home = () => {

  const [groups, setGroups] = useState([])

  useEffect(() => {
    axios.get('/api/user', {
      headers: { Authorization: 'Bearer ' + Auth.getToken() }
    })
      .then(resp => {
        setGroups(resp.data.groups)
      })
  }, [])

  return <section className="section">
    {groups.map((group, i) => {
      return <div key={i}>
        {group.name}
      </div>
    })}
  </section>
}

export default Home