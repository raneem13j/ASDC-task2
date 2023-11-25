import "./message.css";
import axios from "axios";
import { format } from "timeago.js";
import React from "react";
import down from "./icons8-download-64.png";

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

  const handleDownload = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/message/download/${message.file.public_id}`,
        {
          responseType: "blob",
        }
      );

      // Create a blob from the response and generate a download link
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      // Extracting the filename from the URL or using a default name
      const filename = message.file.url.substring(
        message.file.url.lastIndexOf("/") + 1
      );
      link.setAttribute("download", filename);

      // Simulate a click to trigger the download
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file", error);
    }
  };

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        {message.text && <p className="messageText">{message.text}</p>}
        {message.file && (
          <div className="messageTextFile">
            {getFileType(message.file.url) === "image" && (
              <img className="chatImg" src={message.file.url} alt="#" />
            )}
            {getFileType(message.file.url) === "pdf" && (
              <p>PDF: {message.file.public_id}</p>
            )}
            {getFileType(message.file.url) === "unknown" && (
              <p>Unknown file type: {message.file.public_id}</p>
            )}
            <button className="class-button" onClick={handleDownload}>
              <img src={down} alt="" className="class-image" />
            </button>
          </div>
        )}
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
