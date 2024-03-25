import React, { useState, useEffect } from 'react';
import {
  AppBar,
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
  Toolbar,
  LinearProgress,
} from '@mui/material';
import './BudgetSheet.css';
import NavBar from './pages/components/NavBar';
import TripDetailsHeader from './pages/components/TripDetailsHeader';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BudgetSheet = () => {
  const [categories, setCategories] = useState([
    { name: 'Accommodation', budgets: [], total: 0 },
    { name: 'Activity', budgets: [], total: 0 },
    { name: 'Restaurant', budgets: [], total: 0 },
    { name: 'Transportation', budgets: [], total: 0 }
  ]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [overallTotal, setOverallTotal] = useState(0);
  const { routeName, tripId, userId } = useParams();
  const baseURL = `http://localhost:14000/api/ideas`;

  useEffect(() => {
    const fetchIdeasByType = async (type) => {
      try {
        const response = await axios.get(`${baseURL}/confirmed-ideas-trip/${type}/${tripId}`);
        return response.data;
      } catch (error) {
        console.error(`Fetching ideas of type ${type} failed:`, error);
      }
      return [];
    };

    const fetchAllIdeasAndCategorize = async () => {
      let overallTotal = 0;
    
      const promises = categories.map(category => fetchIdeasByType(category.name));
      const ideasByType = await Promise.all(promises);
    
      const updatedCategories = categories.map((category, index) => {
        let categoryTotal = 0;
    
        const budgets = ideasByType[index].map(idea => {
          const price = idea.price;
          categoryTotal += price;
          overallTotal += price;
    
          return {
            name: idea.Name,
            amount: price,
            max: idea.max_budget,
          };
        });
    
        return {
          ...category,
          budgets,
          total: categoryTotal,
        };
      });
    
      setCategories(updatedCategories);
      setOverallTotal(overallTotal);
    };

    fetchAllIdeasAndCategorize();
  }, [tripId]);
  

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
    <div>
      <TripDetailsHeader userId={userId}/>
      <NavBar/>
      <AppBar position="static" sx={{ width: '100%' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ fontSize: '24px' }}>
            Budget Sheet
          </Typography>
        </Toolbar>
      </AppBar>
      {categories.map((category, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <Card className="category-card">
            <CardContent>
              <Typography variant="h5" className="category-header">{category.name}</Typography>
              <Typography variant="subtitle1">Total: ${category.total.toFixed(2)}</Typography>
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
      <Card className="category-card">
        <CardContent>
          <Typography variant="h5" style={{ fontWeight: 'bold', fontSize: 30 }}>
            Total Expenses: ${overallTotal.toFixed(2)}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetSheet;
