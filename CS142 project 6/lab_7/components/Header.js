import React from "react";
import Router from "next/router";

export default function Header() {
    function handler() {
        Router.push({pathname: '/'});
    }

    return(
        <div className="text-3xl flex justify-center font-cinzelDecorative my-4" onClick={() => handler()}>Anime</div>
    );
}