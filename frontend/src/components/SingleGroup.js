import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Auth from '../lib/authMethods'

import MessageToGroup from './MessageToGroup'
import GroupMessages from './GroupMessages'

const initialGroup = { messages: [], name: '' }

const SingleGroup = (props) => {

  const [group, setGroup] = useState(initialGroup)
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  function messageChange(e) {
    setMessage(e.target.value)
  }

  function messageSubmit(e) {
    e.preventDefault()
    axios.post(`/api/group/${props.match.params.id}/newmessage`, 
      { text: message } , 
      { headers: { Authorization: 'Bearer ' + Auth.getToken() } 
      })
      .then(() => {
        setSent(true)
        setSent(false)
      })
  }

  useEffect(() => {
    axios.get(`/api/group/${props.match.params.id}`, {
      headers: { Authorization: 'Bearer ' + Auth.getToken() }
    })
      .then(resp => {
        setGroup(resp.data)
      })
  }, [sent])

  return <section className="section">
    <p className="title">{group.name}</p>

    <GroupMessages messages={group.messages} />

    <MessageToGroup messageSubmit={messageSubmit} messageChange={messageChange} />

  </section>

}

export default SingleGroup