import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { Bar, Line, Scatter, Bubble } from 'react-chartjs-2';
import {
    Chart as ChartJS, CategoryScale,
    LinearScale, PointElement, LineElement,
    Title, Tooltip, Legend, Filler, ArcElement, BarElement
} from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Title, Tooltip, Legend, ArcElement, BarElement);

export default function BarChart() {

    const [incomes, setIncomes] = useState(null);
    const [expenses, setExpenes] = useState(null);
    const [loading, setLoading] = useState(false);
    const [user_id, setId] = useState(null);
    

    console.log("user_id: ", user_id);

    useEffect(() => {setId(Cookies.get("token"))}, []);

    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:5000/expenses/" + user_id)
            .then(res => res.json())
            .then(data => {
                setExpenes(data);
                setLoading(false);
            });
    }, [user_id]);

    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:5000/incomes/" + user_id)
            .then(res => res.json())
            .then(data => {
                setIncomes(data);
                setLoading(false);
            });
    }, [user_id]);


    // useEffect(() => {
    //     var config = {
    //         type: "line",
    //         data: {
    //             labels: [
    //                 "1-р сар", "2-р сар","3-р сар","4-р сар","5-р сар","6-р сар","7-р сар","8-р сар","9-р сар","10-р сар","11-р сар", "12-р сар"
    //             ],
    //             datasets: [
    //                 {
    //                     label: "Зарлага",
    //                     backgroundColor: "#D10000",
    //                     borderColor: "#D10000",
    //                     data: expenses && expenses.map((el, i) => {
    //                         return el.amount
    //                     }),
    //                     fill: false,
    //                 },
    //                 {
    //                     label: new Date().getFullYear() - 1,
    //                     fill: false,
    //                     backgroundColor: "#2EFF2E",
    //                     borderColor: "#2EFF2E",
    //                     data: incomes && incomes.map((el, i) => {
    //                         return el.amount
    //                     }),
    //                 },
    //             ],
    //         },
    //         options: {
    //             maintainAspectRatio: false,
    //             responsive: true,
    //             title: {
    //                 display: false,
    //                 text: "Sales Charts",
    //                 fontColor: "white",
    //             },
    //             legend: {
    //                 labels: {
    //                     fontColor: "white",
    //                 },
    //                 align: "end",
    //                 position: "bottom",
    //             },
    //             tooltips: {
    //                 mode: "index",
    //                 intersect: false,
    //             },
    //             hover: {
    //                 mode: "nearest",
    //                 intersect: true,
    //             },
    //             scales: {
    //                 xAxes: [
    //                     {
    //                         ticks: {
    //                             fontColor: "rgba(255,255,255,.7)",
    //                         },
    //                         display: true,
    //                         scaleLabel: {
    //                             display: false,
    //                             labelString: "Month",
    //                             fontColor: "white",
    //                         },
    //                         gridLines: {
    //                             display: false,
    //                             borderDash: [2],
    //                             borderDashOffset: [2],
    //                             color: "rgba(33, 37, 41, 0.3)",
    //                             zeroLineColor: "rgba(0, 0, 0, 0)",
    //                             zeroLineBorderDash: [2],
    //                             zeroLineBorderDashOffset: [2],
    //                         },
    //                     },
    //                 ],
    //                 yAxes: [
    //                     {
    //                         ticks: {
    //                             fontColor: "rgba(255,255,255,.7)",
    //                         },
    //                         display: true,
    //                         scaleLabel: {
    //                             display: false,
    //                             labelString: "Value",
    //                             fontColor: "white",
    //                         },
    //                         gridLines: {
    //                             borderDash: [3],
    //                             borderDashOffset: [3],
    //                             drawBorder: false,
    //                             color: "rgba(255, 255, 255, 0.15)",
    //                             zeroLineColor: "rgba(33, 37, 41, 0)",
    //                             zeroLineBorderDash: [2],
    //                             zeroLineBorderDashOffset: [2],
    //                         },
    //                     },
    //                 ],
    //             },
    //         },
    //     };
    //     var ctx = document.getElementById("line-chart").getContext("2d");
    //     window.myLine = new Chart(ctx, config);
    // }, []);

    const data = {
        labels: [
            "1", "2", "3",
            "4", "5", "6",
            "7", "8", "9",
            "10", "11", "12"
        ],
        datasets: [
            {
                label: "Орлого",
                borderRadius: 20,
                data: incomes && incomes.map((el, i) => {
                    return el.amount
                }),
                backgroundColor: "rgba(255,255,255,.7)",
                fill: false,
                backgroundColor: "#2EFF2E",
                borderColor: "#2EFF2E",
                barThicnkess: 25
            },
            {
                label: "Зарлага",
                borderRadius: 30,
                data: expenses && expenses.map((el, i) => {
                    return el.amount
                }),
                backgroundColor: "#D10000",
                borderColor: "#D10000",
                barThicnkess: 15
            }
        ]
    }
    const options = {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
            labels: {
                fontColor: "white",
            },
            align: "end",
            position: "bottom",
        },
        tooltips: {
            mode: "index",
            intersect: false,
        },
        hover: {
            mode: "nearest",
            intersect: true,
        },
        scales: {
            x: [
                {
                    ticks: {
                        fontColor: "rgba(255,255,255,.7)",
                    },
                    display: true,
                    scaleLabel: {
                        display: false,
                        labelString: "Month",
                        fontColor: "white",
                    },
                    gridLines: {
                        display: false,
                        borderDash: [2],
                        borderDashOffset: [2],
                        color: "rgba(33, 37, 41, 0.3)",
                        zeroLineColor: "rgba(0, 0, 0, 0)",
                        zeroLineBorderDash: [2],
                        zeroLineBorderDashOffset: [2],
                    },
                },
            ],
            y: [
                {
                    ticks: {
                        fontColor: "rgba(255,255,255,.7)",
                    },
                    display: true,
                    scaleLabel: {
                        display: false,
                        labelString: "Value",
                        fontColor: "white",
                    },
                    gridLines: {
                        borderDash: [3],
                        borderDashOffset: [3],
                        drawBorder: false,
                        color: "rgba(255, 255, 255, 0.15)",
                        zeroLineColor: "rgba(33, 37, 41, 0)",
                        zeroLineBorderDash: [2],
                        zeroLineBorderDashOffset: [2],
                    },
                },
            ],
        },
        elements: {
            bar: {
                barPercentage: 0.3,
                categoryPercentage: 1
            }
        }

    }
    return (
        <>
            <div className="relative flex flex-col w-[700px] px-4 shadow-lg rounded bg-blueGray-700">
                <p className="text-center h-10">Орлого зарлагын харьцуулалт</p>
                <div className="relative h-[300px] w-[600px] flex items-center">
                    <Bar data={data} height={250} options={options}></Bar>
                </div>

            </div>
        </>
    );

}