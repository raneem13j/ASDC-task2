import "./message.css";
import { format } from "timeago.js";
import {Link} from "react";
import React from "react";

export default function Message({ message, own }) {
  const getFileType = (url) => {
    const extension = url.split(".").pop();
    // You can add more file types as needed
    if (["png", "jpg", "jpeg", "gif"].includes(extension)) {
      return "image";
    } else if (extension === "pdf") {
      return "pdf";
    }
    return "unknown";
  };

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        {message.text && <p className="messageText">{message.text}</p>}
        {message.file && (
          <div className="messageTextFile">
            {getFileType(message.file.url) === "image" && (
              <img className="chatImg" src={message.file.url} alt="Image" />
            )}
            {getFileType(message.file.url) === "pdf" && (
              <p>PDF: {message.file.url}</p>
            )}
            {getFileType(message.file.url) === "unknown" && (
              <p>Unknown file type: {message.file.url}</p>
            )}
          </div>
        )}
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
