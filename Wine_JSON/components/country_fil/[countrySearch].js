import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import WineData from "./wine-data";

export default function CountryFilter({countryName}) {
    const [data, setData] = useState();
    const [isLoading, setLoading] = useState(false);

    return (
        <div>
            <h2>Country</h2>
            {data && data.data && data.data.map((e, i) => {
                console.log(e);
                return (
                    <div>
                    </div>
                )
            })}

        </div>
    );

}