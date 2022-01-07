import React, { Fragment, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import ReactLoading from "react-loading";
import { Tooltip, OverlayTrigger } from "react-bootstrap"

const CashflowA = () => {
  
    const { symb } = useParams();
    const [loading, setLoading] = useState(false);
    const [cashflowA, setCashflowA] = useState(null);

    const key = process.env.REACT_APP_FMP_API_KEY;

    const initialize = async () => {
        setLoading(true);
        const cashflowAData = await fetch(`https://financialmodelingprep.com/api/v3/cash-flow-statement/${symb.toUpperCase()}?limit=10&apikey=${key}`)
        const cashflowAJson = await cashflowAData.json();
        setCashflowA(cashflowAJson);
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
        {cashflowA && <>
        <div className="d-flex mt-4">
            <div id="fnclsH">Cashflow (Annual)</div>
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
                        {cashflowA.map((date, i) =>(
                        <th key={i} id="lst2">{date.date}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Net Income</td>
                        {cashflowA.map((cA, i) =>(
                        <td key={i}>{cA.netIncome === null ? "-" : (cA.netIncome / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr><OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>
                              Depreciation And Amortization
                            </Tooltip>
                          }>
                        <td>Depreciation And Amortization</td>
                        </OverlayTrigger>
                        {cashflowA.map((cA, i) =>(
                        <td key={i}>{cA.depreciationAndAmortization === null ? "-" : (cA.depreciationAndAmortization / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Deferred Income Tax</td>
                        {cashflowA.map((cA, i) =>(
                        <td key={i}>{cA.deferredIncomeTax === null ? "-" : (cA.deferredIncomeTax / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr><OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>
                              Stock Based Compensation
                            </Tooltip>
                          }>
                        <td>Stock Based Compensation</td>
                        </OverlayTrigger>
                        {cashflowA.map((cA, i) =>(
                        <td key={i}>{cA.stockBasedCompensation === null ? "-" : (cA.stockBasedCompensation / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Change In Working Capital</td>
                        {cashflowA.map((cA, i) =>(
                        <td key={i}>{cA.changeInWorkingCapital === null ? "-" : (cA.changeInWorkingCapital / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Accounts Receivables</td>
                        {cashflowA.map((cA, i) =>(
                        <td key={i}>{cA.accountsReceivables === null ? "-" : (cA.accountsReceivables / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Inventory</td>
                        {cashflowA.map((cA, i) =>(
                        <td key={i}>{cA.inventory === null ? "-" : (cA.inventory / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Accounts Payables</td>
                        {cashflowA.map((cA, i) =>(
                        <td key={i}>{cA.accountsPayables === null ? "-" : (cA.accountsPayables / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Other Working Capital</td>
                        {cashflowA.map((cA, i) =>(
                        <td key={i}>{cA.otherWorkingCapital === null ? "-" : (cA.otherWorkingCapital / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Other Non Cash Items</td>
                        {cashflowA.map((cA, i) =>(
                        <td key={i}>{cA.otherNonCashItems === null ? "-" : (cA.otherNonCashItems / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr><OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>
                              Net Cash Provided By Operating Activities
                            </Tooltip>
                          }>
                        <td>Net Cash Provided By Operating Activities</td>
                        </OverlayTrigger>
                        {cashflowA.map((cA, i) =>(
                        <td key={i}>{cA.netCashProvidedByOperatingActivities === null ? "-" : (cA.netCashProvidedByOperatingActivities / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr><OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>
                              Investments In Property Plant And Equipment
                            </Tooltip>
                          }>
                        <td>Investments In Property Plant And Equipment</td>
                        </OverlayTrigger>
                        {cashflowA.map((cA, i) =>(
                        <td key={i}>{cA.investmentsInPropertyPlantAndEquipment === null ? "-" : (cA.investmentsInPropertyPlantAndEquipment / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Acquisitions Net</td>
                        {cashflowA.map((cA, i) =>(
                        <td key={i}>{cA.acquisitionsNet === null ? "-" : (cA.acquisitionsNet / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Purchases Of Investments</td>
                        {cashflowA.map((cA, i) =>(
                        <td key={i}>{cA.purchasesOfInvestments === null ? "-" : (cA.purchasesOfInvestments / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr><OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>
                              Sales Maturities Of Investments
                            </Tooltip>
                          }>
                        <td>Sales Maturities Of Investments</td>
                        </OverlayTrigger>
                        {cashflowA.map((cA, i) =>(
                        <td key={i}>{cA.salesMaturitiesOfInvestments === null ? "-" : (cA.salesMaturitiesOfInvestments / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Other Investing Activites</td>
                        {cashflowA.map((cA, i) =>(
                        <td key={i}>{cA.otherInvestingActivites === null ? "-" : (cA.otherInvestingActivites / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr><OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>
                              Net Cash Used For Investing Activites
                            </Tooltip>
                          }>
                        <td>Net Cash Used For Investing Activites</td>
                        </OverlayTrigger>
                        {cashflowA.map((cA, i) =>(
                        <td key={i}>{cA.netCashUsedForInvestingActivites === null ? "-" : (cA.netCashUsedForInvestingActivites / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Debt Repayment</td>
                        {cashflowA.map((cA, i) =>(
                        <td key={i}>{cA.debtRepayment === null ? "-" : (cA.debtRepayment / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Common Stock Issued</td>
                        {cashflowA.map((cA, i) =>(
                        <td key={i}>{cA.commonStockIssued === null ? "-" : (cA.commonStockIssued / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr><OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>
                              Common Stock Repurchased
                            </Tooltip>
                          }>
                        <td>Common Stock Repurchased</td>
                        </OverlayTrigger>
                        {cashflowA.map((cA, i) =>(
                        <td key={i}>{cA.commonStockRepurchased === null ? "-" : (cA.commonStockRepurchased / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Dividends Paid</td>
                        {cashflowA.map((cA, i) =>(
                        <td key={i}>{cA.dividendsPaid === null ? "-" : (cA.dividendsPaid / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Other Financing Activites</td>
                        {cashflowA.map((cA, i) =>(
                        <td key={i}>{cA.otherFinancingActivites === null ? "-" : (cA.otherFinancingActivites / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr><OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>
                              Net Cash Used Provided By Financing Activities
                            </Tooltip>
                          }>
                        <td>Net Cash Used Provided By Financing Activities</td>
                        </OverlayTrigger>
                        {cashflowA.map((cA, i) =>(
                        <td key={i}>{cA.netCashUsedProvidedByFinancingActivities === null ? "-" : (cA.netCashUsedProvidedByFinancingActivities / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr><OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>
                              Effect Of Forex Changes On Cash
                            </Tooltip>
                          }>
                        <td>Effect Of Forex Changes On Cash</td>
                        </OverlayTrigger>
                        {cashflowA.map((cA, i) =>(
                        <td key={i}>{cA.effectOfForexChangesOnCash === null ? "-" : (cA.effectOfForexChangesOnCash / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Net Change In Cash</td>
                        {cashflowA.map((cA, i) =>(
                        <td key={i}>{cA.netChangeInCash === null ? "-" : (cA.netChangeInCash / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Cash At End Of Period</td>
                        {cashflowA.map((cA, i) =>(
                        <td key={i}>{cA.cashAtEndOfPeriod === null ? "-" : (cA.cashAtEndOfPeriod / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr><OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>
                              Cash At Beginning Of Period
                            </Tooltip>
                          }>
                        <td>Cash At Beginning Of Period</td>
                        </OverlayTrigger>
                        {cashflowA.map((cA, i) =>(
                        <td key={i}>{cA.cashAtBeginningOfPeriod === null ? "-" : (cA.cashAtBeginningOfPeriod / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Operating Cash Flow</td>
                        {cashflowA.map((cA, i) =>(
                        <td key={i}>{cA.operatingCashFlow === null ? "-" : (cA.operatingCashFlow / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Capital Expenditure</td>
                        {cashflowA.map((cA, i) =>(
                        <td key={i}>{cA.capitalExpenditure === null ? "-" : (cA.capitalExpenditure / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Free Cash Flow</td>
                        {cashflowA.map((cA, i) =>(
                        <td key={i}>{cA.freeCashFlow === null ? "-" : (cA.freeCashFlow / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Link</td>
                        {cashflowA.map((cA, i) =>(
                        <td key={i}>{cA.finalLink === null ? "-" : <a id="linkButton" className="nav-link" target="_blank" rel="noopener noreferrer" href={cA.finalLink}>Ext Link</a>}</td>))}
                    </tr>
                </tbody>
            </table>
        </div>
        </>}
    </Fragment>



}

export default CashflowA;