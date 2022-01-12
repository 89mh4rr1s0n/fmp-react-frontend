import React from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import NotFound from './NotFound'

const Navigation = () => {

    let location = useLocation()
    console.log(location.pathname)

    if (
        location.pathname.includes("company/quote/") || 
        location.pathname.includes("company/profile/") ||
        location.pathname.includes("company/news/") ||
        location.pathname.includes("company/historical/") ||
        location.pathname.includes("company/statistics/") ||
        location.pathname.includes("company/financials/") ||
        location.pathname.includes("signup") ||
        location.pathname.includes("login") ||
        location.pathname.includes("home") ||
        location.pathname.includes("forgot-password") ){
            return <Navbar/> 
        } else {
            return <>
            <Navbar/>
            <NotFound/>
            </>
        }
    
}

export default Navigation
