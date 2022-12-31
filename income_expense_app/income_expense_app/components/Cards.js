import React from "react";
import { useState } from "react";
import Image from "next/image";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function Cards() {
    const [user_id, setUserID] = useState(null);
   
    const [incomes, setIncomes] = useState(null);
    const [expenses, setExpenes] = useState(null);

    const [_incomeAmount, setTotal] = useState(null);
    const [_expenseAmount, setTotal1] = useState(null);
    const [loading, setLoading] = useState(false);

    let incomeAmount = 0;
    let expenseAmount = 0;
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
                    incomeAmount += element.amount;

                });
                setTotal(incomeAmount);
            }
        }

    }, [user_id]);
    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:5000/incomes/" + user_id)
            .then(res => res.json())
            .then(data => {
                setExpenes(data);
                setLoading(false);
            });
        if (expenses != null) {            
            expenses.map((element, i) => {
                expenseAmount += element.amount;
            });
            setTotal1(expenseAmount);
        }
    }, [user_id]);

    const myLoader = ({ src, width, quality }) => {
        return `http://localhost:3000/${src}?w=${width}&q=${quality || 75}`
    }

    return (
        <div className="mt-12 mx-3 flex">
            <div className="w-48 h-56 mx-2 bg-white rounded-3xl py-2 px-2">
                <p className="text-center">Нийт орлого</p>
                <p className="text-center">+{_incomeAmount}₮</p>
                <Image
                    loader={myLoader}
                    src="in.png"
                    alt="Picture of the author"
                    width={500}
                    height={500}
                />
            </div>
            <div className="w-48 h-56 mx-2 bg-white rounded-3xl py-2 px-2">
                <p className="text-center">Нийт зарлага</p>
                <p className="text-center">-{_expenseAmount}₮</p>
                <Image
                    loader={myLoader}
                    src="ex.png"
                    alt="Picture of the author"
                    width={500}
                    height={500}
                />
            </div>
        </div>
    )
}