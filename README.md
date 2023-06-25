# app-walkthrough
- Walkthrough on how to create and deploy a new app with minimal code
- The topic of "Item" is an just an example and should be changed to the model that you prefer
  - Be sure to change the following:
    - Backend:
      - `controllers -> itemController.js`
      - `models -> itemModel.js`
      - `routes -> itemRoutes.js`
    - Frontend:
      - `app -> store.js`
      - `components -> ItemComponent.jsx`
      - `components -> ItemForm.jsx`
      - `features -> items -> itemService.js`
      - `features -> items -> itemSlice.js`
    - And pages where Item is used

## Backend
- Will contain everything pertining to the application's backend

### Initialize the app
- Creates a package.json for the application
- Enter `source ~/.bash_profile` in terminal so that `npm init` works
- Enter `npm init` while in root of folder
    - Default everything
    - Enter `server.js` as the entry point

### Install Dependencies
#### Dependencies
- Third party software / libraries that help build out our application
- Often written by other developers
- These libraries offer solutions to common problems
- Enter `npm i bcryptjs colors concurrently dotenv express express-async-handler jsonwebtoken mongodb mongoose`

#### Dev Dependencies
- Dependencies specifically for developers
- Are not necessary but act as useful tools during stages of development
- Are not important to consumer
- In root folder of application, enter command in terminal `npm i -D nodemon`
    - Tool that constantly watches `server.js`
    - Restarts and refreshes after changes have been made
    - Would other wise have to go into the terminal and manually restart the server

### Add Scripts
- Add scripts to the `package.json` in root directory

```js
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node backend/server.js",
    "server": "nodemon backend/server.js",
    "client": "npm start --prefix frontend",
    "clientinstall": "npm install --prefix client",
    "dev": "concurrently \"npm run server\" \"npm run client\"",
    "render-postbuild": "npm install --prefix frontend && npm run build --prefix frontend"
  },
```

### Create Server Boilerplate
- Create a file named `server.js` within in the `backend` folder
- See `server.js`

### Create Environment Variables
- Create a file called `.env` in the root directory

```js
// NODE_ENV = development
NODE_ENV = production
MONGODB_URI = db url will go here
JWT_SECRET = jsonwebtokensecret
```

### Establish Routes, Controller Methods, and Middleware

#### Middleware
- Create a folder called `middleware` within the `backend` folder

##### Auth Middleware
- Create a file within `controllers` that will contain a set of controllers
    - `authMiddleware.js`
- See boilerplate code in `authMiddleware.js`

##### Error Middleware
- Create a file within `controllers` that will contain a set of controllers
    - `errorMiddleware.js`
- See boilerplate code in `errorMiddleware.js`

#### Controllers
- Create controller methods for each route
- Create a folder called `controllers` within the `backend` folder

##### Controller for Item
- Create a file within `controllers` that will contain a set of controllers
    - `itemController.js`
- See boilerplate code in `itemController.js`

##### Controller for User
- Create a file within `controllers` that will contain a set of controllers
    - `userController.js`
- See boilerplate code in `userController.js`

#### Routes
- Create a folder called `routes` within the `backend` folder

##### Routes for Item
- Create a file within `routes` that will contain a set of routes
    - `itemRoutes.js`
- Import controller methods into `itemRoutes.js`
- See boilerplate code in `itemRoutes.js`

##### Routes for User
- Create a file within `routes` that will contain a set of routes
    - `userRoutes.js`
- Import controller methods into `userRoutes.js`
- See boilerplate code in `userRoutes.js`

### Database
- [MongoDB Setup](https://youtu.be/-0exw-9YJBo?t=2206)
- Create the following folders within the `backend` folder
    - `config` and `models`
- Connect add MONGODB_URI into your `.env` file

```js
MONGODB_URI = mongodb+srv://jennerdulce:jennerdulce@merntutorialcluster.fgesawn.mongodb.net/tutorialdatabase?retryWrites=true&w=majority
```

- Be sure to add the database name in this area `merntutorialcluster.fgesawn.mongodb.net/--here--?`
- Refer to `MongoDB Walkthrough` folder

#### Config Folder
- Create a file called `db.js` within the `config` folder
- See boilerplate code in `db.js`

#### Create Models
- Create the a folder called `models` within the `backend` folder

##### Model for Item
- Create a file within `models` that will contain a set of routes
    - `itemModels.js`
- See boilerplate code in `itemModel.js`

##### Model for User
- Create a file within `models` that will contain a set of routes
    - `userModel.js`
- See boilerplate code in `userModel.js`

## Frontend
- Start by entering the command `npx create-react-app frontend --template redux` in your terminal

### Create a Proxy
- Head to the package-lock.json located in your `frontend` folder
- Add the proxy to the backend, should have the correct backend localhost port
    - Either in `.env` file or `server.js`

```js
{
  "name": "frontend",
  "version": "0.1.0",
  "proxy": "http://localhost:3001",
```

### Check to see if backend is connected
- While in the terminal, change directories to `frontend`
- While in the `frontend` directory, install the axios package with the command `npm i axios react-icons react-router-dom react-toastify`

#### Make a call to the Backend API
- You can choose to delete the bulk of the content in your `App.js`
- Make an call to you backend API using axios and display the message

```js
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './App.css';

function App() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    contactAPI()
  }, [])

  const contactAPI = async () => {
    const response =  await axios.get('/hello')
    setMessage(response.data.message)
  }

  return (
    <div className="App">
      <h1>{message}</h1>
    </div>
  );
}

export default App;
```

#### Test to see of Frontend is connected to the Backend
- In the root of your application, run the command `npm run dev`
- If the message from your backend is displayed, that means there is a successful connection

### Adding to Redux
#### Create Features
- Navigate to the `src` folder located in the `frontend` directory
- Create a new folder and name it `features`
    - This is where your `Slice` and `Service` files will go
    - Slice
        - Slice Reducer
        - Contains Initial Redux State and Redux Actions
    - Service: Helps compartmentalize and organize API calls to perform CRUD actions

##### Create Auth Feature
- Create a new folder called `auth` within the `features` directory
- Create these two files within the `auth` directory:
    - `authService.js`
    - `authSlice.js`

###### Auth Slice
- Basic login, logout, and register functionality
- Imports `authService.js`
- Refer to `authSlice.js`

###### Auth Service
- Compartmentalizes API calls
- Refer to `authService.js`

###### Add Auth Reducer to Store
- Adds all state / actions pertaining to Auth to Redux Global State
- Imports `authSlice.js`
- Head into `frontend -> src -> app -> store.js`
- Refer to `Auth` in `store.js`

##### Create Item Feature
- Create a new folder called `items` within the `features` directory
- Create these two files within the `items` directory:
    - `itemService.js`
    - `itemSlice.js`

###### Item Slice
- Basic login, logout, and register functionality
- Imports `itemService.js`
- Refer to `itemSlice.js`

###### Item Service
- Compartmentalizes API calls
- Refer to `itemService.js`

###### Add Item Reducer to Store
- Adds all state / actions pertaining to Items to Redux Global State
- Imports `itemSlice.js`
- Head into `frontend -> src -> app -> store.js`
- Refer to `Item` in `store.js`

### Pages
- General Common Pages
- Refer to `pages` directory
- Import each `page` into `App.js`
- Refer to `App.js`

### Routes
- Each `page` should be linked to a `route` using react-router-dom
- Add routes to `App.js`
- Refer to `App.js`

### Components
- Will contain components
- Components are block of code that are reusable for different pages
- Typically you'd import components into a page to be used
- Refer to `components` folder for basic components you can potentially use

## Deploy to Render
- Refer to `Render Images` folder