// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://waleed:test-123@cluster0.1z7sdxd.mongodb.net/?retryWrites=true&w=majority";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// });

// async function run() {
//     try {
//         // Connect the client to the server
//         await client.connect();
//         // Send a ping to confirm a successful connection
//         const db = client.db("plan-it");

//         const col = db.collection("users");

//         const filter = {"Firstname": "Waleed"};
//         const document = await col.findOne(filter);
//         console.log("Document found:\n" + JSON.stringify(document));

//         console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } catch(err) {
//         console.log(err.stack);
//     } finally {
//         // Ensures that the client will close when you finish/error
//         await client.close();
//     }
// }

// run().catch(console.dir);

const database = require('./database');

//createExample();
readExample();

// Example usage of createDocument
async function createExample() {
    const data = { Firstname: "Lebron", Lastname: "James", Groups: [], Trips: [], Email: "pookiebear@gmail.com", password: "glorious_king" };
    const result = await database.addUser(data);
    console.log("New document created:", result);
  }

  // Example usage of updateDocument
async function readExample() {
  const result1 = await database.findUser({ Firstname: "Waleed"});
  console.log("found user: " + result1.Firstname);
  // const idToUpdate = "";
  // const newData = { $set: { age: 31 } };
  // const result2 = await database.updateDocument(idToUpdate, newData);
  // console.log("Document updated:", result);
}