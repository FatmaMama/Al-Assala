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
            text: 'Monthly Revenues',
          },
        },
      };
      
      let labels = [];
      monthlyOrders.map(item => labels.unshift(item.month));
      let newData = [];
      monthlyOrders.map(item => newData.unshift(item.earnings));
      
      const data = {
        labels,
        datasets: [
          {
            data: newData,
            backgroundColor: '#c92a2a',
          }
        ],
      };

    return (
        
        <Bar options={options} data={data} />
       
    )
}
