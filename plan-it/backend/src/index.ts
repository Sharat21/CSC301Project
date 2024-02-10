const database = require('./database');

/*
  Below are some example functions which showcase how to use the database functions in database.js.
  Uncommenting the ones below without changing the input parameters might not work as these are already
  in the database.

*/

//createExample();
//updateExample();

// Example usage of createDocument
async function createExample() {
  const data = { Firstname: "Lebron", Lastname: "James", Groups: [], Trips: [], Email: "pookiebear@gmail.com", password: "glorious_king" };
  const result = await database.addUser(data);
  console.log("New document created:", result);
}

// Example usage of updateDocument
async function updateExample() {
  const result1 = await database.findUser({ Firstname: "Waleed" });
  const idToUpdate = result1._id;
  const newData = { Email: "reza@ryan.com" };
  const result2 = await database.updateUser({ _id: idToUpdate }, newData);
  console.log("Document updated:", result2);
}

