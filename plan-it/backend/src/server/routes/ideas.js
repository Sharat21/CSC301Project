const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const { fetchAllIdeas, fetchConfirmedIdeas, fetchConfirmedByTrip, fetchUnconfirmedIdeas, fetchConfirmedByType, addIdea, deleteIdea, fetchConfirmedByTypeAndTrip, fetchUnconfirmedByTrip } = require('../../database');

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

router.post('/create-idea', async (req, res) => {
    try { 
        const idea = req.body;
        const result = await addIdea(idea);
        if(result.acknowledged){
            res.status(201).json({ message: "Idea added successfully" });
        }
        else {
            res.status(400).json({ message: "Failed to add idea" });
        }
    } catch (error) {
        console.log("Adding idea failed: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get('/all-unconfirmed-ideas', async (req, res) => {
    try {
        const unconfirmedIdeas = await fetchUnconfirmedIdeas();
        res.json(unconfirmedIdeas);
    } catch(error) {
        console.log("Fetching all unconfirmed ideas failed: ", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/unconfirmed-ideas-trip/:tripId', async (req, res) => {
    try {
        const { tripId } = req.params;
        const unconfirmedIdeasByTrip = await fetchUnconfirmedByTrip(tripId);
        res.json(unconfirmedIdeasByTrip);
    } catch(error) {
        console.log("Fetching all unconfirmed ideas by trip failed: ", error);
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

router.get('/all-confirmed-ideas-trip/:tripId', async (req, res) => {
    try {
        const { tripId } = req.params;
        const confirmedIdeasByTrip = await fetchConfirmedByTrip(new ObjectId(tripId));
        res.json(confirmedIdeasByTrip);
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

router.get('/confirmed-ideas-trip/:type/:tripId', async (req, res) => {
    try {
        const { type, tripId } = req.params;
        const ideasByTypeAndTrip = await fetchConfirmedByTypeAndTrip(new ObjectId(tripId), type);
        res.json(ideasByTypeAndTrip);
    } catch(error) {
        console.log("Fetching ideas by type and trip failed: ", error);
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