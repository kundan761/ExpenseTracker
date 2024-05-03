/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const Analytics = ({userId}) => {
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


    const incomeChartConfig = {
        labels: incomeData.map(item => item.category),
        data: incomeData.map(item => parseFloat(item.amount)),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    };

    const expenseChartConfig = {
        labels: expenseData.map(item => item.category),
        data: expenseData.map(item => parseFloat(item.amount)),
        backgroundColor: ['#FF8A80', '#FFD180', '#A1887F'], // Adjust the number of colors
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'row', width:'100%' , paddingTop:'5%'}}>
            <div style={{ flex: '1', width: '50%' }}>
                <h2 style={{textAlign:'center'}}>Income Chart</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={incomeChartConfig.data}
                            dataKey="amount" // Corrected data key
                            nameKey="labels"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            label
                        >
                            {incomeChartConfig.labels.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={incomeChartConfig.backgroundColor[index]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div style={{ flex: '1', width: '50%' }}>
                <h2 style={{textAlign:'center'}}>Expense Chart</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={expenseChartConfig.data}
                            dataKey="amount" // Corrected data key
                            nameKey="labels"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#82ca9d"
                            label
                        >
                            {expenseChartConfig.labels.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={expenseChartConfig.backgroundColor[index]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Analytics;
