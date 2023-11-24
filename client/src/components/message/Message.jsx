import "./message.css";
import React from 'react'

function Message({own}) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <p className="messageText">dfgdfhsdfhd</p>
      </div>
      <div className="messageBottom">dgszdgsdg</div>
    </div>
  )
}

export default Message
