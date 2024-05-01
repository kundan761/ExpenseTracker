import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
// import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Card, CardContent, Typography } from '@material-ui/core';

const Tracker = () => {
  const [form, setForm] = useState({
    type: '',
    category: '',
    amount: '',
    date: ''
  });
  const user = useSelector(state => state.user.value);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const transactionID = generateTransactionID();
    const userWithIdAndTransactionID = { ...form, id: user.id, transactionID };
    try {
      await axios.post(`https://expensetracker-32wt.onrender.com/users/${user.id}/data`, userWithIdAndTransactionID);
      alert('Data saved successfully!');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const generateTransactionID = () => {
    // Generate a unique transaction ID here
    return Math.random().toString(36).substring(7);
  };

  const categories = form.type === 'Income' ? ['Salary', 'Gifts', 'Refunds', 'Other'] : ['Food & Drinks', 'Shopping', 'Housing', 'Bills', 'Vehicle & Transport', 'Lifestyle'];

  return (
    <Card style={{ maxWidth: 400, margin: 'auto', marginTop: 50, padding: 20 }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Expense Tracker
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select name="type" value={form.type} onChange={handleChange}>
              <MenuItem value="Income">Income</MenuItem>
              <MenuItem value="Expense">Expense</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select name="category" value={form.category} onChange={handleChange}>
              {categories.map(category => (
                <MenuItem key={category} value={category}>{category}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField name="amount" value={form.amount} onChange={handleChange} label="Amount in Rupees" fullWidth />
          <TextField name="date" value={form.date} onChange={handleChange} label="Date" type="date" fullWidth InputLabelProps={{ shrink: true }} />
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: 20 }}>Create</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Tracker;
