import axios from "axios";
import { useEffect, useState } from "react";
import "./chatOnline.css";
import React from 'react'

function ChatOnline() {
  return (
    <div className="chatOnline">
        <div className="chatOnlineFriend" >
          <div className="chatOnlineImgContainer">
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">Jhon Doh</span>
        </div>
    </div>
  )
}

export default ChatOnline
