import React, { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  Typography,
  LinearProgress,
} from '@mui/material';
import './BudgetSheet.css';
import NavBar from './pages/components/NavBar';

// All dependencies and budget sheet functions

const BudgetSheet = () => {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
  const [categories, setCategories] = useState([
    { name: 'Accommodation', budgets: [] },
    { name: 'Activities', budgets: [] },
    { name: 'Restaurants', budgets: [] },
    { name: 'Transportation', budgets: [] },
    { name: 'Other', budgets: [] },
  ]);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(null);
  const [currentBudgetIndex, setCurrentBudgetIndex] = useState(null);
  const [newBudgetName, setNewBudgetName] = useState('');
  const [newBudgetAmount, setNewBudgetAmount] = useState('');
  const [newBudgetMax, setNewBudgetMax] = useState('');
  

  const handleAddBudget = () => {
    if (!newBudgetName || !newBudgetAmount || !newBudgetMax || newBudgetAmount < 0 || newBudgetMax < 0 || currentCategoryIndex === null) {
      alert('Please fill in all fields and select a category!');
      return;
    }
  
    const updatedCategories = [...categories];
    const newBudget = {
      name: newBudgetName || '',
      amount: parseFloat(newBudgetAmount),
      max: parseFloat(newBudgetMax),
    };
    updatedCategories[currentCategoryIndex].budgets.push(newBudget);
    setCategories(updatedCategories);
    setOpenAddDialog(false);
    setNewBudgetName('');
    setNewBudgetAmount('');
    setNewBudgetMax('');
    setCurrentCategoryIndex(0);
  };

  const handleEditBudget = () => {
    // if (!currentCategoryIndex || !currentBudgetIndex || !newBudgetName || !newBudgetAmount || !newBudgetMax || newBudgetAmount < 0 || newBudgetMax < 0) {
    //   alert('Please fill in all fields and select a category and budget!');
    //   return;
    // }

    const updatedCategories = [...categories];
    const editedBudget = {
      name: newBudgetName,
      amount: parseFloat(newBudgetAmount),
      max: parseFloat(newBudgetMax),
    };
    updatedCategories[currentCategoryIndex].budgets[currentBudgetIndex] = editedBudget;
    setCategories(updatedCategories);
    setOpenEditDialog(false);
  };

  const handleRemoveBudget = () => {
    if (!categories.some(category => category.budgets.length > 0)) {
      alert('No budgets available to remove.');
      return;
    }
    setOpenRemoveDialog(true);
  };
  
  const handleConfirmRemoveBudget = () => {
    if (currentCategoryIndex === null || currentBudgetIndex === null) {
      alert('Please select a category and a budget to remove.');
      return;
    }
  
    const updatedCategories = [...categories];
    updatedCategories[currentCategoryIndex].budgets.splice(currentBudgetIndex, 1);
    setCategories(updatedCategories);
    setOpenRemoveDialog(false);
  };
  
  const handleCancelRemoveBudget = () => {
    setOpenRemoveDialog(false);
  };

  const handleOpenEditDialog = (categoryIndex, budgetIndex) => {
    setCurrentCategoryIndex(categoryIndex);
    setCurrentBudgetIndex(budgetIndex);
    setNewBudgetName(categories[categoryIndex].budgets[budgetIndex].name);
    setNewBudgetAmount(categories[categoryIndex].budgets[budgetIndex].amount);
    setNewBudgetMax(categories[categoryIndex].budgets[budgetIndex].max);
    setOpenEditDialog(true);
  };

  const getCategoryColor = (budget) => {
    if (budget.amount >= budget.max) {
      return '#ff6666'; // Red
    } else if ((budget.max - budget.amount) / budget.max <= 0.1) {
      return '#FFDDDD'; // Very light red
    } else {
      return '#ffffff'; // White
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <NavBar/>
      <Typography variant="h4" align="center" gutterBottom>
        Budget
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <Button variant="contained" onClick={() => setOpenAddDialog(true)}>Add Budget</Button>
        <Button variant="contained" onClick={handleRemoveBudget} style={{ marginLeft: '10px', backgroundColor: '#ff1a1a' }}>Remove Budget</Button>
        {categories.some(category => category.budgets.length > 0) &&
          <Button variant="contained" onClick={() => setOpenEditDialog(true)} style={{ marginLeft: '10px' }}>Edit Budget</Button>
        }
      </div>
      {categories.map((category, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <Card className="category-card">
            <CardContent>
              <Typography variant="h5" className="category-header">{category.name}</Typography>
              <div className="budget-container">
                {category.budgets.map((budget, idx) => (
                  <Card
                    key={idx}
                    onDoubleClick={() => handleOpenEditDialog(index, idx)}
                    className="budget-card"
                    style={{ backgroundColor: getCategoryColor(budget) }}
                  >
                    <CardContent>
                      <Typography variant="h6">{budget.name}</Typography>
                      <Typography variant="body1">Amount: {budget.amount}</Typography>
                      <Typography variant="body1">Max: {budget.max}</Typography>
                      <LinearProgress
                        className="progress-bar"
                        variant="determinate"
                        value={(budget.amount / budget.max) * 100}
                        style={{
                          backgroundColor: budget.amount >= budget.max ? '#FF0000' : '',
                        }}
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Add Budget</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            value={newBudgetName}
            onChange={(e) => setNewBudgetName(e.target.value)}
            style={{ marginBottom: '10px', marginTop: '10px'  }}
          />
          <TextField
            label="Amount"
            fullWidth
            type="number"
            value={newBudgetAmount}
            onChange={(e) => setNewBudgetAmount(e.target.value)}
            style={{ marginBottom: '10px' }}
            InputProps={{ inputProps: { min: 0 } }}
          />
          <TextField
            label="Max"
            fullWidth
            type="number"
            value={newBudgetMax}
            onChange={(e) => setNewBudgetMax(e.target.value)}
            style={{ marginBottom: '20px' }}
            InputProps={{ inputProps: { min: 0 } }}
          />
          <TextField
            select
            label="Category"
            fullWidth
            value={currentCategoryIndex}
            onChange={(e) => setCurrentCategoryIndex(e.target.value)}
            style={{ marginBottom: '20px' }}
          >
            {categories.map((category, index) => (
              <MenuItem key={index} value={index}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddBudget} color="primary">Add</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Budget</DialogTitle>
        <DialogContent>
          <TextField
            select
            label="Category"
            fullWidth
            value={currentCategoryIndex}
            onChange={(e) => setCurrentCategoryIndex(e.target.value)}
            style={{ marginBottom: '10px',  marginTop: '10px'}}
          >
            {categories.map((category, index) => (
              <MenuItem key={index} value={index}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
          {currentCategoryIndex !== null &&
            <TextField
              select
              label="Budget"
              fullWidth
              value={currentBudgetIndex}
              onChange={(e) => setCurrentBudgetIndex(e.target.value)}
              style={{ marginBottom: '10px' }}
            >
              {categories[currentCategoryIndex].budgets.map((budget, index) => (
                <MenuItem key={index} value={index}>
                  {budget.name}
                </MenuItem>
              ))}
            </TextField>
          }
          <TextField
            label="Name"
            fullWidth
            value={newBudgetName}
            onChange={(e) => setNewBudgetName(e.target.value)}
            style={{ marginBottom: '10px' }}
          />
          <TextField
            label="Amount"
            fullWidth
            type="number"
            value={newBudgetAmount}
            onChange={(e) => setNewBudgetAmount(e.target.value)}
            style={{ marginBottom: '10px' }}
            InputProps={{ inputProps: { min: 0 } }}
          />
          <TextField
            label="Max"
            fullWidth
            type="number"
            value={newBudgetMax}
            onChange={(e) => setNewBudgetMax(e.target.value)}
            style={{ marginBottom: '10px' }}
            InputProps={{ inputProps: { min: 0 } }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleEditBudget} color="primary">Edit</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openRemoveDialog} onClose={() => setOpenRemoveDialog(false)}>
  <DialogTitle>Remove Budget</DialogTitle>
  <DialogContent>
    <TextField
      select
      label="Category"
      fullWidth
      value={currentCategoryIndex}
      onChange={(e) => setCurrentCategoryIndex(e.target.value)}
      style={{ marginBottom: '20px',  marginTop: '11px' }}
    >
      {categories.map((category, index) => (
        <MenuItem key={index} value={index}>
          {category.name}
        </MenuItem>
      ))}
    </TextField>
    <TextField
      select
      label="Budget"
      fullWidth
      value={currentBudgetIndex}
      onChange={(e) => setCurrentBudgetIndex(e.target.value)}
      style={{ marginBottom: '20px' }}
    >
      {categories[currentCategoryIndex]?.budgets.map((budget, index) => (
        <MenuItem key={index} value={index}>
          {budget.name}
        </MenuItem>
      ))}
    </TextField>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCancelRemoveBudget} color="primary">Cancel</Button>
    <Button onClick={handleConfirmRemoveBudget} color="primary">Remove</Button>
  </DialogActions>
</Dialog>
    </div>
  );
};

export default BudgetSheet;
