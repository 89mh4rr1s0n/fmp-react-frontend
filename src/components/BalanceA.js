import React, { Fragment, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import ReactLoading from "react-loading";
import { Tooltip, OverlayTrigger } from "react-bootstrap"

const BalanceA = () => {

    const { symb } = useParams();
    const [loading, setLoading] = useState(false);
    const [balanceA, setBalanceA] = useState(null);

    const key = process.env.REACT_APP_FMP_API_KEY;

    const initialize = async () => {
        setLoading(true);
        const balanceAData = await fetch(`https://financialmodelingprep.com/api/v3/balance-sheet-statement/${symb.toUpperCase()}?limit=10&apikey=${key}`)
        const balanceAJson = await balanceAData.json();
        setBalanceA(balanceAJson);
        setLoading(false);
    }

    useEffect(() => {
        initialize();
        // eslint-disable-next-line
    }, []);

    if(loading){
        return <div>
            <ReactLoading id="loading" type={'bars'} color="#007bff" />
        </div>
    }

    return <Fragment>
        {balanceA && <>
        <div className="d-flex mt-4">
            <div id="fnclsH">Balance Sheet Statement (Annual)</div>
            <div style={{
                marginLeft: "10px",
                marginTop: "8px", 
                fontSize: "11px",
                height: "15px"}}>All numbers in thousands</div>
        </div>
        <div id="container">
            <table id="stats">
                <thead>
                    <tr id="lcol">
                        <th id="lst">Date</th>
                        {balanceA.map((date, i) =>(
                        <th key={i} id="lst2">{date.date}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Cash And Cash Equivalents</td>
                        {balanceA.map((bA, i) =>(
                        <td key={i}>{bA.cashAndCashEquivalents === null ? "-" : (bA.cashAndCashEquivalents / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Short Term Investments</td>
                        {balanceA.map((bA, i) =>(
                        <td key={i}>{bA.shortTermInvestments === null ? "-" : (bA.shortTermInvestments / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr><OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>
                              Cash And Short Term Investments
                            </Tooltip>
                          }>
                        <td>Cash And Short Term Investments</td>
                        </OverlayTrigger>
                        {balanceA.map((bA, i) =>(
                        <td key={i}>{bA.cashAndShortTermInvestments === null ? "-" : (bA.cashAndShortTermInvestments / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Net Receivables</td>
                        {balanceA.map((bA, i) =>(
                        <td key={i}>{bA.netReceivables === null ? "-" : (bA.netReceivables / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Inventory</td>
                        {balanceA.map((bA, i) =>(
                        <td key={i}>{bA.inventory === null ? "-" : (bA.inventory / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Other Current Assets</td>
                        {balanceA.map((bA, i) =>(
                        <td key={i}>{bA.otherCurrentAssets === null ? "-" : (bA.otherCurrentAssets / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Total Current Assets</td>
                        {balanceA.map((bA, i) =>(
                        <td key={i}>{bA.totalCurrentAssets === null ? "-" : (bA.totalCurrentAssets / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr><OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>
                              Property Plant Equipment Net
                            </Tooltip>
                          }>
                        <td>Property Plant Equipment Net</td>
                        </OverlayTrigger>
                        {balanceA.map((bA, i) =>(
                        <td key={i}>{bA.propertyPlantEquipmentNet === null ? "-" : (bA.propertyPlantEquipmentNet / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Goodwill</td>
                        {balanceA.map((bA, i) =>(
                        <td key={i}>{bA.goodwill === null ? "-" : (bA.goodwill / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Intangible Assets</td>
                        {balanceA.map((bA, i) =>(
                        <td key={i}>{bA.intangibleAssets === null ? "-" : (bA.intangibleAssets / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr><OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>
                              Goodwill And Intangible Assets
                            </Tooltip>
                          }>
                        <td>Goodwill And Intangible Assets</td>
                        </OverlayTrigger>
                        {balanceA.map((bA, i) =>(
                        <td key={i}>{bA.goodwillAndIntangibleAssets === null ? "-" : (bA.goodwillAndIntangibleAssets / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Long Term Investments</td>
                        {balanceA.map((bA, i) =>(
                        <td key={i}>{bA.longTermInvestments === null ? "-" : (bA.longTermInvestments / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Tax Assets</td>
                        {balanceA.map((bA, i) =>(
                        <td key={i}>{bA.taxAssets === null ? "-" : (bA.taxAssets / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Other Non Current Assets</td>
                        {balanceA.map((bA, i) =>(
                        <td key={i}>{bA.otherNonCurrentAssets === null ? "-" : (bA.otherNonCurrentAssets / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Total Non Current Assets</td>
                        {balanceA.map((bA, i) =>(
                        <td key={i}>{bA.totalNonCurrentAssets === null ? "-" : (bA.totalNonCurrentAssets / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Other Assets</td>
                        {balanceA.map((bA, i) =>(
                        <td key={i}>{bA.otherAssets === null ? "-" : (bA.otherAssets / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Total Assets</td>
                        {balanceA.map((bA, i) =>(
                        <td key={i}>{bA.totalAssets === null ? "-" : (bA.totalAssets / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Account Payables</td>
                        {balanceA.map((bA, i) =>(
                        <td key={i}>{bA.accountPayables === null ? "-" : (bA.accountPayables / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Short Term Debt</td>
                        {balanceA.map((bA, i) =>(
                        <td key={i}>{bA.shortTermDebt === null ? "-" : (bA.shortTermDebt / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Tax Payables</td>
                        {balanceA.map((bA, i) =>(
                        <td key={i}>{bA.taxPayables === null ? "-" : (bA.taxPayables / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Deferred Revenue</td>
                        {balanceA.map((bA, i) =>(
                        <td key={i}>{bA.deferredRevenue === null ? "-" : (bA.deferredRevenue / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Other Current Liabilities</td>
                        {balanceA.map((bA, i) =>(
                        <td key={i}>{bA.otherCurrentLiabilities === null ? "-" : (bA.otherCurrentLiabilities / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Total Current Liabilities</td>
                        {balanceA.map((bA, i) =>(
                        <td key={i}>{bA.totalCurrentLiabilities === null ? "-" : (bA.totalCurrentLiabilities / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Long Term Debt</td>
                        {balanceA.map((bA, i) =>(
                        <td key={i}>{bA.longTermDebt === null ? "-" : (bA.longTermDebt / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr><OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>
                              Deferred Revenue Non Current
                            </Tooltip>
                          }>
                        <td>Deferred Revenue Non Current</td>
                        </OverlayTrigger>
                        {balanceA.map((bA, i) =>(
                        <td key={i}>{bA.deferredRevenueNonCurrent === null ? "-" : (bA.deferredRevenueNonCurrent / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr><OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>
                              Deferred Tax Liabilities Non Current
                            </Tooltip>
                          }>
                        <td>Deferred Tax Liabilities Non Current</td>
                        </OverlayTrigger>
                        {balanceA.map((bA, i) =>(
                        <td key={i}>{bA.deferredTaxLiabilitiesNonCurrent === null ? "-" : (bA.deferredTaxLiabilitiesNonCurrent / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr><OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>
                              Other Non Current Liabilities
                            </Tooltip>
                          }>
                        <td>Other Non Current Liabilities</td>
                        </OverlayTrigger>
                        {balanceA.map((bA, i) =>(
                        <td key={i}>{bA.otherNonCurrentLiabilities === null ? "-" : (bA.otherNonCurrentLiabilities / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr><OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>
                              Total Non Current Liabilities
                            </Tooltip>
                          }>
                        <td>Total Non Current Liabilities</td>
                        </OverlayTrigger>
                        {balanceA.map((bA, i) =>(
                        <td key={i}>{bA.totalNonCurrentLiabilities === null ? "-" : (bA.totalNonCurrentLiabilities / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Other Liabilities</td>
                        {balanceA.map((bA, i) =>(
                        <td key={i}>{bA.otherLiabilities === null ? "-" : (bA.otherLiabilities / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Capital Lease Obligations</td>
                        {balanceA.map((bA, i) =>(
                        <td key={i}>{bA.capitalLeaseObligations === null ? "-" : (bA.capitalLeaseObligations / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Total Liabilities</td>
                        {balanceA.map((bA, i) =>(
                        <td key={i}>{bA.totalLiabilities === null ? "-" : (bA.totalLiabilities / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Preferred Stock</td>
                        {balanceA.map((bA, i) =>(
                        <td key={i}>{bA.preferredStock === null ? "-" : (bA.preferredStock / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Common Stock</td>
                        {balanceA.map((bA, i) =>(
                        <td key={i}>{bA.commonStock === null ? "-" : (bA.commonStock / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Retained Earnings</td>
                        {balanceA.map((bA, i) =>(
                        <td key={i}>{bA.retainedEarnings === null ? "-" : (bA.retainedEarnings / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr><OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>
                              Accumulated Other Comprehensive Income Loss
                            </Tooltip>
                          }>
                        <td>Accumulated Other Comprehensive Income Loss</td>
                        </OverlayTrigger>
                        {balanceA.map((bA, i) =>(
                        <td key={i}>{bA.accumulatedOtherComprehensiveIncomeLoss === null ? "-" : (bA.accumulatedOtherComprehensiveIncomeLoss / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr><OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>
                              Othertotal Stockholders Equity
                            </Tooltip>
                          }>
                        <td>Othertotal Stockholders Equity</td>
                        </OverlayTrigger>
                        {balanceA.map((bA, i) =>(
                        <td key={i}>{bA.othertotalStockholdersEquity === null ? "-" : (bA.othertotalStockholdersEquity / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Total Stockholders Equity</td>
                        {balanceA.map((bA, i) =>(
                        <td key={i}>{bA.totalStockholdersEquity === null ? "-" : (bA.totalStockholdersEquity / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr><OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>
                              Total Liabilities And Stockholders Equity
                            </Tooltip>
                          }>
                        <td>Total Liabilities And Stockholders Equity</td>
                        </OverlayTrigger>
                        {balanceA.map((bA, i) =>(
                        <td key={i}>{bA.totalLiabilitiesAndStockholdersEquity === null ? "-" : (bA.totalLiabilitiesAndStockholdersEquity / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Minority Interest</td>
                        {balanceA.map((bA, i) =>(
                        <td key={i}>{bA.minorityInterest === null ? "-" : (bA.minorityInterest / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Total Equity</td>
                        {balanceA.map((bA, i) =>(
                        <td key={i}>{bA.totalEquity === null ? "-" : (bA.totalEquity / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr><OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>
                              Total Liabilities And Total Equity
                            </Tooltip>
                          }>
                        <td>Total Liabilities And Total Equity</td>
                        </OverlayTrigger>
                        {balanceA.map((bA, i) =>(
                        <td key={i}>{bA.totalLiabilitiesAndTotalEquity === null ? "-" : (bA.totalLiabilitiesAndTotalEquity / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Total Investments</td>
                        {balanceA.map((bA, i) =>(
                        <td key={i}>{bA.totalInvestments === null ? "-" : (bA.totalInvestments / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Total Debt</td>
                        {balanceA.map((bA, i) =>(
                        <td key={i}>{bA.totalDebt === null ? "-" : (bA.totalDebt / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Net Debt</td>
                        {balanceA.map((bA, i) =>(
                        <td key={i}>{bA.netDebt === null ? "-" : (bA.netDebt / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Link</td>
                        {balanceA.map((bA, i) =>(
                        <td key={i}>
                          {bA.finalLink === null ? "-" : 
                          <a
                            id="linkButton"
                            className="nav-link" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            href={bA.finalLink}>
                              Ext Link
                            </a>}
                        </td>))}
                    </tr>
                </tbody>
            </table>
        </div>
        </>}
    </Fragment>



}

export default BalanceA;