import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
);



export default function MonthlyChart({ monthlyOrders }) {

    const options = {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Revenus Mensuels',
          },
        },
    };

    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'];
    monthlyOrders && monthlyOrders.map((item, index) => item.month = months[index])
      
    let labels = [];
    monthlyOrders && monthlyOrders.map(item => labels.push(item.month));
    let newData = [];
    monthlyOrders && monthlyOrders.map(item => newData.push(item.earnings));
      
    const data = {
        labels,
        datasets: [
          {
            label: 'Revenus',
            data: newData,
            backgroundColor: '#c92a2a',
          }
        ],
    };

    return (
        
        <Bar options={options} data={data} />
       
    )
}
