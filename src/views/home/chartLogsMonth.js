import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Card } from 'react-bootstrap';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

// eslint-disable-next-line import/no-anonymous-default-export
export default function (props) {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'x',
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Acessos por mês',
            },
        },
    };

    const labels = props.data.label;

    const data = {
        labels,
        datasets: [
            {
                label: 'Acessos',
                data: props.data.values,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return <Card>
        <Card.Body>
            <Bar height={300} options={options} data={data} />
        </Card.Body>
    </Card>
}
