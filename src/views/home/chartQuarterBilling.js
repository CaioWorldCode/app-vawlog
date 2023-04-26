/* eslint-disable no-underscore-dangle,no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { useSelector } from 'react-redux';
import { APP_PARAMS } from 'constants.js';

const ChartQuarterBilling = (props) => {
    const [chartData, setChartData] = useState([])

    const { themeValues } = useSelector((state) => state.settings);
    const chartContainer = useRef(null);
    const tooltipRef = useRef(null);


    useEffect(() => {
        setChartData(props.chartData)

        if (props.chartData) {
            let myChart = null;

            if (chartContainer && chartContainer.current) {
                const signatures = [];
                const months = [];

                props.chartData.map((row) => (
                    signatures.push(row.total)
                ))

                props.chartData.map((row) => (
                    months.push(APP_PARAMS.months[row.month - 1])
                ))

                Chart.register(...registerables);

                myChart = new Chart(chartContainer.current, {
                    type: 'bar',
                    data: {
                        labels: months,
                        datasets: [
                            {
                                label: 'Assinaturas',
                                icon: 'cart',
                                borderColor: themeValues.primary,
                                backgroundColor: `rgba(${themeValues.primaryrgb},0.1)`,
                                data: signatures,
                            },
                        ]
                    },
                    options: {
                        elements: {
                            bar: {
                                borderWidth: 1.5,
                                borderRadius: parseInt(themeValues.borderRadiusMd, 10),
                                borderSkipped: false,
                            },
                        },
                        tooltip: {
                            enabled: false,
                        },
                        plugins: {
                            crosshair: false,
                            datalabels: false,
                            legend: {
                                position: 'bottom',
                                labels: {
                                    font: {
                                        size: 14,
                                        family: themeValues.font,
                                    },
                                    padding: 20,
                                    usePointStyle: true,
                                    boxWidth: 10,
                                },
                            },

                            streaming: false,
                        },
                        interaction: {
                            intersect: true,
                            mode: 'point',
                        },
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                grid: {
                                    display: true,
                                    lineWidth: 1,
                                    color: themeValues.separatorLight,
                                    drawBorder: false,
                                },
                                ticks: {
                                    beginAtZero: true,
                                    stepSize: 100,
                                    padding: 8,
                                    fontColor: themeValues.alternate,
                                },
                            },
                            x: {
                                grid: { display: false, drawBorder: false },
                            },
                        }
                    }
                });
            }

            return () => {
                if (myChart) {
                    myChart.destroy();
                }
            }
        }

        return false
    }, [props])




    return (
        <>
            <canvas ref={chartContainer} />
        </>
    );
};

export default React.memo(ChartQuarterBilling);
