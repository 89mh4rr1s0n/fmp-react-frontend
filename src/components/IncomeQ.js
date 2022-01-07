import React, { Fragment, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import ReactLoading from "react-loading";
import { Tooltip, OverlayTrigger } from "react-bootstrap"

const IncomeQ = () => {

    const { symb } = useParams();
    const [loading, setLoading] = useState(false);
    const [incomeQ, setIncomeQ] = useState(null);

    const key = process.env.REACT_APP_FMP_API_KEY;

    const getData = async () => {
        setLoading(true);
        const incomeQData = await fetch(`https://financialmodelingprep.com/api/v3/income-statement/${symb.toUpperCase()}?period=quarter&limit=20&apikey=${key}`)
        const incomeQJson = await incomeQData.json();
        setIncomeQ(incomeQJson);
        setLoading(false);
    }


    useEffect(() => {
        getData()
        // eslint-disable-next-line
    }, [])

    if(loading){
        return <div>
            <ReactLoading id="loading" type={'bars'} color="#007bff" />
        </div>
    }

    return <Fragment>
        {incomeQ && <>
        <div className="d-flex mt-4">
            <div id="fnclsH">Income Statement (Quarterly)</div>
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
                        {incomeQ.map((date, i) =>(
                        <th key={i} id="lst2">{date.date}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Revenue</td>
                        {incomeQ.map((iQ, i) =>(
                        <td key={i}>{iQ.revenue === null ? "-" : (iQ.revenue / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Cost Of Revenue</td>
                        {incomeQ.map((iQ, i) =>(
                        <td key={i}>{iQ.costOfRevenue === null ? "-" : (iQ.costOfRevenue / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Gross Profit</td>
                        {incomeQ.map((iQ, i) =>(
                        <td key={i}>{iQ.grossProfit === null ? "-" : (iQ.grossProfit / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Gross Profit Ratio</td>
                        {incomeQ.map((iQ, i) =>(
                        <td key={i}>{iQ.grossProfitRatio === null ? "-" : (iQ.grossProfitRatio * 100).toFixed(2)}</td>))}
                    </tr>
                    <tr><OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>
                              Research And Development Expenses
                            </Tooltip>
                          }>
                        <td>Research And Development Expenses</td>
                        </OverlayTrigger>
                        {incomeQ.map((iQ, i) =>(
                        <td key={i}>{iQ.researchAndDevelopmentExpenses === null ? "-" : (iQ.researchAndDevelopmentExpenses / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr><OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>
                              General And Administrative Expenses
                            </Tooltip>
                          }>
                        <td>General And Administrative Expenses</td>
                        </OverlayTrigger>
                        {incomeQ.map((iQ, i) =>(
                        <td key={i}>{iQ.generalAndAdministrativeExpenses === null ? "-" : (iQ.generalAndAdministrativeExpenses / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr><OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>
                              Selling And Marketing Expenses
                            </Tooltip>
                          }>
                        <td>Selling And Marketing Expenses</td>
                        </OverlayTrigger>
                        {incomeQ.map((iQ, i) =>(
                        <td key={i}>{iQ.sellingAndMarketingExpenses === null ? "-" : (iQ.sellingAndMarketingExpenses / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr><OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>
                              Selling General And Administrative Expenses
                            </Tooltip>
                          }>
                        <td>Selling General And Administrative Expenses</td>
                        </OverlayTrigger>
                        {incomeQ.map((iQ, i) =>(
                        <td key={i}>{iQ.sellingGeneralAndAdministrativeExpenses === null ? "-" : (iQ.sellingGeneralAndAdministrativeExpenses / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Other Expenses</td>
                        {incomeQ.map((iQ, i) =>(
                        <td key={i}>{iQ.otherExpenses === null ? "-" : (iQ.otherExpenses / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Operating Expenses</td>
                        {incomeQ.map((iQ, i) =>(
                        <td key={i}>{iQ.operatingExpenses === null ? "-" : (iQ.operatingExpenses / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Cost And Expenses</td>
                        {incomeQ.map((iQ, i) =>(
                        <td key={i}>{iQ.costAndExpenses === null ? "-" : (iQ.costAndExpenses / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Interest Income</td>
                        {incomeQ.map((iQ, i) =>(
                        <td key={i}>{iQ.interestIncome === null ? "-" : (iQ.interestIncome / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Interest Expense</td>
                        {incomeQ.map((iQ, i) =>(
                        <td key={i}>{iQ.interestExpense === null ? "-" : (iQ.interestExpense / 1000).toLocaleString()}</td>))}
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
                        {incomeQ.map((iQ, i) =>(
                        <td key={i}>{iQ.depreciationAndAmortization === null ? "-" : (iQ.depreciationAndAmortization / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Ebitda</td>
                        {incomeQ.map((iQ, i) =>(
                        <td key={i}>{iQ.ebitda === null ? "-" : (iQ.ebitda / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Ebitda Ratio</td>
                        {incomeQ.map((iQ, i) =>(
                        <td key={i}>{iQ.ebitdaratio === null ? "-" : (iQ.ebitdaratio * 100).toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Operating Income</td>
                        {incomeQ.map((iQ, i) =>(
                        <td key={i}>{iQ.operatingIncome === null ? "-" : (iQ.operatingIncome / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Operating Income Ratio</td>
                        {incomeQ.map((iQ, i) =>(
                        <td key={i}>{iQ.operatingIncomeRatio === null ? "-" : (iQ.operatingIncomeRatio * 100).toFixed(2)}</td>))}
                    </tr>
                    <tr><OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>
                              Total Other Income Expenses Net
                            </Tooltip>
                          }>
                        <td>Total Other Income Expenses Net</td>
                        </OverlayTrigger>
                        {incomeQ.map((iQ, i) =>(
                        <td key={i}>{iQ.totalOtherIncomeExpensesNet === null ? "-" : (iQ.totalOtherIncomeExpensesNet / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Income Before Tax</td>
                        {incomeQ.map((iQ, i) =>(
                        <td key={i}>{iQ.incomeBeforeTax === null ? "-" : (iQ.incomeBeforeTax / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Income Before Tax Ratio</td>
                        {incomeQ.map((iQ, i) =>(
                        <td key={i}>{iQ.incomeBeforeTaxRatio === null ? "-" : (iQ.incomeBeforeTaxRatio * 100).toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Income Tax Expense</td>
                        {incomeQ.map((iQ, i) =>(
                        <td key={i}>{iQ.incomeTaxExpense === null ? "-" : (iQ.incomeTaxExpense / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Net Income</td>
                        {incomeQ.map((iQ, i) =>(
                        <td key={i}>{iQ.netIncome === null ? "-" : (iQ.netIncome / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Net Income Ratio</td>
                        {incomeQ.map((iQ, i) =>(
                        <td key={i}>{iQ.netIncomeRatio === null ? "-" : (iQ.netIncomeRatio * 100).toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Eps</td>
                        {incomeQ.map((iQ, i) =>(
                        <td key={i}>{iQ.eps === null ? "-" : (iQ.eps).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Eps Diluted</td>
                        {incomeQ.map((iQ, i) =>(
                        <td key={i}>{iQ.epsdiluted === null ? "-" : (iQ.epsdiluted).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Basic average shares</td>
                        {incomeQ.map((iQ, i) =>(
                        <td key={i}>{iQ.weightedAverageShsOut === null ? "-" : (iQ.weightedAverageShsOut / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Diluted average shares</td>
                        {incomeQ.map((iQ, i) =>(
                        <td key={i}>{iQ.weightedAverageShsOutDil === null ? "-" : (iQ.weightedAverageShsOutDil / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Link</td>{incomeQ.map((iQ, i) =>(<td  key={i}>{iQ.link === null ? "-" : <a id="linkButton" className="nav-link" target="_blank" rel="noopener noreferrer" href={iQ.finalLink}>Ext Link</a>}</td>))}
                    </tr>
                </tbody>
            </table>
        </div>
        </>}
    </Fragment>

}

export default IncomeQ;