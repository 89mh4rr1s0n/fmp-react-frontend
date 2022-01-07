import React, { Fragment, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import ReactLoading from "react-loading";
import { Tooltip, OverlayTrigger } from "react-bootstrap"

const BalanceQ = () => {
 
    const { symb } = useParams();
    const [loading, setLoading] = useState(false);
    const [balanceQ, setBalanceQ] = useState(null);
    
    const key = process.env.REACT_APP_FMP_API_KEY;

    const initialize = async () => {
        setLoading(true);
        const balanceQData = await fetch(`https://financialmodelingprep.com/api/v3/balance-sheet-statement/${symb.toUpperCase()}?period=quarter&limit=20&apikey=${key}`)
        const balanceQJson = await balanceQData.json();
        setBalanceQ(balanceQJson);
        setLoading(false);
    }

    useEffect(() => {
        initialize();
        // eslint-disable-next-line
    }, []);

    if(loading){
        return <div>
            <ReactLoading id="loading" type={'bQrs'} color="#007bff" />
        </div>
    }

    return <Fragment>
        {balanceQ && <>
        <div className="d-flex mt-4">
            <div id="fnclsH">Balance Sheet Statement (Quarterly)</div>
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
                        {balanceQ.map((date, i) =>(
                        <th key={i} id="lst2">{date.date}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Cash And Cash Equivalents</td>
                        {balanceQ.map((bQ, i) =>(
                        <td key={i}>{bQ.cashAndCashEquivalents === null ? "-" : (bQ.cashAndCashEquivalents / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Short Term Investments</td>
                        {balanceQ.map((bQ, i) =>(
                        <td key={i}>{bQ.shortTermInvestments === null ? "-" : (bQ.shortTermInvestments / 1000).toLocaleString()}</td>))}
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
                        {balanceQ.map((bQ, i) =>(
                        <td key={i}>{bQ.cashAndShortTermInvestments === null ? "-" : (bQ.cashAndShortTermInvestments / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Net Receivables</td>
                        {balanceQ.map((bQ, i) =>(
                        <td key={i}>{bQ.netReceivables === null ? "-" : (bQ.netReceivables / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Inventory</td>
                        {balanceQ.map((bQ, i) =>(
                        <td key={i}>{bQ.inventory === null ? "-" : (bQ.inventory / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Other Current Assets</td>
                        {balanceQ.map((bQ, i) =>(
                        <td key={i}>{bQ.otherCurrentAssets === null ? "-" : (bQ.otherCurrentAssets / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Total Current Assets</td>
                        {balanceQ.map((bQ, i) =>(
                        <td key={i}>{bQ.totalCurrentAssets === null ? "-" : (bQ.totalCurrentAssets / 1000).toLocaleString()}</td>))}
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
                        {balanceQ.map((bQ, i) =>(
                        <td key={i}>{bQ.propertyPlantEquipmentNet === null ? "-" : (bQ.propertyPlantEquipmentNet / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Goodwill</td>
                        {balanceQ.map((bQ, i) =>(
                        <td key={i}>{bQ.goodwill === null ? "-" : (bQ.goodwill / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Intangible Assets</td>
                        {balanceQ.map((bQ, i) =>(
                        <td key={i}>{bQ.intangibleAssets === null ? "-" : (bQ.intangibleAssets / 1000).toLocaleString()}</td>))}
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
                        {balanceQ.map((bQ, i) =>(
                        <td key={i}>{bQ.goodwillAndIntangibleAssets === null ? "-" : (bQ.goodwillAndIntangibleAssets / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Long Term Investments</td>
                        {balanceQ.map((bQ, i) =>(
                        <td key={i}>{bQ.longTermInvestments === null ? "-" : (bQ.longTermInvestments / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Tax Assets</td>
                        {balanceQ.map((bQ, i) =>(
                        <td key={i}>{bQ.taxAssets === null ? "-" : (bQ.taxAssets / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Other Non Current Assets</td>
                        {balanceQ.map((bQ, i) =>(
                        <td key={i}>{bQ.otherNonCurrentAssets === null ? "-" : (bQ.otherNonCurrentAssets / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Total Non Current Assets</td>
                        {balanceQ.map((bQ, i) =>(
                        <td key={i}>{bQ.totalNonCurrentAssets === null ? "-" : (bQ.totalNonCurrentAssets / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Other Assets</td>
                        {balanceQ.map((bQ, i) =>(
                        <td key={i}>{bQ.otherAssets === null ? "-" : (bQ.otherAssets / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Total Assets</td>
                        {balanceQ.map((bQ, i) =>(
                        <td key={i}>{bQ.totalAssets === null ? "-" : (bQ.totalAssets / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Account Payables</td>
                        {balanceQ.map((bQ, i) =>(
                        <td key={i}>{bQ.accountPayables === null ? "-" : (bQ.accountPayables / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Short Term Debt</td>
                        {balanceQ.map((bQ, i) =>(
                        <td key={i}>{bQ.shortTermDebt === null ? "-" : (bQ.shortTermDebt / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Tax Payables</td>
                        {balanceQ.map((bQ, i) =>(
                        <td key={i}>{bQ.taxPayables === null ? "-" : (bQ.taxPayables / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Deferred Revenue</td>
                        {balanceQ.map((bQ, i) =>(
                        <td key={i}>{bQ.deferredRevenue === null ? "-" : (bQ.deferredRevenue / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Other Current Liabilities</td>
                        {balanceQ.map((bQ, i) =>(
                        <td key={i}>{bQ.otherCurrentLiabilities === null ? "-" : (bQ.otherCurrentLiabilities / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Total Current Liabilities</td>
                        {balanceQ.map((bQ, i) =>(
                        <td key={i}>{bQ.totalCurrentLiabilities === null ? "-" : (bQ.totalCurrentLiabilities / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Long Term Debt</td>
                        {balanceQ.map((bQ, i) =>(
                        <td key={i}>{bQ.longTermDebt === null ? "-" : (bQ.longTermDebt / 1000).toLocaleString()}</td>))}
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
                        {balanceQ.map((bQ, i) =>(
                        <td key={i}>{bQ.deferredRevenueNonCurrent === null ? "-" : (bQ.deferredRevenueNonCurrent / 1000).toLocaleString()}</td>))}
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
                        {balanceQ.map((bQ, i) =>(
                        <td key={i}>{bQ.deferredTaxLiabilitiesNonCurrent === null ? "-" : (bQ.deferredTaxLiabilitiesNonCurrent / 1000).toLocaleString()}</td>))}
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
                        {balanceQ.map((bQ, i) =>(
                        <td key={i}>{bQ.otherNonCurrentLiabilities === null ? "-" : (bQ.otherNonCurrentLiabilities / 1000).toLocaleString()}</td>))}
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
                        {balanceQ.map((bQ, i) =>(
                        <td key={i}>{bQ.totalNonCurrentLiabilities === null ? "-" : (bQ.totalNonCurrentLiabilities / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Other Liabilities</td>
                        {balanceQ.map((bQ, i) =>(
                        <td key={i}>{bQ.otherLiabilities === null ? "-" : (bQ.otherLiabilities / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Capital Lease Obligations</td>
                        {balanceQ.map((bQ, i) =>(
                        <td key={i}>{bQ.capitalLeaseObligations === null ? "-" : (bQ.capitalLeaseObligations / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Total Liabilities</td>
                        {balanceQ.map((bQ, i) =>(
                        <td key={i}>{bQ.totalLiabilities === null ? "-" : (bQ.totalLiabilities / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Preferred Stock</td>
                        {balanceQ.map((bQ, i) =>(
                        <td key={i}>{bQ.preferredStock === null ? "-" : (bQ.preferredStock / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Common Stock</td>
                        {balanceQ.map((bQ, i) =>(
                        <td key={i}>{bQ.commonStock === null ? "-" : (bQ.commonStock / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Retained Earnings</td>
                        {balanceQ.map((bQ, i) =>(
                        <td key={i}>{bQ.retainedEarnings === null ? "-" : (bQ.retainedEarnings / 1000).toLocaleString()}</td>))}
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
                        {balanceQ.map((bQ, i) =>(
                        <td key={i}>{bQ.accumulatedOtherComprehensiveIncomeLoss === null ? "-" : (bQ.accumulatedOtherComprehensiveIncomeLoss / 1000).toLocaleString()}</td>))}
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
                        {balanceQ.map((bQ, i) =>(
                        <td key={i}>{bQ.othertotalStockholdersEquity === null ? "-" : (bQ.othertotalStockholdersEquity / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Total Stockholders Equity</td>
                        {balanceQ.map((bQ, i) =>(
                        <td key={i}>{bQ.totalStockholdersEquity === null ? "-" : (bQ.totalStockholdersEquity / 1000).toLocaleString()}</td>))}
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
                        {balanceQ.map((bQ, i) =>(
                        <td key={i}>{bQ.totalLiabilitiesAndStockholdersEquity === null ? "-" : (bQ.totalLiabilitiesAndStockholdersEquity / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Minority Interest</td>
                        {balanceQ.map((bQ, i) =>(
                        <td key={i}>{bQ.minorityInterest === null ? "-" : (bQ.minorityInterest / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Total Equity</td>
                        {balanceQ.map((bQ, i) =>(
                        <td key={i}>{bQ.totalEquity === null ? "-" : (bQ.totalEquity / 1000).toLocaleString()}</td>))}
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
                        {balanceQ.map((bQ, i) =>(
                        <td key={i}>{bQ.totalLiabilitiesAndTotalEquity === null ? "-" : (bQ.totalLiabilitiesAndTotalEquity / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Total Investments</td>
                        {balanceQ.map((bQ, i) =>(
                        <td key={i}>{bQ.totalInvestments === null ? "-" : (bQ.totalInvestments / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Total Debt</td>
                        {balanceQ.map((bQ, i) =>(
                        <td key={i}>{bQ.totalDebt === null ? "-" : (bQ.totalDebt / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Net Debt</td>
                        {balanceQ.map((bQ, i) =>(
                        <td key={i}>{bQ.netDebt === null ? "-" : (bQ.netDebt / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Link</td>
                        {balanceQ.map((bQ, i) =>(
                        <td key={i}>
                          {bQ.finalLink === null ? "-" : 
                          <a 
                            id="linkButton"
                            className="nav-link" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            href={bQ.finalLink}>
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

export default BalanceQ;