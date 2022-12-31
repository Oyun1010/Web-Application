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

export default function PieChart2() {

    const [eTypes, setETypes] = useState(null);
    const [expenses, setExpenes] = useState(null);
    const [loading, setLoading] = useState(false);
    const [user_id, setUserID] = useState(null);




    const [_food, setFood] = useState()
    const [_supplies, setSupplies] = useState()
    const [_utilities, setUtilities] = useState()
    const [_transportation, setTransportation] = useState()
    const [_medical, setMedical] = useState()
    const [_clothing, setClothing] = useState()
    const [_housing, setHousing] = useState()
    const [_entertainment, setEntertainment] = useState()
    const [_insurance, setInsurance] = useState()
    const [_saving, setSaving] = useState()
    const [_education, setEducation] = useState()
    const [_eothers, setEOthers] = useState()


    let food = 0;
    let supplies = 0;
    let utilities = 0;
    let transportation = 0;
    let medical = 0;
    let clothing = 0;
    let housing = 0;
    let entertainment = 0;
    let insurance = 0;
    let saving = 0;
    let education = 0;
    let eothers = 0;


    useEffect(() => {setUserID(Cookies.get("token")) }, []);

    useEffect(() => {
        setLoading(true);
        if (loading) {
            fetch("http://localhost:5000/expenses/" + user_id)
                .then(res => res.json())
                .then(data => {
                    setExpenes(data);
                    setLoading(false);
                });
        }
        else {
            if (expenses != null) {
                expenses.map((element, i) => {
                    if (element.type === 'Хүнсний хэрэглээ') { food++ }
                    else if (element.type === 'Ахуйн хэрэглээ') { supplies++ }
                    else if (element.type === 'Тээврийн хэрэгсэл') { transportation++ }
                    else if (element.type === 'Эрүүл мэнд') { medical++ }
                    else if (element.type === 'Бэлэн хувцас') { clothing++ }
                    else if (element.type === 'Орон сууц') { housing++ }
                    else if (element.type === 'Амралт зугаалга') { utilities++ }
                    else if (element.type === 'Төрийн үйлчилгээ') { saving++ }
                    else if (element.type === 'Үзвэр үйлчилгээ') { entertainment++ }
                    else if (element.type === 'Боловсрол') { education++ }
                    else if (element.type === 'Бусад') { eothers++ }

                });
                setFood(food);
                setSupplies(supplies);
                setUtilities(utilities);
                setTransportation(transportation);
                setMedical(medical);
                setClothing(clothing);
                setHousing(housing);
                setEntertainment(entertainment);
                setInsurance(insurance);
                setEducation(education);
                setSaving(saving);
                setEOthers(eothers);
            }
        }
    },);


    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:5000/etypes")
            .then((res) => res.json())
            .then(data => {
                setETypes(data);
                setLoading(false);
            });
    }, []);


    const data = {
        backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850", "#10BBE5", "#0000FF", "#97D49B", "#ECF87F", "#0000A3", "#DE006F", "#55002A"],
        labels: eTypes && eTypes.types,
        datasets: [
            {
                label: "Орлого",
                data: [_food, _supplies, _transportation, _medical, _clothing, _housing, _utilities, _saving, _entertainment, _insurance, _eothers],
                labels: eTypes && eTypes.types,
                backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850", "#10BBE5", "#0000FF", "#97D49B", "#ECF87F", "#0000A3", "#DE006F", "#55002A"],
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
                <div className="h-max w-max py-3 px-6 shadow-lg rounded border">
                    <p>зарлагын ангилал</p>
                    <div className="h-[250px] w-[350px]">
                        <Doughnut data={data} width={50} height={50} options={options}></Doughnut>
                    </div>

                </div>
            </div>
        </>
    );

}
