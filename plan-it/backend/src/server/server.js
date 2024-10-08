/**
 * To start the server, use the following command:
 *  node backend/src/server/server.js  (from the plan-it directory)
 */
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5100;
app.use(cors({ methods: ['GET', 'POST', 'PUT', 'DELETE'] }));
app.use(express.json());

// =============== UNCOMMENT WHEN YOU IMPLEMENT ================== //
const usersRoutes = require('./routes/users');
const groupsRoutes = require("./routes/groups");
const ideasRoutes = require("./routes/ideas");
const tripsRoutes = require("./routes/trips");


app.use('/api/users', usersRoutes);
app.use('/api/ideas', ideasRoutes);
app.use('/api/groups', groupsRoutes);
app.use('/api/trips', tripsRoutes);



const dbo = require("../database.js");
app.listen(port, () => {

  console.log(`Server is running on port: ${port}`);
  connectToDatabase();
});

/**
 * Database connection function
 * @returns 
 */
async function connectToDatabase() {
  const { MongoClient } = require("mongodb");
  const uri = process.env.MONGO_URI;
  const dbName = 'plan-it';
  const client = new MongoClient(uri)

  try {
    await client.connect();
    console.log("Connected to the database");
    return client.db(dbName);
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
}