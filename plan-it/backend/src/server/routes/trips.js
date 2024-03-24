const express = require('express');
const router = express.Router();
const { findGroup, findTrip, addTrip, updateTrip, deleteTrip, updateGroup, fetchFinalized} = require('../../database');
const { ObjectId } = require('mongodb');


// Define routes for Ideas endpoint

router.get('/get-trip/:tripId', async (req, res) => {
    try {
        const {tripId} = req.params;
        console.log("reached here ", tripId);
        const objectTripID = new ObjectId(tripId);
        query = { _id: objectTripID };
        console.log("reached here ", query);

        const trips = await findTrip(query);
        res.json(trips);
    } catch(error) {
        console.log("Fetching all ideas failed: ", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.get('/get_trip_ids/:groupId', async (req, res) => {
    try {
        const {groupId} = req.params;
        console.log("reached here ", groupId);
        const objectGroupID = new ObjectId(groupId);
        query = { _id: objectGroupID };
        console.log("reached here ", query);

        const groups = await findGroup(query);
        res.json(groups);
    } catch(error) {
        console.log("Fetching all ideas failed: ", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/add-trip', async (req, res) => {
    try {
      const { Name, Duration, startDate, endDate, Description, Status, groupId } = req.body;

      // Create a new user
      const newTrip = {
        Name: Name,
        Duration: Duration,
        StartDate: startDate,
        EndDate: endDate,
        Description: Description,
        Status: Status,
        UsersFinalized: []
      };
  
      const result = await addTrip(newTrip);
      const query = { $push: { Trips: [newTrip._id] } };
      console.log("groupId", groupId);

      const objectGroupID = new ObjectId(String(groupId));
      const result2 = await updateGroup(objectGroupID, query);
      res.json({
        success: true,
        message: 'Trip added successfully',
        trip: result,
        group: result2,
        tripId: newTrip._id
      });
    } catch (error) {
      console.error('Error registering Trip:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.post('/update-trip', async (req, res) => {
    try {
      const { Name, Duration, startDate, endDate, Description, Status, tripId } = req.body;
      const objectTripID = new ObjectId(String(tripId));
      const finalized = await fetchFinalized(objectTripID);

      // Create a new trip
      const newTrip = {
        Name: Name,
        Duration: Duration,
        StartDate: startDate,
        EndDate: endDate,
        Description: Description,
        Status: Status,
        UsersFinalized: finalized
      };

      const query = { _id: objectTripID };
      const result = await updateTrip(query, newTrip);

      res.json({
        success: true,
        message: 'Trip updated successfully',
        user: result
      });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.get('/delete-trip/:tripId/:groupId', async (req, res) => {
    try {
      const {tripId, groupId } = req.params;
      const objectTripID = new ObjectId(String(tripId));
      const query = { _id: objectTripID };
      const result = await deleteTrip(query);
      const query2 = { $pull: { Trips: [objectTripID] } };

      const objectGroupID = new ObjectId(String(groupId));
      const result2 = await updateGroup(objectGroupID, query2);
      res.json({
        success: true,
        message: 'User deleted successfully',
        user: result
      });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

module.exports = router;