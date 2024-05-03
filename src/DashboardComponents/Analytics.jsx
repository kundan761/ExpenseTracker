// /* eslint-disable react/prop-types */
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Pie } from 'react-chartjs-2';

// const Analytics = ({ userId }) => {
//     const [incomeData, setIncomeData] = useState([]);
//     const [expenseData, setExpenseData] = useState([]);

//     useEffect(() => {
//         axios.get(`https://expensetracker-32wt.onrender.com/users/${userId}/data`)
//             .then(response => {
//                 const user = response.data.find(user => user.id === userId);
//                 if (user && Array.isArray(user.data)) {
//                     const income = user.data.filter(item => item.type === 'Income');
//                     const expense = user.data.filter(item => item.type === 'Expense');
//                     setIncomeData(income);
//                     setExpenseData(expense);
//                 }
//             })
//             .catch(error => console.error('Error fetching data:', error));
//     }, [userId]);

//     const incomeDataFormatted = {
//         labels: incomeData.map(item => item.category),
//         datasets: [{
//             data: incomeData.map(item => parseFloat(item.amount)),
//             backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
//         }]
//     };

//     const expenseDataFormatted = {
//         labels: expenseData.map(item => item.category),
//         datasets: [{
//             data: expenseData.map(item => parseFloat(item.amount)),
//             backgroundColor: ['#FF8A80', '#FFD180', '#A1887F'], // Adjust the number of colors
//         }]
//     };

//     return (
//         <div style={{ display: 'flex', flexDirection: 'row', width: '100%', paddingTop: '5%' }}>
//             <div style={{ flex: '1', width: '50%' }}>
//                 <h2 style={{ textAlign: 'center' }}>Income Chart</h2>
//                 <Pie data={incomeDataFormatted} />
//             </div>
//             <div style={{ flex: '1', width: '50%' }}>
//                 <h2 style={{ textAlign: 'center' }}>Expense Chart</h2>
//                 <Pie data={expenseDataFormatted} />
//             </div>
//         </div>
//     );
// };

// export default Analytics;


/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { VictoryPie } from 'victory';

const Analytics = ({ userId }) => {
    const [incomeData, setIncomeData] = useState([]);
    const [expenseData, setExpenseData] = useState([]);

    useEffect(() => {
        axios.get(`https://expensetracker-32wt.onrender.com/users/${userId}/data`)
            .then(response => {
                const user = response.data.find(user => user.id === userId);
                if (user && Array.isArray(user.data)) {
                    const income = user.data.filter(item => item.type === 'Income');
                    const expense = user.data.filter(item => item.type === 'Expense');
                    setIncomeData(income);
                    setExpenseData(expense);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [userId]);

    const incomeDataFormatted = incomeData.map(item => ({
        x: item.category,
        y: parseFloat(item.amount)
    }));

    const expenseDataFormatted = expenseData.map(item => ({
        x: item.category,
        y: parseFloat(item.amount)
    }));

    return (
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', paddingTop: '5%' }}>
            <div style={{ flex: '1', width: '50%' }}>
                <h2 style={{ textAlign: 'center' }}>Income Chart</h2>
                <VictoryPie
                    data={incomeDataFormatted}
                    colorScale={['#FF6384', '#36A2EB', '#FFCE56']}
                />
            </div>
            <div style={{ flex: '1', width: '50%' }}>
                <h2 style={{ textAlign: 'center' }}>Expense Chart</h2>
                <VictoryPie
                    data={expenseDataFormatted}
                    colorScale={['#FF8A80', '#FFD180', '#A1887F']}
                />
            </div>
        </div>
    );
};

export default Analytics;
