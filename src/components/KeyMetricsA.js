import React, { Fragment, useContext, useEffect, useState } from "react";
import { TickerContext } from './TickerContext';
import { useParams } from 'react-router-dom';
import ReactLoading from "react-loading";
import { shortVal } from './Utils';
import { Tooltip, OverlayTrigger } from "react-bootstrap"

const KeyMetricsA = () => {
    const [data, setData] = useContext(TickerContext);
    const { symb } = useParams();
    const [loading, setLoading] = useState(false);
    const [keyMetricA, setKeyMetricA] = useState(null);

    const key = process.env.REACT_APP_FMP_API_KEY;

    const initialize = async () => {
        setLoading(true);
        const kmData = await fetch(`https://financialmodelingprep.com/api/v3/key-metrics/${symb.toUpperCase()}?limit=40&apikey=${key}`)
        const kmJson = await kmData.json()
        const quote = await fetch(`http://fmp-react-app.herokuapp.com/company/info/${symb.toUpperCase()}`)
        const jsonQuote = await quote.json();
        data.kmA = kmJson;
        setData(jsonQuote)
        setKeyMetricA(kmJson);
        setLoading(false);
    }

    useEffect(() => {
        initialize();
    }, [])

    if(loading){
        return <div>
            <ReactLoading id="loading" type={'bars'} color="#007bff" />
        </div>
    }

    return <Fragment>
        {keyMetricA && <>
            <div className="d-flex mt-3">
                <div id="fnclsH">Key Metircs (Annual)</div>
            </div>
            <div id="container">
            <table id="stats">
                <thead>
                    <tr>
                        <th id="lst">Date</th>
                        {keyMetricA.map(date =>(
                        <th id="lst2">{date.date}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Revenue Per Share</td>
                        {keyMetricA.map(km =>(
                        <td>{km.revenuePerShare === null ? "-" : km.revenuePerShare.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Net Income Per Share</td>
                        {keyMetricA.map(km =>(
                        <td>{km.netIncomePerShare === null ? "-" : km.netIncomePerShare.toFixed(2)}</td>))}
                    </tr>
                    <tr><OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>
                              Operating Cash Flow Per Share
                            </Tooltip>
                          }>
                        <td>Operating Cash Flow Per Share</td>
                        </OverlayTrigger>
                        {keyMetricA.map(km =>(
                        <td>{km.operatingCashFlowPerShare === null ? "-" : km.operatingCashFlowPerShare.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Free Cash Flow Per Share</td>
                        {keyMetricA.map(km =>(
                        <td>{km.freeCashFlowPerShare === null ? "-" : km.freeCashFlowPerShare.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Cash Per Share</td>
                        {keyMetricA.map(km =>(
                        <td>{km.cashPerShare === null ? "-" : km.cashPerShare.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Book Value Per Share</td>
                        {keyMetricA.map(km =>(
                        <td>{km.bookValuePerShare === null ? "-" : km.bookValuePerShare.toFixed(2)}</td>))}
                    </tr>
                    <tr><OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>
                              Tangible Book Value Per Share
                            </Tooltip>
                          }>
                        <td>Tangible Book Value Per Share</td>
                        </OverlayTrigger>
                        {keyMetricA.map(km =>(
                        <td>{km.tangibleBookValuePerShare === null ? "-" : km.tangibleBookValuePerShare.toFixed(2)}</td>))}
                    </tr>
                    <tr><OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>
                              Shareholders Equity Per Share
                            </Tooltip>
                          }>
                        <td>Shareholders Equity Per Share</td>
                        </OverlayTrigger>
                        {keyMetricA.map(km =>(
                        <td>{km.shareholdersEquityPerShare === null ? "-" : km.shareholdersEquityPerShare.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Interest Debt Per Share</td>
                        {keyMetricA.map(km =>(
                        <td>{km.interestDebtPerShare === null ? "-" : km.interestDebtPerShare.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Market Cap</td>
                        {keyMetricA.map(km =>(
                        <td>{km.marketCap === null ? "-" : shortVal(km.marketCap)}</td>))}
                    </tr>
                    <tr>
                        <td>Enterprise Value</td>
                        {keyMetricA.map(km =>(
                        <td>{km.enterpriseValue === null ? "-" : shortVal(km.enterpriseValue)}</td>))}
                    </tr>
                    <tr>
                        <td>Pe Ratio</td>
                        {keyMetricA.map(km =>(
                        <td>{km.peRatio === null ? "-" : km.peRatio.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Price To Sales Ratio</td>
                        {keyMetricA.map(km =>(
                        <td>{km.priceToSalesRatio === null ? "-" : km.priceToSalesRatio.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Pocfratio</td>
                        {keyMetricA.map(km =>(
                        <td>{km.pocfratio === null ? "-" : km.pocfratio.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Pfcf Ratio</td>
                        {keyMetricA.map(km =>(
                        <td>{km.pfcfRatio === null ? "-" : km.pfcfRatio.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Pb Ratio</td>
                        {keyMetricA.map(km =>(
                        <td>{km.pbRatio === null ? "-" : km.pbRatio.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Ptb Ratio</td>
                        {keyMetricA.map(km =>(
                        <td>{km.ptbRatio === null ? "-" : km.ptbRatio.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Ev To Sales</td>
                        {keyMetricA.map(km =>(
                        <td>{km.evToSales === null ? "-" : km.evToSales.toFixed(2)}</td>))}
                    </tr>
                    <tr><OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>
                              Enterprise Value Over EBITDA
                            </Tooltip>
                          }>
                        <td>Enterprise Value Over EBITDA</td>
                        </OverlayTrigger>
                        {keyMetricA.map(km =>(
                        <td>{km.enterpriseValueOverEBITDA === null ? "-" : km.enterpriseValueOverEBITDA.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Ev To Operating Cash Flow</td>
                        {keyMetricA.map(km =>(
                        <td>{km.evToOperatingCashFlow === null ? "-" : km.evToOperatingCashFlow.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Ev To Free Cash Flow</td>
                        {keyMetricA.map(km =>(
                        <td>{km.evToFreeCashFlow === null ? "-" : km.evToFreeCashFlow.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Earnings Yield</td>
                        {keyMetricA.map(km =>(
                        <td>{km.earningsYield === null ? "-" : km.earningsYield.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Free Cash Flow Yield</td>
                        {keyMetricA.map(km =>(
                        <td>{km.freeCashFlowYield === null ? "-" : km.freeCashFlowYield.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Debt To Equity</td>
                        {keyMetricA.map(km =>(
                        <td>{km.debtToEquity === null ? "-" : km.debtToEquity.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Debt To Assets</td>
                        {keyMetricA.map(km =>(
                        <td>{km.debtToAssets === null ? "-" : km.debtToAssets.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Net Debt To EBITDA</td>
                        {keyMetricA.map(km =>(
                        <td>{km.netDebtToEBITDA === null ? "-" : km.netDebtToEBITDA.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Current Ratio</td>
                        {keyMetricA.map(km =>(
                        <td>{km.currentRatio === null ? "-" : km.currentRatio.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Interest Coverage</td>
                        {keyMetricA.map(km =>(
                        <td>{km.interestCoverage === null ? "-" : km.interestCoverage.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Income Quality</td>
                        {keyMetricA.map(km =>(
                        <td>{km.incomeQuality === null ? "-" : km.incomeQuality.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Dividend Yield</td>
                        {keyMetricA.map(km =>(
                        <td>{km.dividendYield === null ? "-" : km.dividendYield.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Payout Ratio</td>
                        {keyMetricA.map(km =>(
                        <td>{km.payoutRatio === null ? "-" : km.payoutRatio.toFixed(2)}</td>))}
                    </tr>
                    <tr><OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>
                              Sales General And Administrative To Revenue
                            </Tooltip>
                          }>
                        <td>Sales General And Administrative To Revenue</td>
                        </OverlayTrigger>
                        {keyMetricA.map(km =>(
                        <td>{km.salesGeneralAndAdministrativeToRevenue === null ? "-" : km.salesGeneralAndAdministrativeToRevenue.toFixed(2)}</td>))}
                    </tr>
                    <tr><OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>
                              Research And Developement To Revenue
                            </Tooltip>
                          }>
                        <td>Research And Developement To Revenue</td>
                        </OverlayTrigger>
                        {keyMetricA.map(km =>(
                        <td>{km.researchAndDdevelopementToRevenue === null ? "-" : km.researchAndDdevelopementToRevenue.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Intangibles To Total Assets</td>
                        {keyMetricA.map(km =>(
                        <td>{km.intangiblesToTotalAssets === null ? "-" : km.intangiblesToTotalAssets.toFixed(2)}</td>))}
                    </tr>
                    <tr><OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>
                              Capex To Operating Cash Flow
                            </Tooltip>
                          }>
                        <td>Capex To Operating Cash Flow</td>
                        </OverlayTrigger>
                        {keyMetricA.map(km =>(
                        <td>{km.capexToOperatingCashFlow === null ? "-" : km.capexToOperatingCashFlow.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Capex To Revenue</td>
                        {keyMetricA.map(km =>(
                        <td>{km.capexToRevenue === null ? "-" : km.capexToRevenue.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Capex To Depreciation</td>
                        {keyMetricA.map(km =>(
                        <td>{km.capexToDepreciation === null ? "-" : km.capexToDepreciation.toFixed(2)}</td>))}
                    </tr>
                    <tr><OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>
                              Stock Based Compensation To Revenue
                            </Tooltip>
                          }>
                        <td>Stock Based Compensation To Revenue</td>
                        </OverlayTrigger>
                        {keyMetricA.map(km =>(
                        <td>{km.stockBasedCompensationToRevenue === null ? "-" : km.stockBasedCompensationToRevenue.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Graham Number</td>
                        {keyMetricA.map(km =>(
                        <td>{km.grahamNumber === null ? "-" : km.grahamNumber.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Roic</td>
                        {keyMetricA.map(km =>(
                        <td>{km.roic === null ? "-" : km.roic.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Return On Tangible Assets</td>
                        {keyMetricA.map(km =>(
                        <td>{km.returnOnTangibleAssets === null ? "-" : km.returnOnTangibleAssets.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Graham Net Net</td>
                        {keyMetricA.map(km =>(
                        <td>{km.grahamNetNet === null ? "-" : km.grahamNetNet.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Working Capital</td>
                        {keyMetricA.map(km =>(
                        <td>{km.workingCapital === null ? "-" : shortVal(km.workingCapital)}</td>))}
                    </tr>
                    <tr>
                        <td>Tangible Asset Value</td>
                        {keyMetricA.map(km =>(
                        <td>{km.tangibleAssetValue === null ? "-" : shortVal(km.tangibleAssetValue)}</td>))}
                    </tr>
                    <tr>
                        <td>Net Current Asset Value</td>
                        {keyMetricA.map(km =>(
                        <td>{km.netCurrentAssetValue === null ? "-" : shortVal(km.netCurrentAssetValue)}</td>))}
                    </tr>
                    <tr>
                        <td>Invested Capital</td>
                        {keyMetricA.map(km =>(
                        <td>{km.investedCapital === null ? "-" : km.investedCapital.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Average Receivables</td>
                        {keyMetricA.map(km =>(
                        <td>{km.averageReceivables === null ? "-" : shortVal(km.averageReceivables)}</td>))}
                    </tr>
                    <tr>
                        <td>Average Payables</td>
                        {keyMetricA.map(km =>(
                        <td>{km.averagePayables === null ? "-" : shortVal(km.averagePayables)}</td>))}
                    </tr>
                    <tr>
                        <td>Average Inventory</td>
                        {keyMetricA.map(km =>(
                        <td>{km.averageInventory === null ? "-" : shortVal(km.averageInventory)}</td>))}
                    </tr>
                    <tr>
                        <td>Days Sales Outstanding</td>
                        {keyMetricA.map(km =>(
                        <td>{km.daysSalesOutstanding === null ? "-" : km.daysSalesOutstanding.toFixed(2)}</td>))}
                    </tr>
                    <tr><OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>
                              Days Payables Outstanding
                            </Tooltip>
                          }>
                        <td>Days Payables Outstanding</td>
                        </OverlayTrigger>
                        {keyMetricA.map(km =>(
                        <td>{km.daysPayablesOutstanding === null ? "-" : km.daysPayablesOutstanding.toFixed(2)}</td>))}
                    </tr>
                    <tr><OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>
                              Days Of Inventory On Hand
                            </Tooltip>
                          }>
                        <td>Days Of Inventory On Hand</td>
                        </OverlayTrigger>
                        {keyMetricA.map(km =>(
                        <td>{km.daysOfInventoryOnHand === null ? "-" : km.daysOfInventoryOnHand.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Receivables Turnover</td>
                        {keyMetricA.map(km =>(
                        <td>{km.receivablesTurnover === null ? "-" : km.receivablesTurnover.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Payables Turnover</td>
                        {keyMetricA.map(km =>(
                        <td>{km.payablesTurnover === null ? "-" : km.payablesTurnover.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Inventory Turnover</td>
                        {keyMetricA.map(km =>(
                        <td>{km.inventoryTurnover === null ? "-" : km.inventoryTurnover.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Roe</td>
                        {keyMetricA.map(km =>(
                        <td>{km.roe === null ? "-" : km.roe.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Capex Per Share</td>
                        {keyMetricA.map(km =>(
                        <td>{km.capexPerShare === null ? "-" : km.capexPerShare.toFixed(2)}</td>))}
                    </tr>
                </tbody>
            </table>
        </div>
        </>}
    </Fragment>
}

export default KeyMetricsA;