/* eslint-disable react/prop-types */
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const EditTransactionModal = ({ open, handleClose, transaction, handleEdit }) => {
  const [editedTransaction, setEditedTransaction] = useState(transaction || {});

  useEffect(() => {
    setEditedTransaction(transaction || {});
  }, [transaction]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTransaction((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    handleEdit(editedTransaction);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Transaction</DialogTitle>
      <DialogContent>
        <TextField
          name="category"
          label="Category"
          value={editedTransaction.category || ''}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="type"
          label="Type"
          value={editedTransaction.type || ''}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="amount"
          label="Amount"
          value={editedTransaction.amount || ''}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="date"
          label="Date"
          type="date"
          value={editedTransaction.date || ''}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTransactionModal;