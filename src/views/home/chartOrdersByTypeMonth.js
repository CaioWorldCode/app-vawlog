import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Card } from 'react-bootstrap';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

// eslint-disable-next-line import/no-anonymous-default-export
export default function (props) {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        scales: {
            y: {
                type: 'linear',
                display: true,
                position: 'left',
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                grid: {
                    drawOnChartArea: false,
                },
            },
        },
        stacked: false,
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
                text: 'Ordens de coleta por mês / por tipo',
            },
        },
    };
    const labels = []

    if (props.data) {
        if (props.data.length > 0) {
            props.data.map((row, i) => {
                if (i === 0) {
                    Object.keys(row.data).map((r) => {
                        labels.push(r)
                    })
                }
            })
        }
    }

    const sets = []

    const colors = [
        {
            borderColor: 'rgb(31, 138, 112)',
            backgroundColor: 'rgba(31, 138, 112, 0.5)'
        },
        {
            borderColor: 'rgb(252, 115, 0)',
            backgroundColor: 'rgba(252, 115, 0, 0.5)'
        },
        {
            borderColor: 'rgb(191, 219, 56)',
            backgroundColor: 'rgba(191, 219, 56, 0.5)'
        },
        {
            borderColor: 'rgb(0, 51, 124)',
            backgroundColor: 'rgba(0, 51, 124, 0.5)'
        },
        {
            borderColor: 'rgb(255, 234, 32)',
            backgroundColor: 'rgba(255, 234, 32, 0.5)'
        },
        {
            borderColor: 'rgb(252, 41, 71)',
            backgroundColor: 'rgba(252, 41, 71, 0.5)'
        },
        {
            borderColor: 'rgb(113, 73, 198)',
            backgroundColor: 'rgba(113, 73, 198, 0.5)'
        },
        {
            borderColor: 'rgb(31, 138, 112)',
            backgroundColor: 'rgba(31, 138, 112, 0.5)'
        },
        {
            borderColor: 'rgb(252, 115, 0)',
            backgroundColor: 'rgba(252, 115, 0, 0.5)'
        },
        {
            borderColor: 'rgb(191, 219, 56)',
            backgroundColor: 'rgba(191, 219, 56, 0.5)'
        },
        {
            borderColor: 'rgb(0, 51, 124)',
            backgroundColor: 'rgba(0, 51, 124, 0.5)'
        },
        {
            borderColor: 'rgb(255, 234, 32)',
            backgroundColor: 'rgba(255, 234, 32, 0.5)'
        },
        {
            borderColor: 'rgb(252, 41, 71)',
            backgroundColor: 'rgba(252, 41, 71, 0.5)'
        },
        {
            borderColor: 'rgb(113, 73, 198)',
            backgroundColor: 'rgba(113, 73, 198, 0.5)'
        },

    ]

    if (props.data) {
        if (props.data.length > 0) {
            props.data.map((row, i) => {
                let data = []

                Object.values(row.data).map((r) => {
                    data.push(r)
                })

                sets.push({
                    label: row.name,
                    data: data,
                    borderColor: row.color ? row.color : colors[i].borderColor,
                    backgroundColor: row.color ? row.color : colors[i].backgroundColor,
                })
            })
        }
    }

    const data = {
        labels,
        datasets: sets
    };

    return <Card>
        <Card.Body>
            <Line height={300} options={options} data={data} />
        </Card.Body>
    </Card>
}
