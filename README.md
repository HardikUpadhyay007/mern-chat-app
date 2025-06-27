# MERN Chat App

A real-time chat application built with the MERN stack (MongoDB, Express, React, Node.js) and Socket.IO.

## Features

-   User login (demo users: `alice`, `bob`)
-   Real-time messaging with Socket.IO
-   Messages stored in MongoDB
-   Simple and clean UI (React)

---

## Prerequisites

-   Node.js (v16+ recommended)
-   npm (comes with Node.js)
-   MongoDB database (local or cloud, e.g., MongoDB Atlas)

---

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd mern-chat-app
```

### 2. Set up environment variables

Create a `.env` file inside the `server` folder:

```
MONGODB_URI=your_mongodb_connection_string
```

### 3. Install dependencies

#### Server

```bash
cd server
npm install
```

#### Client

```bash
cd ../client
npm install
```

### 4. Run the application

#### Start the server

```bash
cd ../server
npm start
```

The server will run on [http://localhost:5000](http://localhost:5000)

#### Start the client

```bash
cd ../client
npm start
```

The client will run on [http://localhost:3000](http://localhost:3000)

---

## Usage

1. Open [http://localhost:3000](http://localhost:3000) in your browser in two seperate browsers and choose one name and start chatting.
2. Log in as `alice` or `bob`.
3. Start chatting in real time!

---

## Project Structure

```
mern-chat-app/
  client/      # React frontend
  server/      # Express backend, MongoDB, Socket.IO
```

-   **client/**: React app (UI, connects to backend via REST and Socket.IO)
-   **server/**: Express API, MongoDB models, Socket.IO for real-time chat

---

## How it works

-   The server exposes REST endpoints for login and fetching messages.
-   Socket.IO is used for real-time message delivery.
-   Messages are stored in MongoDB.
-   The client connects to the server via REST and WebSocket (Socket.IO).

---

## License

MIT
