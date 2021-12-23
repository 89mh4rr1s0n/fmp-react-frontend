import React, { Fragment, useContext, useEffect, useState } from "react";
import { TickerContext } from './TickerContext';
import { useParams } from 'react-router-dom';
import ReactLoading from "react-loading";
import { Tooltip, OverlayTrigger } from "react-bootstrap"

const IncomeA = () => {

    const [data, setData] = useContext(TickerContext);
    const { symb } = useParams();
    const [loading, setLoading] = useState(false);
    const [incomeA, setIncomeA] = useState(null);

    const key = process.env.REACT_APP_FMP_API_KEY;

    const initialize = async () => {
        setLoading(true);
        const incomeAData = await fetch(`https://financialmodelingprep.com/api/v3/income-statement/${symb.toUpperCase()}?limit=10&apikey=${key}`)
        const incomeAJson =  await incomeAData.json();
        const quote = await fetch(`http://fmp-react-app.herokuapp.com/company/info/${symb.toUpperCase()}`)
        const jsonQuote = await quote.json();
        //setData(jsonQuote)
        //data.incomeA = incomeAJson;
        //data.report = "income-statement";
        setIncomeA(incomeAJson);
        setLoading(false);
    };


    useEffect(() => {
        initialize();
    }, [])

    if(loading){
        return <div>
            <ReactLoading id="loading" type={'bars'} color="#007bff" />
        </div>
    }

    return <Fragment>
        {incomeA && <>
        <div className="d-flex mt-4">
            <div id="fnclsH">Income Statement (Annual)</div>
            <div style={{
                marginLeft: "10px",
                marginTop: "8px", 
                fontSize: "11px",
                height: "15px"}}>All numbers in thousands</div>
        </div>
        <div id="container">
            <table id="stats">
                <thead id="lcol">
                    <tr id="lcol">
                        <th id="lst">Date</th>
                        {incomeA.map(date =>(
                        <th id="lst2">{date.date}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Revenue</td>
                        {incomeA.map(iA =>(
                        <td>{iA.revenue === null ? "-" : (iA.revenue / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Cost Of Revenue</td>
                        {incomeA.map(iA =>(
                        <td>{iA.costOfRevenue === null ? "-" : (iA.costOfRevenue / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Gross Profit</td>
                        {incomeA.map(iA =>(
                        <td>{iA.grossProfit === null ? "-" : (iA.grossProfit / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Gross Profit Ratio</td>{incomeA
                        .map(iA =>(<td
                        >{iA.grossProfitRatio === null ? "-" : (iA.grossProfitRatio * 100).toFixed(2)}</td>))}
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
                        {incomeA.map(iA =>(
                        <td>{iA.researchAndDevelopmentExpenses === null ? "-" : (iA.researchAndDevelopmentExpenses / 1000).toLocaleString()}</td>))}
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
                        {incomeA.map(iA =>(
                        <td>{iA.generalAndAdministrativeExpenses === null ? "-" : (iA.generalAndAdministrativeExpenses / 1000).toLocaleString()}</td>))}
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
                        {incomeA.map(iA =>(
                        <td>{iA.sellingAndMarketingExpenses === null ? "-" : (iA.sellingAndMarketingExpenses / 1000).toLocaleString()}</td>))}
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
                        {incomeA.map(iA =>(
                        <td>{iA.sellingGeneralAndAdministrativeExpenses === null ? "-" : (iA.sellingGeneralAndAdministrativeExpenses / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Other Expenses</td>
                        {incomeA.map(iA =>(
                        <td>{iA.otherExpenses === null ? "-" : (iA.otherExpenses / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Operating Expenses</td>
                        {incomeA.map(iA =>(
                        <td>{iA.operatingExpenses === null ? "-" : (iA.operatingExpenses / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Cost And Expenses</td>
                        {incomeA.map(iA =>(
                        <td>{iA.costAndExpenses === null ? "-" : (iA.costAndExpenses / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Interest Income</td>
                        {incomeA.map(iA =>(
                        <td>{iA.interestIncome === null ? "-" : (iA.interestIncome / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Interest Expense</td>
                        {incomeA.map(iA =>(
                        <td>{iA.interestExpense === null ? "-" : (iA.interestExpense / 1000).toLocaleString()}</td>))}
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
                        {incomeA.map(iA =>(
                        <td>{iA.depreciationAndAmortization === null ? "-" : (iA.depreciationAndAmortization / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Ebitda</td>
                        {incomeA.map(iA =>(
                        <td>{iA.ebitda === null ? "-" : (iA.ebitda / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Ebitda Ratio</td>{incomeA
                        .map(iA =>(<td
                        >{iA.ebitdaratio === null ? "-" : (iA.ebitdaratio * 100).toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Operating Income</td>
                        {incomeA.map(iA =>(
                        <td>{iA.operatingIncome === null ? "-" : (iA.operatingIncome / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Operating Income Ratio</td>{incomeA
                        .map(iA =>(<td
                        >{iA.operatingIncomeRatio === null ? "-" : (iA.operatingIncomeRatio * 100).toFixed(2)}</td>))}
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
                        {incomeA.map(iA =>(
                        <td>{iA.totalOtherIncomeExpensesNet === null ? "-" : (iA.totalOtherIncomeExpensesNet / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Income Before Tax</td>
                        {incomeA.map(iA =>(
                        <td>{iA.incomeBeforeTax === null ? "-" : (iA.incomeBeforeTax / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Income Before Tax Ratio</td>{incomeA
                        .map(iA =>(<td
                        >{iA.incomeBeforeTaxRatio === null ? "-" : (iA.incomeBeforeTaxRatio * 100).toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Income Tax Expense</td>
                        {incomeA.map(iA =>(
                        <td>{iA.incomeTaxExpense === null ? "-" : (iA.incomeTaxExpense / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Net Income</td>
                        {incomeA.map(iA =>(
                        <td>{iA.netIncome === null ? "-" : (iA.netIncome / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Net Income Ratio</td>{incomeA
                        .map(iA =>(<td
                        >{iA.netIncomeRatio === null ? "-" : (iA.netIncomeRatio * 100).toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Eps</td>
                        {incomeA.map(iA =>(
                        <td>{iA.eps === null ? "-" : (iA.eps).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Eps Diluted</td>
                        {incomeA.map(iA =>(
                        <td>{iA.epsdiluted === null ? "-" : (iA.epsdiluted).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Basic average shares</td>
                        {incomeA.map(iA =>(
                        <td>{iA.weightedAverageShsOut === null ? "-" : (iA.weightedAverageShsOut / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Diluted average shares</td>
                        {incomeA.map(iA =>(
                        <td>{iA.weightedAverageShsOutDil === null ? "-" : (iA.weightedAverageShsOutDil / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Link</td>{incomeA.map(iA =>(<td>{iA.link === null ? "-" : <a id="linkButton" class="nav-link" target="_blank" href={iA.finalLink}>Ext Link</a>}</td>))}
                    </tr>
                </tbody>
            </table>
        </div>
        </>}
        </Fragment>

}

export default IncomeA;