import Cookies from "js-cookie";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";


export default function Expense() {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [types, setTypes] = useState(null);
    const [category, setCategory] = useState(null);
    const [expenseType, setExpenseType] = useState(null);

    const [user_id, setUserID] = useState(null);
    useEffect(() => {setUserID(Cookies.get("token"))}, [])

    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:5000/expenses/" + user_id)
            .then(res => res.json())
            .then(data => {
                setData(data);
                setLoading(false);
            })

    }, [user_id]);

    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:5000/etypes")
            .then((res) => res.json())
            .then(data => {
                setTypes(data);
                setLoading(false);
            });
    }, []);
    console.log(types);
    const expenseChange = (event) => {
        setExpenseType(event.target.value);
        console.log(expenseType);
    }

    const startHandleChange = date => {
        setStartDate(date.format);
    }
    const endHandleChange = date => {
        setEndDate(date.format);
    }




    return (

        <div className="w-full mx-5 justify-center">
            <div className="w-full flex justify-center">
                <input
                    className="w-48 mx-3 bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg justify-center rounded-3xl"
                    type="date"
                    value={startDate}
                    onChange={startHandleChange
                    } />
                <input
                    className="w-48 bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg justify-center rounded-3xl"
                    type="date"
                    value={endDate}
                    onChange={endHandleChange} />

                <select className="w-48 h-10 mx-2 rounded-3xl px-3 bg-white" onChange={expenseChange}>
                    <option value="select">Ангилал</option>
                    {
                        types && types.types && types.types.map((item, i) => {
                            return (
                                <option key={i} value={item}>{item}</option>
                            );
                        })
                    }
                </select>

            </div>



            <p className="text-lg h-10">Зарлага</p>
            <div className="flex justify-center h-[400px] overflow-y-auto overflow-x-hidden ">
                <div className="w-5/6 bg-white bg-opacity-40 backdrop-blur-md rounded drop-shadow-lg">
                    <div className="h-8 flex justify-between border border-gray-300">
                        <p className="w-32 h-18 text-center">Огноо</p>
                        <p className="w-32 h-18 text-center">Үнийн дүн</p>
                        <p className="w-32 h-18 text-center">Ангилал</p>
                    </div>

                    {
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((element, i) => {
                            return (
                                <div key={i}>
                                    {
                                        data && data
                                            .filter((val) => {
                                                if (parseInt(val.date_time.toString().substring(5, 9)) === element) {
                                                    return val;
                                                }
                                                else if(startDate && endDate && startDate >= data.date_time && endDate <= data.date_time) return val;
                                                else if(expenseType !=null  && expenseType == data.type) return val;
                                            
                                            })
                                            .map((item, i) => {
                                                return (
                                                    <div key={i} className="w-full  justify-between items-center flex h-14 border border-gray-300  px-2">
                                                        <p>{item.date_time.toString().substring(0, 10)} {item.date_time.toString().substring(11, 16)}</p>
                                                        <p className="text-lg text-[#FF5C5C]">-{item.amount}₮</p>
                                                        <p className="text-lg mx-2 text-left w-36 h-14 flex flex-wrap items-center">{item.type}</p>
                                                    </div>

                                                );
                                            })
                                    }

                                </div>
                            );
                        })
                    }
                </div>

            </div>
        </div>
    )
}