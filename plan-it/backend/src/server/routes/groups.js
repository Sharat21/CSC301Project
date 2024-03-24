const express = require('express');
const router = express.Router();
const { findGroup, findUser, addGroup, updateGroup} = require('../../database');
const { ObjectId } = require('mongodb');


// Define routes for Ideas endpoint

router.get('/all-groups/:userId', async (req, res) => {
    try {
        const {userId} = req.params;
        const objectUserID = new ObjectId(userId);
        query = { Users: { $in: [objectUserID] } };

        const groups = await findGroup(query);
        console.log(groups);
        res.json(groups);
    } catch(error) {
        console.log("Fetching all ideas failed: ", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/findUser/:userId', async (req, res) => {
    try {
        const {userId} = req.params;
        const objectUserID = new ObjectId(userId);
        query = { _id: objectUserID };

        const name = await findUser(query);
        res.json(name);
    } catch(error) {
        console.log("Fetching all ideas failed: ", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/create-group', async (req, res) => {
    try {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        const { name, userId } = req.body;
        const objectUserID = new ObjectId(userId);
        query = { Name: name, Users: [objectUserID], Trips: [], createdOn: formattedDate };

        group = await addGroup(query);
        res.json(group);
    } catch(error) {
        console.log("Fetching all ideas failed: ", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/join-group', async (req, res) => {
    try {
        const { userId, groupId } = req.body;
        const objectUserID = new ObjectId(String(userId));

        const query = { $push: { Users: objectUserID } };

        const objectGroupID = new ObjectId(String(groupId));
        const result2 = await updateGroup(objectGroupID, query);
       
        res.json(result2);
    } catch(error) {
        console.log("Fetching all ideas failed: ", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;