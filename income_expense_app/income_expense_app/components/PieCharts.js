import React from 'react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useEffect } from 'react';
import Etypes from '../../data/schema/expenseTypes';
import { config } from 'process';
import { Doughnut } from 'react-chartjs-2';
import { Bar, Line, Scatter, Bubble } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, ArcElement, elements } from 'chart.js'
import Cookies from 'js-cookie';
// Chart.register(ArcElement);
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Title, Tooltip, Legend, ArcElement);

export default function PieCharts() {

    const [iTypes, setItypes] = useState(null);
    const [incomes, setIncomes] = useState(null);
    const [loading, setLoading] = useState(false);
    const [user_id, setUserID] = useState(null);

    let [_salary, setSalary] = useState(0);
    let [_custody, setCustody] = useState(0);
    let [_pension, setPension] = useState(0);
    let [_iOther, setIOther] = useState(0);

    let salary = 0;
    let custody = 0;
    let pension = 0;
    let iOther = 0;

    useEffect(() => {setUserID(Cookies.get("token"))}, []);

    useEffect(() => {
        setLoading(true);
        if (loading) {
            fetch("http://localhost:5000/incomes/" + user_id)
                .then(res => res.json())
                .then(data => {
                    setIncomes(data);
                    setLoading(false);
                });
        }
        else {
            if (incomes != null) {
                incomes.map((element, i) => {
                    if (element.type === 'Цалин') { salary++;}
                    else if (element.type === 'Халамж') { custody++ }
                    else if (element.type === 'Тэтгэвэр') { pension++ }
                    else { iOther++ };

                });
                setSalary(salary);
                setCustody(custody);
                setIOther(iOther);
                setPension(pension);
            }
        }

    },);

    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:5000/itypes")
            .then((res) => res.json())
            .then(data => {
                setItypes(data);
                setLoading(false);
            });
    }, []);

    const data = {
        backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9"],
        labels: iTypes && iTypes.types,
        datasets: [
            {
                label: "Орлого",
                data: [_salary, _pension, _custody, _iOther],
                labels: iTypes && iTypes.types,
                backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9"],
            }
        ],
        hoverOffser: 4,
    };

    const options = {
        elements: {
            arc: {
                weight: 0.5,
                borderWidth: 1,
            },
            title: {
                text: "Орлого зарлагын харьцуулалт",
                display: true,
                color: "#000",
                font: {
                    size: 16,
                }
            },
        },
        plugins: {
            position: 'right',
            legend: {
                position: 'right',
                labels: {
                    usePointStyle: true,
                    pointStyle: 'circle'
                }
            }
        }
    }

    return (
        <>
            <div className="flex justify-around flex-col">
                <div className="h-max w-[400px] py-3 px-6 shadow-lg rounded border">
                    <p>Орлогын ангилал</p>
                    <div className="h-[250px] w-[280px]">
                        <Doughnut data={data} width={50} height={50} options={options}></Doughnut>
                    </div>
                </div>

            </div>
        </>
    );

}
