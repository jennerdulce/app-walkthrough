const colors = require('colors')
const express = require('express')
const dotenv = require('dotenv').config()
const path = require('path')
const port = process.env.PORT || 3001
const app = express()
const { errorHandler } = require('./middleware/errorMiddleware')


// Connection to MongoDB Atlas
const connectDB = require('./config/db')
connectDB()

// Routes
const someRoutes = require('./routes/goalRoutes')

// Allows req.body to be used
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

app.use(errorHandler)
app.listen(port, () => console.log(`Server started on port ${port}`))