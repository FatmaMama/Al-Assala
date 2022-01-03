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



export default function MonthlyChart({ weeklyOrders }) {

    const options = {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Revenus Hebdomadaires',
          },
        },
      };
      
      let labels = [];
      weeklyOrders && weeklyOrders.map(item => labels.unshift(item.week));
      let newData = [];
      weeklyOrders && weeklyOrders.map(item => newData.unshift(item.earnings));
      
      const data = {
        labels,
        datasets: [
          {
            label: 'Revenus',
            data: newData,
            backgroundColor: '#e67e22',
          }
        ],
      };

    return (
        <div>
<Bar options={options} data={data} />
<h1>{console.log(labels)} </h1>
<h1>{console.log(data)} </h1>
        </div>
        
       
    )
}