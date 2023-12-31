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
- In the root directory, create a folder called `backend`
- Will contain everything pertining to the application's backend

### Initialize the app
- Creates a `package.json` for the application
- Enter `source ~/.bash_profile` in terminal so that `npm init` works
- Enter `npm init` while in root of folder
    - Default everything
    - Enter `server.js` as the entry point

### Install Dependencies
#### Dependencies
- Dependencies are third party software / libraries that help build out our application
- Often written by other developers
- These libraries offer solutions to common problems
- Enter `npm i bcryptjs colors concurrently dotenv express express-async-handler jsonwebtoken mongodb mongoose`

#### Dev Dependencies
- Dev Dependencies specifically for developers
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
- Create a file within `middleware` that will contain a set of middleware
    - `authMiddleware.js`
- See boilerplate code in `authMiddleware.js`

##### Error Middleware
- Create a file within `middleware` that will contain a set of controllers
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

#### Create Models
- Create the a folder called `models` within the `backend` folder

##### Model for Item
- Create a file within `models` that will contain a set of routes
    - `itemModels.js`
- See boilerplate code in `itemModel.js`

##### Model for User
- Create a file within `models` that will contain a set of routes
    - `userModel.js`
- See boilerplate code in `userModel.j
####  Creating a Database on Atlas
- Step 1: Create a project
- Step 2: Click Create Project
- Step 3: Click Build a Database
- Step 4: Select all of the settings
- Step 5: Select all of the settings
  - I name my username and password the same so that it is easy to remember
- Step 6: Click Add IP Address
- Step 7: Click `Allow Access From Anywhere`
- Step 8: Click `Collections` and Click `Add My Own Data`
- Step 9 & 10: Create your `collections`
- Step 11: Should look like this

#### Connect to Application
- Connect: Click connect
- Step 1: Click Drivers
- Step 2: Copy the connection string
- Step 3: Paste it into your `.env` file at the root of your app
- Step 4: Replace the password and add the database that is from your cluster
- Step 5: See the `db.js` file in your `config` folder
- Step 6: See lines 15-17 in your `server.js` file

#### Connect to Compass
- Connect: Click connect
- Step 1: Click Compass
- Step 2: Copy the connection string
- Step 3: Open Compass and click New Connection
- Step 4 & 5: Paste the connection string here and add the password and the database name
- Step 5: You should see your database and collections you've previous created on Atlas
- Step 6: You should see your database and collections you've previous created on Atlas


#### Config Folder
- Create a file called `db.js` within the `config` folder
- See boilerplate code in `db.js`

## Frontend
- Begin in your root directory and start by entering the command `npx create-react-app frontend --template redux` in your terminal

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

### Check to see if the backend is connected
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
- `Services` are imported into `Slices`
- `Actions from Slices` are imported into `Pages / Components`

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
- ** TO REPLACE **
  - hold `ctrl` and press `D` on `iitemm` and change to proper item name
  - hold `ctrl` and press `D` on `items` and change to proper item name
  - hold `ctrl` and press `D` on `item` and change to proper item name

###### Item Service
- Compartmentalizes API calls
- ** TO REPLACE **
  - Change `item` to correct item name
- Refer to `itemService.js`

###### Add Item Reducer to Store
- Adds all state / actions pertaining to Items to Redux Global State
- Imports `itemSlice.js`
- Head into `frontend -> src -> app -> store.js`
- Refer to `Item` in `store.js`

### Accessing State and Dispatching Actions
- Reference this code:

```js
// useSelector: To use redux global state variables
// useDispatch: To dispatch actions created in Redux
import { useDispatch, useSelector } from 'react-redux'

// Imported actions from reducers
// getItems: Action that retrieves items from API and changes global state in Redux
// reset: Resets global state in Redux
import { getItems, reset } from '../features/items/itemSlice'

function Dashboard() {
  const dispatch = useDispatch()

  // Using state from auth reducer in Redux
  const { user } = useSelector((state) => state.auth) 

  // Using state from item reducer in Redux
  const { items, isLoading, isError, message } = useSelector((state) => state.item)

  useEffect(() => {
    // Dispatching 'getItems' action
    dispatch(getItems())

    return () => {
      // Dispatching 'reset' action
      dispatch(reset())
    }
  }, [user, isError, message, dispatch, navigate])
  return (
    <>

    </>
  )
}
```

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

## Finialize Frontend
- While in the `frontend` directory, run the script `npm run build` in your terminal

## Deploy to Render
- Refer to `Render Images` folder
- Build command should be `npm install && npm install --prefix frontend && npm run build --prefix frontend`

## Dependency Notes

### React

- useEffect:
  - 

- useState:
  - 

### React Redux
- useDispatch:
  - 
  
- useSelector:
  - 

### React Router DOM
- Navlink: 
  - Used to create a link similar to an `<a>` tag, that will redirect users to the route when clicked
  - Typically used on headers or any other clickable item to redirect users

```js
<NavLink to="/" className='nav-link-text'>
    Home
</NavLink>
<NavLink to="/otherpage" className='nav-link-text'>
    Home
</NavLink>
```

- Link: 
  - Used to create a link similar to an `<a>` tag, that will redirect users to the route when clicked
  - Typically used on headers or any other clickable item to redirect users
  - Very similar to NavLink

```js
<li>
      <Link to='/login'>
          <FaSignInAlt /> Login
      </Link>
  </li>
  <li>
      <Link to='/register'>
          <FaUser /> Register
      </Link>
  </li>
```

- useNavigate:
  - Instantly redirects users to the route
  - Used when you want to redirect a user without clicking a button
  - Typically triggered with boolean variables

```js
const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/login')
}
```
