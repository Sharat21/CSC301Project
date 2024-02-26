const express = require('express');
const router = express.Router();
const { findGroup, findUser} = require('../../database');
const { ObjectId } = require('mongodb');


// Define routes for Ideas endpoint

router.get('/all-groups/:userId', async (req, res) => {
    try {
        const {userId} = req.params;
        console.log("reached here ", userId);
        const objectUserID = new ObjectId(userId);
        query = { Users: { $in: [objectUserID] } }
        console.log("reached here ", query);

        const groups = await findGroup(query);
        res.json(groups);
    } catch(error) {
        console.log("Fetching all ideas failed: ", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/findUser/:userId', async (req, res) => {
    try {
        const {userId} = req.params;
        console.log("reached here ", userId);
        const objectUserID = new ObjectId(userId);
        query = { _id: objectUserID };
        console.log("reached here ", query);

        const name = await findUser(query);
        res.json(name);
    } catch(error) {
        console.log("Fetching all ideas failed: ", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;