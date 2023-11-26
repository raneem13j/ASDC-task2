# Real Time Chat Multiple Users Rooms

**Description:** A real-time messaging application built with the MERN stack, utilizing Socket.IO for real-time communication, user status tracking (online/offline), and notifications. The project includes three main folders: `server`, `client`, and `socket`. Follow the instructions below to set up and run each component separately.

## Server

### Installation

1. Navigate to the `server` folder in the terminal.

    ```bash
    cd server
    ```

2. Create a `.env` file in the `server` folder and add the following credentials:

    ```env
    PORT=5000
    NODE_ENV=development
    MONGO_URL=<Your MongoDB URL>
    CLOUDINARY_CLOUD_NAME=<Your Cloudinary Cloud Name>
    CLOUDINARY_API_KEY=<Your Cloudinary API Key>
    CLOUDINARY_API_SECRET=<Your Cloudinary API Secret>
    ```

3. Install dependencies.

    ```bash
    npm install
    ```

4. Run the server.

    ```bash
    nodemon server.js
    ```

### Usage

- The server provides API routes, models, controllers, and authentication.
- Utilizes Cloudinary and Multer for file (images and PDF) upload and download.

## Client

### Installation

1. Navigate to the `client` folder in the terminal.

    ```bash
    cd client
    ```

2. Install dependencies.

    ```bash
    npm install
    ```

3. Run the client.

    ```bash
    npm start
    ```

### Usage

- Login and register on the initial pages.
- Access the messenger page to view available rooms.
- Join a room to send and receive real-time messages.
- Uses Socket.IO client for messaging, online user tracking, and notifications.

## Socket

### Installation

1. Navigate to the `socket` folder in the terminal.

    ```bash
    cd socket
    ```

2. Install dependencies.

    ```bash
    npm install
    ```

3. Run the Socket server.

    ```bash
    nodemon index.js
    ```

### Usage

- The `socket` folder contains the Socket.IO server and functions for real-time messaging, notifications, and online user tracking.

## Note

- Ensure that each component (server, client, and socket) is running separately for the complete functionality of the real-time messaging application.
- Make sure to replace placeholder values in the `.env` files with your actual credentials.

Feel free to reach out for any questions or issues!
