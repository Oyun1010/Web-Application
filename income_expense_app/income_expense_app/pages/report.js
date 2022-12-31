import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieCharts";
import PieChart2 from "../components/PieChart2";
import NavigationBar from "../components/NavigationBar";

export default function Report() {
    return (
        <div className="flex">
            <NavigationBar />
            <div className="my-5 mx-5">
                <h3 className="h-12 text-xl">Report</h3>               
                <div className="flex justify-around">
                    <BarChart></BarChart>
                    <div className="relative left-20">
                        <PieChart2></PieChart2>
                        <PieChart></PieChart>
                    </div>

                </div>
            </div>
        </div>
    );
}