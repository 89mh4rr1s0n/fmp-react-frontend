import React, { Fragment } from "react";
import { NavLink, useParams } from 'react-router-dom';

const StatisticsNav = (props) => {
  
    const { symb } = useParams();
    const { report } = useParams();
    const { period } = useParams();

    return <Fragment>
        
            <div className="d-flex" style={{minWidth: "100%",backgroundColor: "#e3f2fd",height: "30px"}}>
                <div className="justify-content-between" style={{height: "30px"}}>
                    <nav className="navbar-expand-sm" style={{backgroundColor: "#e3f2fd"}}>
                            <ul className="navbar-nav . justify-content-around">
                                <li className="nav-item">
                                    <NavLink activeClassName="current" to={`/company/statistics/key-metrics/${period}/${symb.toUpperCase()}`}>Key Metrics</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink activeClassName="current" to={`/company/statistics/ratios/${period}/${symb.toUpperCase()}`}>Ratios</NavLink>
                                 </li>
                            </ul>
                    </nav>
                </div>
                <div id="rightNav" style={{float: 'right'}}> 
                <nav className="navbar-expand-sm" style={{backgroundColor: "#e3f2fd"}}>
                            <ul className="navbar-nav . justify-content-around">
                                <li className="nav-item">
                                    <NavLink activeClassName="current" to={`/company/statistics/${report}/annual/${symb.toUpperCase()}`}>Annual</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink activeClassName="current" to={`/company/statistics/${report}/quarter/${symb.toUpperCase()}`}>Quarterly</NavLink>
                                 </li>
                            </ul>
                    </nav>
                </div>
            </div>
        </Fragment>
}

export default StatisticsNav;