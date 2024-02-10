const { query } = require('express');
require('dotenv').config();
const { MongoClient, ObjectID } = require('mongodb');
// Connection URI
const uri = process.env.MONGO_URI;
// Database Name
const dbName = 'plan-it';

/*
    IMPORTANT - to use these functions on your page, start with this line at the top of your page:
    const database = require('./database.js') -> make sure the path is adjusted for whatever folder your file is in.

    To call a function, use: database.addUser(data), database.updateUser(id, newData), etc.
*/


/*
Add a new user into the database. 
data parameter must have the following structure:
{ Firstname: "Waleed", Lastname: "Haddad", Groups: [], Trips: [], Email: "wald@gmail.com", password: "12345" };
Returns success status of adding user.
*/
async function addUser(data, collectionName = 'users') {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(data);
    return result;
  } finally {
    await client.close();
  }
}

/*
Find a user in the database.
query parameter must have the following structure:
{ Firstname: "Waleed" }, where any of the user's fields can be used to query a user.
Returns user as an object, where result.Firstname etc can be used to get individual attributes.
*/
async function findUser(query = {}, collectionName = 'users') {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const documents = await collection.findOne(query);
    return documents;
  } finally {
    await client.close();
  }
}

/*
Update a user in the database. 

The query parameter can take in any attribute the User has, and if it exists,
it will update that user. For certainty with update, the id of
the User can be taken and put in as a parameter like so:

const result1 = await database.findUser({ Firstname: "Waleed"});
const query = { _id: result1._id};

data parameter must have the following structure:
{ email: "reza@gmail.com" }

Returns success status of updating user.
*/
async function updateUser(query, newData, collectionName = 'users') {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.updateOne(query, { $set: newData });
    return result;
  } finally {
    await client.close();
  }
}

/*
Delete a user in the database. 
The query parameter can take in any attribute the User has, and if it exists,
it will delete that user. For certainty with delete, the id of
the user can be taken and put in as a parameter like so:

const result1 = await database.findUser({ Firstname: "Waleed"});
const query = { _id: result1._id};

Returns delete status.
*/
async function deleteUser(query, collectionName = 'users') {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.deleteOne(query);
    return result;
  } finally {
    await client.close();
  }
}

/*
Add a new group into the database. 
data parameter must have the following structure:
{ Name: "Squadup", Users: [], Trips: [] };
Returns success status of adding group.
*/
async function addGroup(data, collectionName = 'groups') {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(data);
    return result;
  } finally {
    await client.close();
  }
}

/*
Find a group in the database.
query parameter must have the following structure:
{ Name: "SquadUp" }, where any of the group's fields can be used to query a group.
Returns group as an object, where result.Name etc can be used to get individual attributes..
*/
async function findGroup(query = {}, collectionName = 'groups') {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const documents = await collection.find(query).toArray();
    return documents;
  } finally {
    await client.close();
  }
}

/*
Update a group in the database. 

The query parameter can take in any attribute the Group has, and if it exists,
it will update that group. For certainty with update, the id of
the Group can be taken and put in as a parameter like so:

const result1 = await database.findGroup({ Name: "SquadUp"});
const query = { _id: result1._id};

data parameter must have the following structure:
{ Name: "South-Common" }

Returns success status of updating group.
*/
async function updateGroup(id, newData, collectionName = 'groups') {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.updateOne(query, { $set: newData });
    return result;
  } finally {
    await client.close();
  }
}

/*
Delete a group in the database. 
The query parameter can take in any attribute the Group has, and if it exists,
it will delete that group. For certainty with delete, the id of
the Group can be taken and put in as a parameter like so:

const result1 = await database.findGroup({ Name: "SquadUp"});
const query = { _id: result1._id};

Returns delete status.
*/
async function deleteGroup(query, collectionName = 'groups') {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.deleteOne(query);
    return result;
  } finally {
    await client.close();
  }
}

module.exports = {
  addUser,
  findUser,
  updateUser,
  deleteUser,
  addGroup,
  findGroup,
  updateGroup,
  deleteGroup
};
