import React, { Fragment, useContext, useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import { TickerContext } from './TickerContext';
import {getRandomColor,createImageFromName} from './Utils';

const CompanyHeader = (props) => {
    const [data, setData] = useContext(TickerContext);
    const [loading, setLoading] = useState(false);


    const getQuote = async () => {
        setLoading(true);
        //const info = await fetch(`http://fmp-react-app.herokuapp.com/company/info/${data.profile[0].symbol.toUpperCase()}`)
        const info = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/company/info/${props.location.pathname.split("/").slice(-1)[0]}`)
        const jsonInfo = await info.json();
        setData(jsonInfo)
        setLoading(false);
    }

    const setTheData = () => {
        setLoading(true);
        setData(data)
        //console.log(data)
        setLoading(false);
    }


    useEffect(() => {
        setTheData()
        getQuote()
    }, [])

    if(loading){
        return <div style={{marginTop: "180px"}}>
        </div>
    }

    return <Fragment>
                <div style={{marginTop: "80px"}}>
                <div>
            {data.profile && <>
                <div className="d-flex . mt-5">
                    <div className="col-sm-2" style={{display: "flex", alignItems: "center", width: "100px"}}>
                        <img id="prImg" src={data.profile[0].image}
                        onError={(e)=>{e.target.onerror = null; e.target.src=`${createImageFromName(100, `${data.profile[0].symbol}`, getRandomColor())}`   }}></img>
                    </div>
                    <div className="col-sm-10">
                        <h2 style={{margin: "2px"}}>{data.profile[0].companyName} {`(${data.profile[0].symbol})`}</h2>
                        <p id="exchange">{data.profile[0].exchangeShortName} {`${data.profile[0].exchange} -- price quoted in ${data.profile[0].currency}`}</p>
                        <div className="d-flex . mt-0 . align-items-end">
                            <h2 style={{fontWeight: "650"}}>{data.quote[0].price.toFixed(2)}</h2>
                            <p style={{
                                marginLeft: "10px", 
                                marginBottom: "8px", 
                                fontSize: "20px",
                                fontWeight: "700",
                                color: data.quote[0].change > 0 ? "green" : "red"
                                }}>{data.quote[0].change.toFixed(2)}</p>
                            <p style={{
                                marginLeft: "10px", 
                                marginBottom: "8px", 
                                fontSize: "20px",
                                fontWeight: "700",
                                color: data.quote[0].changesPercentage > 0 ? "green" : "red"
                                }}>{`(${data.quote[0].changesPercentage.toFixed(2)}%)`}</p>
                        </div>
                    </div>
                </div>

                <nav className="navbar-expand-sm mt-2" style={{backgroundColor: "#e3f2fd", width: "100%"}}>
                <div style={{ width: "100%"}} id="navbarNav">
                    <ul class="navbar-nav . justify-content-around">
                        <li class="nav-item">
                            <NavLink activeClassName="current" to={`/company/quote/${data.profile[0].symbol}`}><a class="nav-link" href="#">Quote</a></NavLink>
                        </li>
                        <li class="nav-item">
                            <NavLink activeClassName="current" to={`/company/news/${data.profile[0].symbol}`}><a class="nav-link" href="#">News</a></NavLink>
                         </li>
                         <li class="nav-item">
                            <NavLink activeClassName="current" to={`/company/historical/${data.profile[0].symbol}`}><a class="nav-link" href="#">Historical Data</a></NavLink>
                         </li>
                        <li class="nav-item">
                            <NavLink activeClassName="current" isActive={(match, location) => {if (location.pathname.includes("financials")) {return true;}}} to={`/company/financials/income-statement/annual/${data.profile[0].symbol}`}><a class="nav-link" href="#">Financials</a></NavLink>
                        </li>
                        <li class="nav-item">
                            <NavLink activeClassName="current" to={`/company/profile/${data.profile[0].symbol}`}><a class="nav-link" href="#">Profile</a></NavLink>
                        </li>
                        <li class="nav-item">
                            <NavLink activeClassName="current" isActive={(match, location) => {if (location.pathname.includes("statistics")) {return true;}}} to={`/company/statistics/key-metrics/annual/${data.profile[0].symbol}`}><a class="nav-link" href="#">Statistics</a></NavLink>
                        </li>
                    </ul>
                </div>
            </nav></>}
        </div>
        </div>
                
                
        </Fragment>

};

export default CompanyHeader;