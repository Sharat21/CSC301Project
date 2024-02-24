const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const { fetchAllIdeas, fetchConfirmedIdeas, fetchConfirmedByType, deleteIdea } = require('../../database');

// Define routes for Ideas endpoint

router.get('/all-ideas', async (req, res) => {
    try {
        const ideas = await fetchAllIdeas();
        res.json(ideas);
    } catch(error) {
        console.log("Fetching all ideas failed: ", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/confirmed-ideas', async (req, res) => {
    try {
        const confirmedIdeas = await fetchConfirmedIdeas();
        res.json(confirmedIdeas);
    } catch(error) {
        console.log("Fetching all confirmed ideas failed: ", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/confirmed-ideas/:type', async (req, res) => {
    try {
        const { type } = req.params;
        const ideasByType = await fetchConfirmedByType(type);
        res.json(ideasByType);
    } catch(error) {
        console.log("Fetching ideas by type failed: ", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/delete-idea/:ideaID', async (req, res) => {
    try {
        const { ideaID } = req.params;
        const query = { _id: new ObjectId(ideaID) };
        const result = await deleteIdea(query);
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Idea not found' });
        }
        res.json({ message: 'Idea deleted successfully'});
    } catch (error) {
        console.log("Deleting idea failed: ", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Other routes (GET, POST, etc.) for user management

module.exports = router;