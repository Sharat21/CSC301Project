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
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

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
id parameter must have the following structure:
<document_id>, can be taken from the getUser method

data parameter must have the following structure:
{ $set: { email: "reza@gmail.com" } }

Returns success status of updating user.
*/
async function updateUser(id, newData, collectionName = 'users') {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.updateOne({ _id: ObjectID(id) }, { $set: newData });
    return result;
  } finally {
    await client.close();
  }
}

/*
Delete a user in the database. 
id parameter must have the following structure:
<document_id>, can be taken from the getUser method

Returns delete status.
*/
async function deleteUser(id, collectionName = 'users') {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.deleteOne({ _id: ObjectID(id) });
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
Find a group in the database. If multiple groups fit the query, all are returned.
query parameter must have the following structure:
{ Name: "SquadUp" }, where any of the group's fields can be used to query a group.
Returns group(s) as an array.
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
id parameter must have the following structure:
<document_id>, can be taken from the getgroup method

data parameter must have the following structure:
{ $set: { Name: "South-Common" } }

Returns success status of updating group.
*/
async function updateGroup(id, newData, collectionName = 'groups') {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.updateOne({ _id: ObjectID(id) }, { $set: newData });
    return result;
  } finally {
    await client.close();
  }
}

/*
Delete a group in the database. 
id parameter must have the following structure:
<document_id>, can be taken from the getGroup method

Returns delete status.
*/
async function deleteGroup(id, collectionName = 'groups') {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.deleteOne({ _id: ObjectID(id) });
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
