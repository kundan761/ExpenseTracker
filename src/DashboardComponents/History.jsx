/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import axios from 'axios';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Clear';
import EditTransactionModal from './EditTransaction';
import { Card, CardContent, IconButton, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles'; 

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    width: '80%',
    margin: 'auto',
  },
  sortContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(3), 
    paddingLeft: theme.spacing(2), 
    paddingRight: theme.spacing(2), 
  },
  mainCard: {
    width: '100%', // Change to 100%
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: theme.spacing(2),
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: theme.spacing(2),
  },
  transactionCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    borderRadius: 10,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
  },
  transactionDetails: {
    flex: 1,
  },
  amountContainer: {
    textAlign: 'right',
    minWidth: '98px',
    marginRight: '3px', 
  },
}));

const History = ({ userId }) => {
  const classes = useStyles();
  const [transactions, setTransactions] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [sortOrder, setSortOrder] = useState('Ascending');
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    fetchTransactions();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`https://expensetracker-32wt.onrender.com/users/${userId}/data`);
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions", error);
    }
  };

  const handleEdit = async (editedTransaction) => {
    try {
      await axios.patch(`https://expensetracker-32wt.onrender.com/users/${userId}/data/${editedTransaction.id}`, editedTransaction);
      fetchTransactions(); // Refresh list after edit
    } catch (error) {
      console.error("Error editing transaction", error);
    }
  };

  const handleDelete = async (transactionId) => {
    try {
      await axios.delete(`https://expensetracker-32wt.onrender.com/users/${userId}/data/${transactionId}`);
      fetchTransactions(); // Refresh list after delete
    } catch (error) {
      console.error("Error deleting transaction", error);
    }
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'short', day: '2-digit', month: 'short' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  const handleEditClick = (transaction) => {
    setSelectedTransaction(transaction);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const filteredTransactions = transactions.filter(transaction =>
    filterType ? transaction.type === filterType : true
  );

  filteredTransactions.sort((a, b) => sortOrder === 'Ascending' ?
    new Date(a.date) - new Date(b.date) :
    new Date(b.date) - new Date(a.date)
  );

  return (
    <div className={classes.mainContainer}>
      <div className={classes.sortContainer}>
        <select onChange={(e) => setFilterType(e.target.value)}>
          <option value="">All</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>

        <select onChange={(e) => setSortOrder(e.target.value)}>
          <option value="Ascending">Ascending</option>
          <option value="Descending">Descending</option>
        </select>
      </div>

      <Card className={classes.mainCard}>
        {filteredTransactions.map(transaction => (
          <Card key={transaction.id} className={classes.transactionCard}>
            <div className={classes.transactionDetails}>
              <CardContent>
                <Typography variant="h4" component="h3">
                  {transaction.category}
                </Typography>
                <Typography variant="body1" component="p">
                  {formatDate(transaction.date)}
                </Typography>
                <Typography variant="body1" component="p">
                  {transaction.type}
                </Typography>
              </CardContent>
            </div>
            <div className={classes.amountContainer}>
              <CardContent>
                <Typography variant="h6" component="h3" style={{ textAlign: 'left', color: transaction.type === 'Income' ? 'green' : 'red' }}>
                  {transaction.type === 'Income' ? '+' : '-'}{transaction.amount}
                </Typography>
                <IconButton onClick={() => handleEditClick(transaction)}>
                  <EditNoteIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(transaction.id)}>
                  <DeleteIcon />
                </IconButton>
              </CardContent>
            </div>
          </Card>
        ))}
      </Card>

      <EditTransactionModal
        open={openEditModal}
        handleClose={handleCloseEditModal}
        transaction={selectedTransaction}
        handleEdit={handleEdit}
      />
    </div>
  );
};

export default History;
