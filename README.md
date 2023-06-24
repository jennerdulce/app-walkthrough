# app-walkthrough
walkthrough on how to create and deploy a new app with minimal code

## Create a folder called 'backend'
- Will contain everything pertining to the application's backend

## Initialize the app
- Creates a package.json for the application
- Enter `source ~/.bash_profile` in terminal so that `npm init` works
- Enter `npm init` while in root of folder
    - Default everything
    - Enter `server.js` as the entry point

## Install Dependencies
### Dependencies
- Third party software / libraries that help build out our application
- Often written by other developers
- These libraries offer solutions to common problems
- Enter `npm i bcryptjs colors concurrently dotenv express express-async-handler jsonwebtoken mongodb mongoose`

### Dev Dependencies
- Dependencies specifically for developers
- Are not necessary but act as useful tools during stages of development
- Are not important to consumer
- In root folder of application, enter command in terminal `npm i -D nodemon`
    - Tool that constantly watches `server.js`
    - Restarts and refreshes after changes have been made
    - Would other wise have to go into the terminal and manually restart the server

## Add Scripts
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

## Create Server Boilerplate
- Create a file named `server.js` within in the `backend` folder
- See `server.js`

## Create Environment Variables
- Create a file called `.env` in the root directory

```js
// NODE_ENV = development
NODE_ENV = production
MONGODB_URI = db url will go here
JWT_SECRET = jsonwebtokensecret
```

## Establish Routes, Controller Methods, and Middleware

### Middleware
- Create a folder called `middleware` within the `backend` folder

#### Auth Middleware

#### Error Middleware


### Controller
- Create controller methods for each route
- Create a folder called `controllers` within the `backend` folder

#### Controller for Item
- Create a file within `controllers` that will contain a set of controllers
    - `itemController.js`
- See boilerplate code in `itemController.js`

#### Controller for User
- Create a file within `controllers` that will contain a set of controllers
    - `userController.js`
- See boilerplate code in `userController.js`

### Routes
- Create a folder called `routes` within the `backend` folder

#### Routes for Item
- Create a file within `routes` that will contain a set of routes
    - `itemRoutes.js`
- Import controller methods into `itemRoutes.js`
- See boilerplate code in `itemRoutes.js`

#### Routes for User
- Create a file within `routes` that will contain a set of routes
    - `userRoutes.js`
- Import controller methods into `userRoutes.js`
- See boilerplate code in `userRoutes.js`

