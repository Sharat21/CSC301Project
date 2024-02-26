const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const { addBudget, updateBudget, deleteBudget } = require('../../database');

// Define routes for Budgets endpoint

router.post('/add-budget', async (req, res) => {
    try {
        const { name, amount } = req.body;
        const newBudget = await addBudget({ name, amount });
        res.status(201).json(newBudget);
    } catch(error) {
        console.log("Adding budget failed: ", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/update-budget/:budgetID', async (req, res) => {
    try {
        const { budgetID } = req.params;
        const { name, amount } = req.body;
        const query = { _id: new ObjectId(budgetID) };
        const updatedBudget = await updateBudget(query, { name, amount });
        res.json(updatedBudget);
    } catch(error) {
        console.log("Updating budget failed: ", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/delete-budget/:budgetID', async (req, res) => {
    try {
        const { budgetID } = req.params;
        const query = { _id: new ObjectId(budgetID) };
        const result = await deleteBudget(query);
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Budget not found' });
        }
        res.json({ message: 'Budget deleted successfully'});
    } catch (error) {
        console.log("Deleting budget failed: ", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
