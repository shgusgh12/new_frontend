import styles from "./Chart.module.scss";
import Chart from "react-apexcharts";

export const PreviewLineChart = ({ width, height, dataX, dataY, color }) => {
    return (
        <Chart
            type="line"
            width={width}
            height={height}
            options={{
                chart: {
                    id: "line",
                    toolbar: {
                        show: false,
                    },
                    selection: {
                        enabled: false,
                    },
                },
                states: {
                    active: {
                        filter: {
                            type: "none",
                            value: 0,
                        },
                    },
                },
                markers: {
                    enabled: false,
                },
                stroke: {
                    colors: [color],
                },
                xaxis: {
                    categories: dataX,
                },
                stroke: {
                    curve: "smooth",
                    width: 1.5,
                    colors: [color],
                },
                markers: {
                    colors: [color],
                },
                grid: {
                    show: false,
                },
                legend: {
                    show: false,
                },
                xaxis: {
                    labels: {
                        show: false,
                    },
                    axisBorder: {
                        show: false,
                    },
                },
                yaxis: {
                    labels: {
                        show: false,
                    },
                    axisBorder: {
                        show: false,
                    },
                },
                tooltip: {
                    enabled: false,
                    x: {
                        show: false,
                    },
                    y: {
                        show: false,
                    },
                    marker: {
                        show: false,
                    },
                    fixed: {
                        enabled: false,
                    },
                },
            }}
            series={[
                {
                    name: "price",
                    data: dataY,
                },
            ]}
        />
    );
};
