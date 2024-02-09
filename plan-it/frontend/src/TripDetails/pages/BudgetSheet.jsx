import React, { useState } from 'react';
import Container from "react-bootstrap/Container"
import { Stack, Button, Modal, Form, Card, ProgressBar, Dropdown } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import './BudgetSheet.css'; // Import custom CSS file for styling

const BudgetSheet = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEditMenu, setShowEditMenu] = useState(false);
  const [selectedBudgetIndex, setSelectedBudgetIndex] = useState(null);
  const [budgets, setBudgets] = useState([]);
  const [newBudget, setNewBudget] = useState({
    name: "",
    amount: "",
    max: ""
  });

  const handleClose = () => {
    setShowModal(false);
    // Reset the new budget state
    setNewBudget({
      name: "",
      amount: "",
      max: ""
    });
  };
  const handleShow = () => setShowModal(true);

  const handleAddBudget = () => {
    // Ensure budget amount is not negative
    const amount = Math.max(0, newBudget.amount);
    setBudgets([...budgets, { ...newBudget, amount }]);
    handleClose();
  };

  const handleEditBudget = (index) => {
    setSelectedBudgetIndex(index);
    setShowEditMenu(true);
  };

  const handleRemoveBudget = () => {
    const updatedBudgets = budgets.filter((budget, index) => index !== selectedBudgetIndex);
    setBudgets(updatedBudgets);
    setShowEditMenu(false);
  };

  const handleEditBudgetDetails = (field, value) => {
    // Ensure budget amount is not negative
    if (field === 'amount') {
      value = Math.max(0, value);
    }
    const updatedBudgets = [...budgets];
    updatedBudgets[selectedBudgetIndex][field] = value;
    setBudgets(updatedBudgets);
  };

  const getProgressBarVariant = (percentage) => {
    if (percentage >= 100) return 'danger';
    if (percentage >= 80) return 'warning';
    if (percentage >= 50) return 'info';
    return 'success';
  };

  return (
    <div className="bg-light"> {/* Apply light greyish background color */}
      <Container className='my-2' id='budget'>
        <Stack direction='horizontal' gap="4" className='mb-4'>
          <h1 className='mx-auto fancy-title'>Budgets</h1> {/* Fancy title */}
          <Button variant='outline-primary' onClick={handleShow}>Add Budget</Button>
          {budgets.length > 1 && (
            <Button variant='outline-secondary' onClick={() => setShowEditMenu(true)}>Edit Budgets</Button>
          )}
        </Stack>

        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Budget</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Budget Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter budget name"
                  value={newBudget.name}
                  onChange={(e) => setNewBudget({ ...newBudget, name: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Budget Amount</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter budget amount"
                  value={newBudget.amount}
                  onChange={(e) => setNewBudget({ ...newBudget, amount: Math.max(0, parseInt(e.target.value, 10)) })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Max Budget Amount</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter max budget amount"
                  value={newBudget.max}
                  onChange={(e) => setNewBudget({ ...newBudget, max: Math.max(0, parseInt(e.target.value, 10)) })}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
            <Button variant="primary" onClick={handleAddBudget}>Add</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showEditMenu} onHide={() => setShowEditMenu(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Budgets</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {budgets.map((budget, index) => (
              <div key={index}>
                <Button variant="outline-danger" onClick={() => handleRemoveBudget(index)}>Remove Budget {index + 1}</Button>
                <Dropdown>
                  <Dropdown.Toggle variant="outline-secondary" id={`dropdown-basic-${index}`}>
                    Edit Budget {index + 1}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleEditBudgetDetails('name', prompt('Enter new name'))}>Edit Name</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleEditBudgetDetails('amount', prompt('Enter new amount'))}>Edit Amount</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleEditBudgetDetails('max', prompt('Enter new max amount'))}>Edit Max Amount</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditMenu(false)}>Close</Button>
          </Modal.Footer>
        </Modal>

        <div className="budget-cards-container"> {/* Container for budget cards */}
          {budgets.map((budget, index) => {
            const percentage = (budget.amount / budget.max) * 100 || 0;
            const progressBarVariant = getProgressBarVariant(percentage);

            return (
              <Card key={index} className="text-center budget-card" onDoubleClick={() => handleEditBudget(index)}>
                <Card.Body>
                  <Card.Title>{budget.name}</Card.Title>
                  <Card.Text>
                    Amount: {budget.amount}
                  </Card.Text>
                  <Card.Text>
                    Max: {budget.max}
                  </Card.Text>
                  <ProgressBar now={percentage} variant={progressBarVariant} />
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default BudgetSheet;