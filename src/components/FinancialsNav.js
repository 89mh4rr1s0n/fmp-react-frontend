import React, { Fragment } from "react";
import { NavLink, useParams } from 'react-router-dom';

const FinancialNav = (props) => {

    const { symb } = useParams();
    const { report } = useParams();
    const { period } = useParams();

    return <Fragment>
            <div className="d-flex" style={{minWidth: "100%",backgroundColor: "#e3f2fd",height: "30px"}}>
                <div className="justify-content-between" style={{height: "30px"}}>
                    <nav className="navbar-expand-sm" style={{backgroundColor: "#e3f2fd"}}>
                            <ul className="navbar-nav . justify-content-around">
                                <li className="nav-item">
                                    <NavLink activeClassName="current" to={`/company/financials/income-statement/${period}/${symb.toUpperCase()}`}>Income Statement</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink activeClassName="current" to={`/company/financials/balance-sheet/${period}/${symb.toUpperCase()}`}>Balance Sheet</NavLink>
                                 </li>
                                 <li className="nav-item">
                                    <NavLink activeClassName="current" to={`/company/financials/cash-flow/${period}/${symb.toUpperCase()}`}>Cash Flow</NavLink>
                                 </li>
                            </ul>
                    </nav>
                </div>
                <div id="rightNav" style={{float: 'right'}}> 
                <nav className="navbar-expand-sm" style={{backgroundColor: "#e3f2fd"}}>
                            <ul className="navbar-nav . justify-content-around">
                                <li className="nav-item">
                                    <NavLink activeClassName="current" to={`/company/financials/${report}/annual/${symb.toUpperCase()}`}>Annual</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink activeClassName="current" to={`/company/financials/${report}/quarter/${symb.toUpperCase()}`}>Quarterly</NavLink>
                                 </li>
                            </ul>
                    </nav>
                </div>
            </div>
        </Fragment>
}

export default FinancialNav;