import React, { Fragment, useContext, useEffect, useState } from "react";
import { TickerContext } from './TickerContext';
import { useParams } from 'react-router-dom';
import ReactLoading from "react-loading";
import { Tooltip, OverlayTrigger } from "react-bootstrap"

const BalanceA = () => {
    const [data, setData] = useContext(TickerContext);
    const { symb } = useParams();
    const [loading, setLoading] = useState(false);
    const [balanceA, setBalanceA] = useState(null);

    const key = process.env.REACT_APP_FMP_API_KEY;

    const initialize = async () => {
        setLoading(true);
        const balanceAData = await fetch(`https://financialmodelingprep.com/api/v3/balance-sheet-statement/${symb.toUpperCase()}?limit=10&apikey=${key}`)
        const balanceAJson = await balanceAData.json();
        const quote = await fetch(`http://fmp-react-app.herokuapp.com/company/info/${symb.toUpperCase()}`)
        const jsonQuote = await quote.json();
        setData(jsonQuote)
        data.balanceA = balanceAJson;
        setBalanceA(balanceAJson);
        setLoading(false);
    }

    useEffect(() => {
        initialize();
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
                        {balanceA.map(date =>(
                        <th id="lst2">{date.date}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Cash And Cash Equivalents</td>
                        {balanceA.map(bA =>(
                        <td>{bA.cashAndCashEquivalents === null ? "-" : (bA.cashAndCashEquivalents / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Short Term Investments</td>
                        {balanceA.map(bA =>(
                        <td>{bA.shortTermInvestments === null ? "-" : (bA.shortTermInvestments / 1000).toLocaleString()}</td>))}
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
                        {balanceA.map(bA =>(
                        <td>{bA.cashAndShortTermInvestments === null ? "-" : (bA.cashAndShortTermInvestments / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Net Receivables</td>
                        {balanceA.map(bA =>(
                        <td>{bA.netReceivables === null ? "-" : (bA.netReceivables / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Inventory</td>
                        {balanceA.map(bA =>(
                        <td>{bA.inventory === null ? "-" : (bA.inventory / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Other Current Assets</td>
                        {balanceA.map(bA =>(
                        <td>{bA.otherCurrentAssets === null ? "-" : (bA.otherCurrentAssets / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Total Current Assets</td>
                        {balanceA.map(bA =>(
                        <td>{bA.totalCurrentAssets === null ? "-" : (bA.totalCurrentAssets / 1000).toLocaleString()}</td>))}
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
                        {balanceA.map(bA =>(
                        <td>{bA.propertyPlantEquipmentNet === null ? "-" : (bA.propertyPlantEquipmentNet / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Goodwill</td>
                        {balanceA.map(bA =>(
                        <td>{bA.goodwill === null ? "-" : (bA.goodwill / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Intangible Assets</td>
                        {balanceA.map(bA =>(
                        <td>{bA.intangibleAssets === null ? "-" : (bA.intangibleAssets / 1000).toLocaleString()}</td>))}
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
                        {balanceA.map(bA =>(
                        <td>{bA.goodwillAndIntangibleAssets === null ? "-" : (bA.goodwillAndIntangibleAssets / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Long Term Investments</td>
                        {balanceA.map(bA =>(
                        <td>{bA.longTermInvestments === null ? "-" : (bA.longTermInvestments / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Tax Assets</td>
                        {balanceA.map(bA =>(
                        <td>{bA.taxAssets === null ? "-" : (bA.taxAssets / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Other Non Current Assets</td>
                        {balanceA.map(bA =>(
                        <td>{bA.otherNonCurrentAssets === null ? "-" : (bA.otherNonCurrentAssets / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Total Non Current Assets</td>
                        {balanceA.map(bA =>(
                        <td>{bA.totalNonCurrentAssets === null ? "-" : (bA.totalNonCurrentAssets / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Other Assets</td>
                        {balanceA.map(bA =>(
                        <td>{bA.otherAssets === null ? "-" : (bA.otherAssets / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Total Assets</td>
                        {balanceA.map(bA =>(
                        <td>{bA.totalAssets === null ? "-" : (bA.totalAssets / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Account Payables</td>
                        {balanceA.map(bA =>(
                        <td>{bA.accountPayables === null ? "-" : (bA.accountPayables / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Short Term Debt</td>
                        {balanceA.map(bA =>(
                        <td>{bA.shortTermDebt === null ? "-" : (bA.shortTermDebt / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Tax Payables</td>
                        {balanceA.map(bA =>(
                        <td>{bA.taxPayables === null ? "-" : (bA.taxPayables / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Deferred Revenue</td>
                        {balanceA.map(bA =>(
                        <td>{bA.deferredRevenue === null ? "-" : (bA.deferredRevenue / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Other Current Liabilities</td>
                        {balanceA.map(bA =>(
                        <td>{bA.otherCurrentLiabilities === null ? "-" : (bA.otherCurrentLiabilities / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Total Current Liabilities</td>
                        {balanceA.map(bA =>(
                        <td>{bA.totalCurrentLiabilities === null ? "-" : (bA.totalCurrentLiabilities / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Long Term Debt</td>
                        {balanceA.map(bA =>(
                        <td>{bA.longTermDebt === null ? "-" : (bA.longTermDebt / 1000).toLocaleString()}</td>))}
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
                        {balanceA.map(bA =>(
                        <td>{bA.deferredRevenueNonCurrent === null ? "-" : (bA.deferredRevenueNonCurrent / 1000).toLocaleString()}</td>))}
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
                        {balanceA.map(bA =>(
                        <td>{bA.deferredTaxLiabilitiesNonCurrent === null ? "-" : (bA.deferredTaxLiabilitiesNonCurrent / 1000).toLocaleString()}</td>))}
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
                        {balanceA.map(bA =>(
                        <td>{bA.otherNonCurrentLiabilities === null ? "-" : (bA.otherNonCurrentLiabilities / 1000).toLocaleString()}</td>))}
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
                        {balanceA.map(bA =>(
                        <td>{bA.totalNonCurrentLiabilities === null ? "-" : (bA.totalNonCurrentLiabilities / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Other Liabilities</td>
                        {balanceA.map(bA =>(
                        <td>{bA.otherLiabilities === null ? "-" : (bA.otherLiabilities / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Capital Lease Obligations</td>
                        {balanceA.map(bA =>(
                        <td>{bA.capitalLeaseObligations === null ? "-" : (bA.capitalLeaseObligations / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Total Liabilities</td>
                        {balanceA.map(bA =>(
                        <td>{bA.totalLiabilities === null ? "-" : (bA.totalLiabilities / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Preferred Stock</td>
                        {balanceA.map(bA =>(
                        <td>{bA.preferredStock === null ? "-" : (bA.preferredStock / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Common Stock</td>
                        {balanceA.map(bA =>(
                        <td>{bA.commonStock === null ? "-" : (bA.commonStock / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Retained Earnings</td>
                        {balanceA.map(bA =>(
                        <td>{bA.retainedEarnings === null ? "-" : (bA.retainedEarnings / 1000).toLocaleString()}</td>))}
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
                        {balanceA.map(bA =>(
                        <td>{bA.accumulatedOtherComprehensiveIncomeLoss === null ? "-" : (bA.accumulatedOtherComprehensiveIncomeLoss / 1000).toLocaleString()}</td>))}
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
                        {balanceA.map(bA =>(
                        <td>{bA.othertotalStockholdersEquity === null ? "-" : (bA.othertotalStockholdersEquity / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Total Stockholders Equity</td>
                        {balanceA.map(bA =>(
                        <td>{bA.totalStockholdersEquity === null ? "-" : (bA.totalStockholdersEquity / 1000).toLocaleString()}</td>))}
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
                        {balanceA.map(bA =>(
                        <td>{bA.totalLiabilitiesAndStockholdersEquity === null ? "-" : (bA.totalLiabilitiesAndStockholdersEquity / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Minority Interest</td>
                        {balanceA.map(bA =>(
                        <td>{bA.minorityInterest === null ? "-" : (bA.minorityInterest / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Total Equity</td>
                        {balanceA.map(bA =>(
                        <td>{bA.totalEquity === null ? "-" : (bA.totalEquity / 1000).toLocaleString()}</td>))}
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
                        {balanceA.map(bA =>(
                        <td>{bA.totalLiabilitiesAndTotalEquity === null ? "-" : (bA.totalLiabilitiesAndTotalEquity / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Total Investments</td>
                        {balanceA.map(bA =>(
                        <td>{bA.totalInvestments === null ? "-" : (bA.totalInvestments / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Total Debt</td>
                        {balanceA.map(bA =>(
                        <td>{bA.totalDebt === null ? "-" : (bA.totalDebt / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Net Debt</td>
                        {balanceA.map(bA =>(
                        <td>{bA.netDebt === null ? "-" : (bA.netDebt / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Link</td>{balanceA.map(bA =>(<td>{bA.finalLink === null ? "-" : <
                            a id="linkButton"
                         class="nav-link" target="_blank" href={bA.finalLink}>Ext Link</a>}</td>))}
                    </tr>
                </tbody>
            </table>
        </div>
        </>}
    </Fragment>



}

export default BalanceA;