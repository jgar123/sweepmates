import React from 'react'

const GroupMessages = ({ messages }) => {
  console.log(messages)
  return <section className="section" id="message-section">
    {messages.map((message, i) => {
      return <p key={i}>{message.text}</p>
    })}
  </section>
  
}

export default GroupMessages