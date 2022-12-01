import { NextResponse } from "next/server";


export default function middleware(req) {
  
    let userName = req.cookies.get("email");
    let password = req.cookies.get("password");
    let login = req.cookies.get("login");
    let url = req.url;

    if(!login && url.includes('/home')) {
        return NextResponse.redirect("http://localhost:3000");
    }
    else if(login && url.includes("/sign_in") ) {
        return NextResponse.redirect("http://localhost:3000/home");
    }
    else if(login && url.includes("/sign_up") ) {
        return NextResponse.redirect("http://localhost:3000/home");
    }
    if(userName && password && url.includes("/sing_up")) {
        return NextResponse.redirect("http://localhost:3000/sign_in");
    }

}