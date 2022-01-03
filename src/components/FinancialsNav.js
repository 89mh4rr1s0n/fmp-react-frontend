import React, { Fragment, useContext, useEffect, useState } from "react";
import { NavLink, useParams } from 'react-router-dom';
import { TickerContext } from './TickerContext';

const FinancialNav = (props) => {
    const [data, setData] = useContext(TickerContext);
    const [loading, setLoading] = useState(false);
    const { symb } = useParams();
    const { report } = useParams();
    const { period } = useParams();

    const initialize = async () => {
        setLoading(true);
        const quote = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/company/info/${symb.toUpperCase()}`)
        const jsonQuote = await quote.json();
        setData(jsonQuote)
        data.report = "income-statement";
        setLoading(false);
    }

    console.log(symb)
    console.log(report)
    console.log(period)

    useEffect(() => {
        //initialize();
    }, [])



    return <Fragment>
        {data && <>
            <div className="d-flex" style={{minWidth: "100%",backgroundColor: "#e3f2fd",height: "30px"}}>
                <div className="justify-content-between" style={{height: "30px"}}>
                    <nav className="navbar-expand-sm" style={{backgroundColor: "#e3f2fd"}}>
                            <ul class="navbar-nav . justify-content-around">
                                <li class="nav-item">
                                    <NavLink activeClassName="current" to={`/company/financials/income-statement/${period}/${symb.toUpperCase()}`}><a class="nav-link" href="#">Income Statement</a></NavLink>
                                </li>
                                <li class="nav-item">
                                    <NavLink activeClassName="current" to={`/company/financials/balance-sheet/${period}/${symb.toUpperCase()}`}><a class="nav-link" href="#">Balance Sheet</a></NavLink>
                                 </li>
                                 <li class="nav-item">
                                    <NavLink activeClassName="current" to={`/company/financials/cash-flow/${period}/${symb.toUpperCase()}`}><a class="nav-link" href="#">Cash Flow</a></NavLink>
                                 </li>
                            </ul>
                    </nav>
                </div>
                <div id="rightNav" style={{float: 'right'}}> 
                <nav className="navbar-expand-sm" style={{backgroundColor: "#e3f2fd"}}>
                            <ul class="navbar-nav . justify-content-around">
                                <li class="nav-item">
                                    <NavLink activeClassName="current" to={`/company/financials/${report}/annual/${symb.toUpperCase()}`}><a class="nav-link" href="#">Annual</a></NavLink>
                                </li>
                                <li class="nav-item">
                                    <NavLink activeClassName="current" to={`/company/financials/${report}/quarter/${symb.toUpperCase()}`}><a class="nav-link" href="#">Quarterly</a></NavLink>
                                 </li>
                            </ul>
                    </nav>
                </div>
            </div></>}
        </Fragment>
}

export default FinancialNav;