import React from "react";
import axios from "axios";
import { format } from "timeago.js";
import down from "./icons8-download-64.png";
import "./message.css";

export default function Message({ message, own }) {
  // Function to determine the file type based on the file extension.
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

  // Function to handle downloading a file attached to the message.
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

  // Render the Message component.
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        {/* Display the text message if available */}
        {message.text && <p className="messageText">{message.text}</p>}
        {/* Display the file if available */}
        {message.file && (
          <div className="messageTextFile">
            {/* Display an image if the file is an image */}
            {getFileType(message.file.url) === "image" && (
              <img className="chatImg" src={message.file.url} alt="#" />
            )}
            {/* Display a PDF message if the file is a PDF */}
            {getFileType(message.file.url) === "pdf" && (
              <p>PDF: {message.file.public_id}</p>
            )}
            {/* Display a message for unknown file types */}
            {getFileType(message.file.url) === "unknown" && (
              <p>Unknown file type: {message.file.public_id}</p>
            )}
            {/* Button to trigger the file download */}
            <button className="class-button" onClick={handleDownload}>
              <img src={down} alt="" className="class-image" />
            </button>
          </div>
        )}
      </div>
      {/* Display the message timestamp */}
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
