# react-itinerary-planner

React ⚛️ planner app with Node.js backend 📤, dynamic API ☁️ images, and react-beautiful-dnd interface 🖱️

## Installation

With the latest version of node.js and npm installed run the following commands from project root:

```bash
npm install
```

## Usage - Local

Local Deployment To run the web application locally simply run the command "npm run dev". If there are any issues on the latest MacOS use "npm run devMac" to deal with a node.js bug on this operating system. This will use "concurrently" to start both the react client and the express backend. The URL for the backend will be automatically injected into a React Context variable with from environment variable in the .env file.
```bash
npm run dev
```
The front end will run on http://localhost:3000/ The backend will run on http://localhost:3001/api



## Usage - Deployment
Remote deployment To deploy to a remote server the backend api and front end need to be run separately. The backend can simply run with the "npm run start" script.
```bash
npm run start
```
Before starting the frontend, the client server must set the URL for the backend into an environment variable called "REACT_APP_API_URL".

## License
[MIT](https://choosealicense.com/licenses/mit/)
