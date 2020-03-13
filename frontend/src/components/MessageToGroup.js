import React from 'react'

const messageToGroup = ({ messageSubmit, messageChange }) => {
  return <form action="" className="form" onSubmit={messageSubmit}>
    <div className="field">
      <div className="control">
        <input
          type="text"
          name="message"
          className="input"
          placeholder="message..."
          onChange={messageChange}
        />
      </div>
    </div>
  </form>
}

export default messageToGroup