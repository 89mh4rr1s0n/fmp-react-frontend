import React, { Fragment, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import ReactLoading from "react-loading";
import { Tooltip, OverlayTrigger } from "react-bootstrap"

const CashflowQ = () => {
  
    const { symb } = useParams();
    const [loading, setLoading] = useState(false);
    const [cashflowQ, setCashflowQ] = useState(null);

    const key = process.env.REACT_APP_FMP_API_KEY;

    const initialize = async () => {
        setLoading(true);
        const cashflowQData = await fetch(`https://financialmodelingprep.com/api/v3/cash-flow-statement/${symb.toUpperCase()}?period=quarter&limit=20&apikey=${key}`)
        const cashflowQJson = await cashflowQData.json();
        setCashflowQ(cashflowQJson);
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
        {cashflowQ && <>
        <div className="d-flex mt-4">
            <div id="fnclsH">Cashflow (Quarterly)</div>
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
                        {cashflowQ.map((date, i) =>(
                        <th key={i} id="lst2">{date.date}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Net Income</td>
                        {cashflowQ.map((cQ, i) =>(
                        <td key={i}>{cQ.netIncome === null ? "-" : (cQ.netIncome / 1000).toLocaleString()}</td>))}
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
                        {cashflowQ.map((cQ, i) =>(
                        <td key={i}>{cQ.depreciationAndAmortization === null ? "-" : (cQ.depreciationAndAmortization / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Deferred Income Tax</td>
                        {cashflowQ.map((cQ, i) =>(
                        <td key={i}>{cQ.deferredIncomeTax === null ? "-" : (cQ.deferredIncomeTax / 1000).toLocaleString()}</td>))}
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
                        {cashflowQ.map((cQ, i) =>(
                        <td key={i}>{cQ.stockBasedCompensation === null ? "-" : (cQ.stockBasedCompensation / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Change In Working Capital</td>
                        {cashflowQ.map((cQ, i) =>(
                        <td key={i}>{cQ.changeInWorkingCapital === null ? "-" : (cQ.changeInWorkingCapital / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Accounts Receivables</td>
                        {cashflowQ.map((cQ, i) =>(
                        <td key={i}>{cQ.accountsReceivables === null ? "-" : (cQ.accountsReceivables / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Inventory</td>
                        {cashflowQ.map((cQ, i) =>(
                        <td key={i}>{cQ.inventory === null ? "-" : (cQ.inventory / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Accounts Payables</td>
                        {cashflowQ.map((cQ, i) =>(
                        <td key={i}>{cQ.accountsPayables === null ? "-" : (cQ.accountsPayables / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Other Working Capital</td>
                        {cashflowQ.map((cQ, i) =>(
                        <td key={i}>{cQ.otherWorkingCapital === null ? "-" : (cQ.otherWorkingCapital / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Other Non Cash Items</td>
                        {cashflowQ.map((cQ, i) =>(
                        <td key={i}>{cQ.otherNonCashItems === null ? "-" : (cQ.otherNonCashItems / 1000).toLocaleString()}</td>))}
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
                        {cashflowQ.map((cQ, i) =>(
                        <td key={i}>{cQ.netCashProvidedByOperatingActivities === null ? "-" : (cQ.netCashProvidedByOperatingActivities / 1000).toLocaleString()}</td>))}
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
                        {cashflowQ.map((cQ, i) =>(
                        <td key={i}>{cQ.investmentsInPropertyPlantAndEquipment === null ? "-" : (cQ.investmentsInPropertyPlantAndEquipment / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Acquisitions Net</td>
                        {cashflowQ.map((cQ, i) =>(
                        <td key={i}>{cQ.acquisitionsNet === null ? "-" : (cQ.acquisitionsNet / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Purchases Of Investments</td>
                        {cashflowQ.map((cQ, i) =>(
                        <td key={i}>{cQ.purchasesOfInvestments === null ? "-" : (cQ.purchasesOfInvestments / 1000).toLocaleString()}</td>))}
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
                        {cashflowQ.map((cQ, i) =>(
                        <td key={i}>{cQ.salesMaturitiesOfInvestments === null ? "-" : (cQ.salesMaturitiesOfInvestments / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Other Investing Activites</td>
                        {cashflowQ.map((cQ, i) =>(
                        <td key={i}>{cQ.otherInvestingActivites === null ? "-" : (cQ.otherInvestingActivites / 1000).toLocaleString()}</td>))}
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
                        {cashflowQ.map((cQ, i) =>(
                        <td key={i}>{cQ.netCashUsedForInvestingActivites === null ? "-" : (cQ.netCashUsedForInvestingActivites / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Debt Repayment</td>
                        {cashflowQ.map((cQ, i) =>(
                        <td key={i}>{cQ.debtRepayment === null ? "-" : (cQ.debtRepayment / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Common Stock Issued</td>
                        {cashflowQ.map((cQ, i) =>(
                        <td key={i}>{cQ.commonStockIssued === null ? "-" : (cQ.commonStockIssued / 1000).toLocaleString()}</td>))}
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
                        {cashflowQ.map((cQ, i) =>(
                        <td key={i}>{cQ.commonStockRepurchased === null ? "-" : (cQ.commonStockRepurchased / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Dividends Paid</td>
                        {cashflowQ.map((cQ, i) =>(
                        <td key={i}>{cQ.dividendsPaid === null ? "-" : (cQ.dividendsPaid / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Other Financing Activites</td>
                        {cashflowQ.map((cQ, i) =>(
                        <td key={i}>{cQ.otherFinancingActivites === null ? "-" : (cQ.otherFinancingActivites / 1000).toLocaleString()}</td>))}
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
                        {cashflowQ.map((cQ, i) =>(
                        <td key={i}>{cQ.netCashUsedProvidedByFinancingActivities === null ? "-" : (cQ.netCashUsedProvidedByFinancingActivities / 1000).toLocaleString()}</td>))}
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
                        {cashflowQ.map((cQ, i) =>(
                        <td key={i}>{cQ.effectOfForexChangesOnCash === null ? "-" : (cQ.effectOfForexChangesOnCash / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Net Change In Cash</td>
                        {cashflowQ.map((cQ, i) =>(
                        <td key={i}>{cQ.netChangeInCash === null ? "-" : (cQ.netChangeInCash / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Cash At End Of Period</td>
                        {cashflowQ.map((cQ, i) =>(
                        <td key={i}>{cQ.cashAtEndOfPeriod === null ? "-" : (cQ.cashAtEndOfPeriod / 1000).toLocaleString()}</td>))}
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
                        {cashflowQ.map((cQ, i) =>(
                        <td key={i}>{cQ.cashAtBeginningOfPeriod === null ? "-" : (cQ.cashAtBeginningOfPeriod / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Operating Cash Flow</td>
                        {cashflowQ.map((cQ, i) =>(
                        <td key={i}>{cQ.operatingCashFlow === null ? "-" : (cQ.operatingCashFlow / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Capital Expenditure</td>
                        {cashflowQ.map((cQ, i) =>(
                        <td key={i}>{cQ.capitalExpenditure === null ? "-" : (cQ.capitalExpenditure / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Free Cash Flow</td>
                        {cashflowQ.map((cQ, i) =>(
                        <td key={i}>{cQ.freeCashFlow === null ? "-" : (cQ.freeCashFlow / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Link</td>
                        {cashflowQ.map((cQ, i) =>(
                        <td key={i}>{cQ.finalLink === null ? "-" : <a id="linkButton" className="nav-link" target="_blank" rel="noopener noreferrer" href={cQ.finalLink}>Ext Link</a>}</td>))}
                    </tr>
                </tbody>
            </table>
        </div>
        </>}
    </Fragment>
}

export default CashflowQ;