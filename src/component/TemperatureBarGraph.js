import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const TemperatureBarGraph = ({ data ,title}) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) chartInstance.current.destroy();

    const myChartRef = chartRef.current.getContext("2d");
    const labels = data.map((_, index) => index + 1); // Generating labels starting from 1

    chartInstance.current = new Chart(myChartRef, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: "Data",
            data,
            backgroundColor: 'rgba(255, 99, 132, 0.9)'
          }
        ]
      },
    });

    return () => {
      if (chartInstance.current) chartInstance.current.destroy();
    };
  }, [data]);

  return <div style={{width: "75%"}}><canvas ref={chartRef} width={300} height={200} /> </div>; // Set custom width and height
};

export default TemperatureBarGraph;
