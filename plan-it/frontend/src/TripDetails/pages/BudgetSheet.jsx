import React from 'react';
import Container from "react-bootstrap/Container"
import { Stack, Button} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import BCard from './BCard';

const BudgetSheet = () => {
  return (
    <Container className='my-4' id='budget'>
      <Stack direction='horizontal' gap="2" className='mb-4'>
        <h1 className='mx-auto'> Budgets</h1>
        <Button variant='primary'> Add Budget </Button>
        <Button variant='outline-primary'> Add Expense </Button>

      </Stack>
      {/* <div style={{display:"grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem", alignItems: "flex-start"}}></div> */}
      {/* <BCard
        name="Restaurants"
        gray
        amount = {200}
        max = {1000}
        >
        </BCard> */}
    </Container>
  );
};

export default BudgetSheet;