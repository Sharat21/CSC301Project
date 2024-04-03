import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Select,
    TextField
} from '@mui/material';

const AddIdeaDialog = ({ open, handleClose, newIdea, setNewIdea, handleSubmit }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewIdea({ ...newIdea, [name]: value });
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add a New Idea</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="Name"
                    label="Name of the Idea"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={newIdea.Name}
                    onChange={handleChange}
                />
                <Select
                    margin="dense"
                    name="Type"
                    label="Type of Idea"
                    fullWidth
                    displayEmpty
                    value={newIdea.Type}
                    onChange={handleChange}
                    variant="outlined"
                >
                    <MenuItem value="" disabled>
                        <em>Type of Idea</em>
                    </MenuItem>
                    {['Destination', 'Transportation', 'Activity', 'Restaurant', 'Accommodation'].map((type) => (
                        <MenuItem key={type} value={type}>{type}</MenuItem>
                    ))}
                </Select>
                <TextField
                    autoFocus
                    margin="dense"
                    name="Description"
                    label="Description of the Idea"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={newIdea.Description}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="link"
                    label="Address for the Idea (Optional)"
                    type="url"
                    fullWidth
                    variant="outlined"
                    value={newIdea.link}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="price"
                    label="Expense/Price of Idea (Optional)"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={newIdea.price}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="max_budget"
                    label="Maximum Allocated Budget for the Idea (Optional)"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={newIdea.max_budget}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
                <Button onClick={handleSubmit} color='success'>Submit</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddIdeaDialog;