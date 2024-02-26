const { query } = require('express');
require('dotenv').config();
const { MongoClient } = require('mongodb');
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
{ Name: "Squadup", Users: [], Trips: [], createdOn: 2024-02-20 };
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
//const query = { Users: { $in: [userId] } };
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
const id = { _id: result1._id};

newData parameter can have the following structure based on type of updaye needed:
1) To update a singular attribute - { $set: { Name: "new group name" } }
2) To add an element into an array attribute - { $push: { Trips: [new_trip_id] } }
3) To remove an element from an array attribute - { $pull: { Trips: [existing_trip_id] } }

Returns success status of updating group.
*/
async function updateGroup(id, newData, collectionName = 'groups') {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const query = { _id: id };
    const result = await collection.updateOne(query, newData);
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


/* Fetch all ideas from the database. 

Returns an array of ideas as objects 
*/
async function fetchAllIdeas(query = {}, collectionName = "ideas") {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.find(query).toArray();
    return result;
  } finally {
    await client.close();
  }

}

/* Fetch all confirmed trip ideas from the database. 

Returns an array of ideas as objects 
*/
async function fetchConfirmedIdeas(userQuery = {}, collectionName = "ideas") {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const query = {Confirmed: true, ...userQuery}
    const result = await collection.find(query).toArray();
    return result;
  } finally {
    await client.close();
  }
}

/* Fetch all unconfirmed trip ideas from the database. 

Returns an array of ideas as objects 
*/
async function fetchUnconfirmedIdeas(userQuery = {}, collectionName = "ideas") {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const query = {Confirmed: false, ...userQuery}
    const result = await collection.find(query).toArray();
    return result;
  } finally {
    await client.close();
  }
}

/* Fetch all confirmed trip ideas from the database based on the idea type.
Type parameter specifies the type of ideas to be retrieved. 

Returns an array of ideas as objects 
*/
async function fetchConfirmedByType(type, collectionName = "ideas") {
  const client = new MongoClient(uri);
    
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const query = {Confirmed: true, Type: type}
    const result = await collection.find(query).toArray();
    return result;
  } finally {
    await client.close();
  }
}

/*
Add a new idea into the database. 
data parameter must have the following structure:
{ Name: "Chik-Fil-A", Type: "Restaurant", Description: "A delicacy, as described by Jamdaar Junior.", Votes: 0, Confirmed: false, Proposed_by: [UID], Trip: [TID], Date_Proposed: 2024-02-30,
  Voting_End: 2024-04-30, link: "https://www.chick-fil-a.ca/locations/on/rutherford-rd-hwy-400?utm_source=yext&utm_medium=link", price: 13.5 };
Returns success status of adding idea.
*/

async function addIdea(data, collectionName = 'ideas') {
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
Delete an idea in the database. 
The query parameter can take in any attribute the idea has, and if it exists,
it will delete that idea. For certainty with delete, the id of
the idea can be taken and put in as a parameter like so:

const query = { _id: [idea id] };

Returns delete status.
*/
async function deleteIdea(query, collectionName = 'ideas') {
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
  deleteGroup,
  fetchAllIdeas,
  fetchConfirmedIdeas,
  fetchUnconfirmedIdeas,
  fetchConfirmedByType,
  addIdea,
  deleteIdea
};
