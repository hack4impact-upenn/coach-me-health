import React, { useEffect, useRef } from "react";
import Chart, { ChartDataSets, ChartPoint } from "chart.js";

import styled from 'styled-components';

const CanvasContainer = styled.div`
    padding: 20px;
    background-color: white;
    border-radius: 15px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
`

const GraphHeader = styled.h4`
    padding: 10px 20px 20px 20px;
    font-weight: 600;
    font-size: 20px;
`

const testData: ChartPoint[] = [
    {
        x: new Date(2020, 11, 7),
        y: 110
    }, {
        x: new Date(2020, 11, 10),
        y: 80
    },
    {
        x: new Date(2020, 11, 11),
        y: 100
    },
    {
        x: new Date(2020, 11, 12),
        y: 70
    }
]

interface LineChartProps {
    data?: ChartPoint[]
}

const LineChart : React.FC<LineChartProps> = ( props: LineChartProps ) => {
    const chartRef = useRef(null);
    const data = props.data || testData;

    useEffect(() => {
        const myChartRef = (chartRef!.current! as any).getContext("2d");

        new Chart(myChartRef, {
            type: "line",
            data: {
                datasets: [{
                    fill: false,
                    data: testData,
                    backgroundColor: "#A6CEE3",
                    borderColor: "#A6CEE3"
                }
                ]
            },
            options: {
                scales: {
                    xAxes: [{
                        type: 'time',
                        distribution: 'linear',
                        time: {
                            unit: "day",
                            stepSize: 1
                        }
                    }]
                },
                legend: {
                    display: false
                }
            }
        })
    }, []);

    return (
        <CanvasContainer>
            <GraphHeader>Weekly Patient Dashboard</GraphHeader>
            <canvas ref={chartRef}></canvas>
        </CanvasContainer>
    )
}

export default LineChart;