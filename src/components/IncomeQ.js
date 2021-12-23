import React, { Fragment, useContext, useEffect, useState } from "react";
import { TickerContext } from './TickerContext';
import { useParams } from 'react-router-dom';
import ReactLoading from "react-loading";
import { Tooltip, OverlayTrigger } from "react-bootstrap"

const IncomeQ = () => {

    const [data, setData] = useContext(TickerContext);
    const { symb } = useParams();
    const [loading, setLoading] = useState(false);
    const [cim, setCim] = useState([]);
    const [profile, setProfile] = useState([]);
    const [quote, setQuote] = useState([]);
    const [incomeQ, setIncomeQ] = useState(null);

    const key = process.env.REACT_APP_FMP_API_KEY;

    const getData = async () => {
        setLoading(true);
        const incomeQData = await fetch(`https://financialmodelingprep.com/api/v3/income-statement/${symb.toUpperCase()}?period=quarter&limit=20&apikey=${key}`)
        const incomeQJson = await incomeQData.json();
        const quote = await fetch(`http://fmp-react-app.herokuapp.com/company/info/${symb.toUpperCase()}`)
        const jsonQuote = await quote.json();
        setData(jsonQuote)
        data.incomeQ = incomeQJson
        data.report = "income-statement";
        setCim(data.cimData)
        setProfile(data.profile)
        setQuote(data.quote)
        setIncomeQ(incomeQJson);
        setLoading(false);
    }


    useEffect(() => {
        getData()
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
                        {incomeQ.map(date =>(
                        <th id="lst2">{date.date}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Revenue</td>
                        {incomeQ.map(iQ =>(
                        <td>{iQ.revenue === null ? "-" : (iQ.revenue / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Cost Of Revenue</td>
                        {incomeQ.map(iQ =>(
                        <td>{iQ.costOfRevenue === null ? "-" : (iQ.costOfRevenue / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Gross Profit</td>
                        {incomeQ.map(iQ =>(
                        <td>{iQ.grossProfit === null ? "-" : (iQ.grossProfit / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Gross Profit Ratio</td>{incomeQ
                        .map(iQ =>(<td
                        >{iQ.grossProfitRatio === null ? "-" : (iQ.grossProfitRatio * 100).toFixed(2)}</td>))}
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
                        {incomeQ.map(iQ =>(
                        <td>{iQ.researchAndDevelopmentExpenses === null ? "-" : (iQ.researchAndDevelopmentExpenses / 1000).toLocaleString()}</td>))}
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
                        {incomeQ.map(iQ =>(
                        <td>{iQ.generalAndAdministrativeExpenses === null ? "-" : (iQ.generalAndAdministrativeExpenses / 1000).toLocaleString()}</td>))}
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
                        {incomeQ.map(iQ =>(
                        <td>{iQ.sellingAndMarketingExpenses === null ? "-" : (iQ.sellingAndMarketingExpenses / 1000).toLocaleString()}</td>))}
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
                        {incomeQ.map(iQ =>(
                        <td>{iQ.sellingGeneralAndAdministrativeExpenses === null ? "-" : (iQ.sellingGeneralAndAdministrativeExpenses / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Other Expenses</td>
                        {incomeQ.map(iQ =>(
                        <td>{iQ.otherExpenses === null ? "-" : (iQ.otherExpenses / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Operating Expenses</td>
                        {incomeQ.map(iQ =>(
                        <td>{iQ.operatingExpenses === null ? "-" : (iQ.operatingExpenses / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Cost And Expenses</td>
                        {incomeQ.map(iQ =>(
                        <td>{iQ.costAndExpenses === null ? "-" : (iQ.costAndExpenses / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Interest Income</td>
                        {incomeQ.map(iQ =>(
                        <td>{iQ.interestIncome === null ? "-" : (iQ.interestIncome / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Interest Expense</td>
                        {incomeQ.map(iQ =>(
                        <td>{iQ.interestExpense === null ? "-" : (iQ.interestExpense / 1000).toLocaleString()}</td>))}
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
                        {incomeQ.map(iQ =>(
                        <td>{iQ.depreciationAndAmortization === null ? "-" : (iQ.depreciationAndAmortization / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Ebitda</td>
                        {incomeQ.map(iQ =>(
                        <td>{iQ.ebitda === null ? "-" : (iQ.ebitda / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Ebitda Ratio</td>{incomeQ
                        .map(iQ =>(<td
                        >{iQ.ebitdaratio === null ? "-" : (iQ.ebitdaratio * 100).toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Operating Income</td>
                        {incomeQ.map(iQ =>(
                        <td>{iQ.operatingIncome === null ? "-" : (iQ.operatingIncome / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Operating Income Ratio</td>{incomeQ
                        .map(iQ =>(<td
                        >{iQ.operatingIncomeRatio === null ? "-" : (iQ.operatingIncomeRatio * 100).toFixed(2)}</td>))}
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
                        {incomeQ.map(iQ =>(
                        <td>{iQ.totalOtherIncomeExpensesNet === null ? "-" : (iQ.totalOtherIncomeExpensesNet / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Income Before Tax</td>
                        {incomeQ.map(iQ =>(
                        <td>{iQ.incomeBeforeTax === null ? "-" : (iQ.incomeBeforeTax / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Income Before Tax Ratio</td>{incomeQ
                        .map(iQ =>(<td
                        >{iQ.incomeBeforeTaxRatio === null ? "-" : (iQ.incomeBeforeTaxRatio * 100).toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Income Tax Expense</td>
                        {incomeQ.map(iQ =>(
                        <td>{iQ.incomeTaxExpense === null ? "-" : (iQ.incomeTaxExpense / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Net Income</td>
                        {incomeQ.map(iQ =>(
                        <td>{iQ.netIncome === null ? "-" : (iQ.netIncome / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Net Income Ratio</td>{incomeQ
                        .map(iQ =>(<td
                        >{iQ.netIncomeRatio === null ? "-" : (iQ.netIncomeRatio * 100).toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Eps</td>
                        {incomeQ.map(iQ =>(
                        <td>{iQ.eps === null ? "-" : (iQ.eps).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Eps Diluted</td>
                        {incomeQ.map(iQ =>(
                        <td>{iQ.epsdiluted === null ? "-" : (iQ.epsdiluted).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Basic average shares</td>
                        {incomeQ.map(iQ =>(
                        <td>{iQ.weightedAverageShsOut === null ? "-" : (iQ.weightedAverageShsOut / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Diluted average shares</td>
                        {incomeQ.map(iQ =>(
                        <td>{iQ.weightedAverageShsOutDil === null ? "-" : (iQ.weightedAverageShsOutDil / 1000).toLocaleString()}</td>))}
                    </tr>
                    <tr>
                        <td>Link</td>{incomeQ.map(iQ =>(<td>{iQ.link === null ? "-" : <a id="linkButton" class="nav-link" target="_blank" href={iQ.finalLink}>Ext Link</a>}</td>))}
                    </tr>
                </tbody>
            </table>
        </div>
        </>}
    </Fragment>

}

export default IncomeQ;