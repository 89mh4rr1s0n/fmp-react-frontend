import React, { Fragment, useContext, useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import { TickerContext } from './TickerContext';
import {getRandomColor,createImageFromName} from './Utils';

const CompanyHeader = (props) => {

    const [data, setData] = useContext(TickerContext);
    const [loading, setLoading] = useState(false);

    const getQuote = async () => {
        setLoading(true);
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
        // eslint-disable-next-line
    }, [])

    if(loading){
        return <div style={{marginTop: "180px"}}>
                            <nav className="navbar-expand-sm mt-2" style={{backgroundColor: "#e3f2fd", width: "100%"}}>
                <div style={{ width: "100%"}} id="navbarNav">
                    <ul className="navbar-nav . justify-content-around">
                        <li className="nav-item">
                            <NavLink activeClassName="current" to={`/company/quote/${props.location.pathname.split("/").slice(-1)[0]}`}>Quote</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="current" to={`/company/news/${props.location.pathname.split("/").slice(-1)[0]}`}>News</NavLink>
                         </li>
                         <li className="nav-item">
                            <NavLink activeClassName="current" to={`/company/historical/${props.location.pathname.split("/").slice(-1)[0]}`}>Historical Data</NavLink>
                         </li>
                        <li className="nav-item">
                            <NavLink activeClassName="current" isActive={(match, location) => {if (location.pathname.includes("financials")) {return true;}}} to={`/company/financials/income-statement/annual/${props.location.pathname.split("/").slice(-1)[0]}`}>Financials</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="current" to={`/company/profile/${props.location.pathname.split("/").slice(-1)[0]}`}>Profile</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="current" isActive={(match, location) => {if (location.pathname.includes("statistics")) {return true;}}} to={`/company/statistics/key-metrics/annual/${props.location.pathname.split("/").slice(-1)[0]}`}>Statistics</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        
    }

    return <Fragment>
                <div style={{marginTop: "80px"}}>
                <div>
            {data.profile && <>
                <div className="d-flex . mt-5">
                    <div className="col-sm-2" style={{display: "flex", alignItems: "center", width: "100px"}}>
                        <img id="prImg"  alt="company" src={data.profile[0].image}
                        onError={(e)=>{e.target.onerror = null; e.target.src=`${createImageFromName(100, `${props.location.pathname.split("/").slice(-1)[0]}`, getRandomColor())}`   }}></img>
                    </div>
                    <div className="col-sm-10">
                        <h2 style={{margin: "2px"}}>{data.profile[0].companyName} {`(${props.location.pathname.split("/").slice(-1)[0]})`}</h2>
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
                    <ul className="navbar-nav . justify-content-around">
                        <li className="nav-item">
                            <NavLink activeClassName="current" to={`/company/quote/${props.location.pathname.split("/").slice(-1)[0]}`}>Quote</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="current" to={`/company/news/${props.location.pathname.split("/").slice(-1)[0]}`}>News</NavLink>
                         </li>
                         <li className="nav-item">
                            <NavLink activeClassName="current" to={`/company/historical/${props.location.pathname.split("/").slice(-1)[0]}`}>Historical Data</NavLink>
                         </li>
                        <li className="nav-item">
                            <NavLink activeClassName="current" isActive={(match, location) => {if (location.pathname.includes("financials")) {return true;}}} to={`/company/financials/income-statement/annual/${props.location.pathname.split("/").slice(-1)[0]}`}>Financials</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="current" to={`/company/profile/${props.location.pathname.split("/").slice(-1)[0]}`}>Profile</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="current" isActive={(match, location) => {if (location.pathname.includes("statistics")) {return true;}}} to={`/company/statistics/key-metrics/annual/${props.location.pathname.split("/").slice(-1)[0]}`}>Statistics</NavLink>
                        </li>
                    </ul>
                </div>
            </nav></>}
        </div>
        </div>
                
                
        </Fragment>

};

export default CompanyHeader;