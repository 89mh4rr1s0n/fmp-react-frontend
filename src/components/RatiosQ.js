import React, { Fragment, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import ReactLoading from "react-loading";
import { Tooltip, OverlayTrigger } from "react-bootstrap"

const RatiosQ = () => {
  
    const { symb } = useParams();
    const [loading, setLoading] = useState(false);
    const [RatiosQ, setRatiosQ] = useState(null);

    const key = process.env.REACT_APP_FMP_API_KEY;

    const initialize = async () => {
        setLoading(true);
        const ratioData = await fetch(`https://financialmodelingprep.com/api/v3/ratios/${symb.toUpperCase()}?period=quarter&limit=140&apikey=${key}`)
        const ratioJson = await ratioData.json()
        setRatiosQ(ratioJson);
        setLoading(false);
    }

    useEffect(() => {
        initialize();
        // eslint-disable-next-line
    }, [])

    if(loading){
        return <div>
            <ReactLoading id="loading" type={'bars'} color="#007bff" />
        </div>
    }

    return <Fragment>
        {RatiosQ && <>
            <div className="d-flex mt-3">
                <div id="fnclsH">Ratios (Quarterly)</div>
            </div>
            <div id="container">
            <table id="stats">
                <thead>
                    <tr>
                        <th id="lst">Date</th>
                        {RatiosQ.map((date, i) =>(
                        <th key={i} id="lst2">{date.date}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Current Ratio</td>
                        {RatiosQ.map((r, i) =>(
                        <td key={i}>{r.currentRatio === null ? "-" : r.currentRatio.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Quick Ratio</td>
                        {RatiosQ.map((r, i) =>(
                        <td key={i}>{r.quickRatio === null ? "-" : r.quickRatio.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Cash Ratio</td>
                        {RatiosQ.map((r, i) =>(
                        <td key={i}>{r.cashRatio === null ? "-" : r.cashRatio.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Days Of Sales Outstanding</td>
                        {RatiosQ.map((r, i) =>(
                        <td key={i}>{r.daysOfSalesOutstanding === null ? "-" : r.daysOfSalesOutstanding.toFixed(2)}</td>))}
                    </tr>
                    <tr><OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>
                              Days Of Inventory Outstanding
                            </Tooltip>
                          }>
                        <td>Days Of Inventory Outstanding</td>
                        </OverlayTrigger>
                        {RatiosQ.map((r, i) =>(
                        <td key={i}>{r.daysOfInventoryOutstanding === null ? "-" : r.daysOfInventoryOutstanding.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Operating Cycle</td>
                        {RatiosQ.map((r, i) =>(
                        <td key={i}>{r.operatingCycle === null ? "-" : r.operatingCycle.toFixed(2)}</td>))}
                    </tr>
                    <tr><OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>
                              Days Of Payables Outstanding
                            </Tooltip>
                          }>
                        <td>Days Of Payables Outstanding</td>
                        </OverlayTrigger>
                        {RatiosQ.map((r, i) =>(
                        <td key={i}>{r.daysOfPayablesOutstanding === null ? "-" : r.daysOfPayablesOutstanding.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Cash Conversion Cycle</td>
                        {RatiosQ.map((r, i) =>(
                        <td key={i}>{r.cashConversionCycle === null ? "-" : r.cashConversionCycle.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Gross Profit Margin</td>
                        {RatiosQ.map((r, i) =>(
                    <td key={i}>{r.grossProfitMargin === null ? "-" : (r.grossProfitMargin * 100).toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Operating Profit Margin</td>
                        {RatiosQ.map((r, i) =>(
                        <td key={i}>{r.operatingProfitMargin === null ? "-" : (r.operatingProfitMargin * 100).toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Pretax Profit Margin</td>
                        {RatiosQ.map((r, i) =>(
                        <td key={i}>{r.pretaxProfitMargin === null ? "-" : (r.pretaxProfitMargin * 100).toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Net Profit Margin</td>{RatiosQ.map((r, i) =>(
                        <td key={i}>{r.netProfitMargin === null ? "-" : (r.netProfitMargin * 100).toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Effective Tax Rate</td>
                        {RatiosQ.map((r, i) =>(
                        <td key={i}>{r.effectiveTaxRate === null ? "-" : r.effectiveTaxRate.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Return On Assets</td>
                        {RatiosQ.map((r, i) =>(
                        <td key={i}>{r.returnOnAssets === null ? "-" : r.returnOnAssets.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Return On Equity</td>
                        {RatiosQ.map((r, i) =>(
                        <td key={i}>{r.returnOnEquity === null ? "-" : r.returnOnEquity.toFixed(2)}</td>))}
                    </tr>
                    <tr><OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>
                              Return On Capital Employed
                            </Tooltip>
                          }>
                        <td>Return On Capital Employed</td>
                        </OverlayTrigger>
                        {RatiosQ.map((r, i) =>(
                        <td key={i}>{r.returnOnCapitalEmployed === null ? "-" : r.returnOnCapitalEmployed.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Net Income Per EBT</td>
                        {RatiosQ.map((r, i) =>(
                        <td key={i}>{r.netIncomePerEBT === null ? "-" : r.netIncomePerEBT.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Ebt Per Ebit</td>
                        {RatiosQ.map((r, i) =>(
                        <td key={i}>{r.ebtPerEbit === null ? "-" : r.ebtPerEbit.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Ebit Per Revenue</td>
                        {RatiosQ.map((r, i) =>(
                        <td key={i}>{r.ebitPerRevenue === null ? "-" : r.ebitPerRevenue.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Debt Ratio</td>
                        {RatiosQ.map((r, i) =>(
                        <td key={i}>{r.debtRatio === null ? "-" : r.debtRatio.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Debt Equity Ratio</td>
                        {RatiosQ.map((r, i) =>(
                        <td key={i}>{r.debtEquityRatio === null ? "-" : r.debtEquityRatio.toFixed(2)}</td>))}
                    </tr>
                    <tr><OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>
                              Long Term Debt To Capitalization
                            </Tooltip>
                          }>
                        <td>Long Term Debt To Capitalization</td>
                        </OverlayTrigger>
                        {RatiosQ.map((r, i) =>(
                        <td key={i}>{r.longTermDebtToCapitalization === null ? "-" : r.longTermDebtToCapitalization.toFixed(2)}</td>))}
                    </tr>
                    <tr><OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>
                              Total Debt To Capitalization
                            </Tooltip>
                          }>
                        <td>Total Debt To Capitalization</td>
                        </OverlayTrigger>
                        {RatiosQ.map((r, i) =>(
                        <td key={i}>{r.totalDebtToCapitalization === null ? "-" : r.totalDebtToCapitalization.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Interest Coverage</td>
                        {RatiosQ.map((r, i) =>(
                        <td key={i}>{r.interestCoverage === null ? "-" : r.interestCoverage.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Cash Flow To Debt Ratio</td>
                        {RatiosQ.map((r, i) =>(
                        <td key={i}>{r.cashFlowToDebtRatio === null ? "-" : r.cashFlowToDebtRatio.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Company Equity Multiplier</td>
                        {RatiosQ.map((r, i) =>(
                        <td key={i}>{r.companyEquityMultiplier === null ? "-" : r.companyEquityMultiplier.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Receivables Turnover</td>
                        {RatiosQ.map((r, i) =>(
                        <td key={i}>{r.receivablesTurnover === null ? "-" : r.receivablesTurnover.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Payables Turnover</td>
                        {RatiosQ.map((r, i) =>(
                        <td key={i}>{r.payablesTurnover === null ? "-" : r.payablesTurnover.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Inventory Turnover</td>
                        {RatiosQ.map((r, i) =>(
                        <td key={i}>{r.inventoryTurnover === null ? "-" : r.inventoryTurnover.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Fixed Asset Turnover</td>
                        {RatiosQ.map((r, i) =>(
                        <td key={i}>{r.fixedAssetTurnover === null ? "-" : r.fixedAssetTurnover.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Asset Turnover</td>
                        {RatiosQ.map((r, i) =>(
                        <td key={i}>{r.assetTurnover === null ? "-" : r.assetTurnover.toFixed(2)}</td>))}
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
                        {RatiosQ.map((r, i) =>(
                        <td key={i}>{r.operatingCashFlowPerShare === null ? "-" : r.operatingCashFlowPerShare.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Free Cash Flow Per Share</td>
                        {RatiosQ.map((r, i) =>(
                        <td key={i}>{r.freeCashFlowPerShare === null ? "-" : r.freeCashFlowPerShare.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Cash Per Share</td>
                        {RatiosQ.map((r, i) =>(
                        <td key={i}>{r.cashPerShare === null ? "-" : r.cashPerShare.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Payout Ratio</td>
                        {RatiosQ.map((r, i) =>(
                        <td key={i}>{r.payoutRatio === null ? "-" : r.payoutRatio.toFixed(2)}</td>))}
                    </tr>
                    <tr><OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>
                              Operating Cash Flow Sales Ratio
                            </Tooltip>
                          }>
                        <td>Operating Cash Flow Sales Ratio</td>
                        </OverlayTrigger>
                        {RatiosQ.map((r, i) =>(
                        <td key={i}>{r.operatingCashFlowSalesRatio === null ? "-" : r.operatingCashFlowSalesRatio.toFixed(2)}</td>))}
                    </tr>
                    <tr><OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>
                              Free Cash Flow Operating Cash Flow Ratio
                            </Tooltip>
                          }>
                        <td>Free Cash Flow Operating Cash Flow Ratio</td>
                        </OverlayTrigger>
                        {RatiosQ.map((r, i) =>(
                        <td key={i}>{r.freeCashFlowOperatingCashFlowRatio === null ? "-" : r.freeCashFlowOperatingCashFlowRatio.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Cash Flow Coverage Ratios</td>
                        {RatiosQ.map((r, i) =>(
                        <td key={i}>{r.cashFlowCoverageRatios === null ? "-" : r.cashFlowCoverageRatios.toFixed(2)}</td>))}
                    </tr>
                    <tr><OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>
                              Short Term Coverage Ratios
                            </Tooltip>
                          }>
                        <td>Short Term Coverage Ratios</td>
                        </OverlayTrigger>
                        {RatiosQ.map((r, i) =>(
                        <td key={i}>{r.shortTermCoverageRatios === null ? "-" : r.shortTermCoverageRatios.toFixed(2)}</td>))}
                    </tr>
                    <tr><OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>
                              Capital Expenditure Coverage Ratio
                            </Tooltip>
                          }>
                        <td>Capital Expenditure Coverage Ratio</td>
                        </OverlayTrigger>
                        {RatiosQ.map((r, i) =>(
                        <td key={i}>{r.capitalExpenditureCoverageRatio === null ? "-" : r.capitalExpenditureCoverageRatio.toFixed(2)}</td>))}
                    </tr>
                    <tr><OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>
                              Dividend Paid And Capex Coverage Ratio
                            </Tooltip>
                          }>
                        <td>Dividend Paid And Capex Coverage Ratio</td>
                        </OverlayTrigger>
                        {RatiosQ.map((r, i) =>(
                        <td key={i}>{r.dividendPaidAndCapexCoverageRatio === null ? "-" : r.dividendPaidAndCapexCoverageRatio.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Dividend Payout Ratio</td>
                        {RatiosQ.map((r, i) =>(
                        <td key={i}>{r.dividendPayoutRatio === null ? "-" : r.dividendPayoutRatio.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Price Book Value Ratio</td>
                        {RatiosQ.map((r, i) =>(
                        <td key={i}>{r.priceBookValueRatio === null ? "-" : r.priceBookValueRatio.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Price To Book Ratio</td>
                        {RatiosQ.map((r, i) =>(
                        <td key={i}>{r.priceToBookRatio === null ? "-" : r.priceToBookRatio.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Price To Sales Ratio</td>
                        {RatiosQ.map((r, i) =>(
                        <td key={i}>{r.priceToSalesRatio === null ? "-" : r.priceToSalesRatio.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Price Earnings Ratio</td>
                        {RatiosQ.map((r, i) =>(
                        <td key={i}>{r.priceEarningsRatio === null ? "-" : r.priceEarningsRatio.toFixed(2)}</td>))}
                    </tr>
                    <tr><OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>
                              Price To Free Cash Flows Ratio
                            </Tooltip>
                          }>
                        <td>Price To Free Cash Flows Ratio</td>
                        </OverlayTrigger>
                        {RatiosQ.map((r, i) =>(
                        <td key={i}>{r.priceToFreeCashFlowsRatio === null ? "-" : r.priceToFreeCashFlowsRatio.toFixed(2)}</td>))}
                    </tr>
                    <tr><OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>
                              Price To Operating Cash Flows Ratio
                            </Tooltip>
                          }>
                        <td>Price To Operating Cash Flows Ratio</td>
                        </OverlayTrigger>
                        {RatiosQ.map((r, i) =>(
                        <td key={i}>{r.priceToOperatingCashFlowsRatio === null ? "-" : r.priceToOperatingCashFlowsRatio.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Price Cash Flow Ratio</td>
                        {RatiosQ.map((r, i) =>(
                        <td key={i}>{r.priceCashFlowRatio === null ? "-" : r.priceCashFlowRatio.toFixed(2)}</td>))}
                    </tr>
                    <tr><OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>
                              Price Earnings To Growth Ratio
                            </Tooltip>
                          }>
                        <td>Price Earnings To Growth Ratio</td>
                        </OverlayTrigger>
                        {RatiosQ.map((r, i) =>(
                        <td key={i}>{r.priceEarningsToGrowthRatio === null ? "-" : r.priceEarningsToGrowthRatio.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Price Sales Ratio</td>
                        {RatiosQ.map((r, i) =>(
                        <td key={i}>{r.priceSalesRatio === null ? "-" : r.priceSalesRatio.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Dividend Yield</td>
                        {RatiosQ.map((r, i) =>(
                        <td key={i}>{r.dividendYield === null ? "-" : r.dividendYield.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Enterprise Value Multiple</td>
                        {RatiosQ.map((r, i) =>(
                        <td key={i}>{r.enterpriseValueMultiple === null ? "-" : r.enterpriseValueMultiple.toFixed(2)}</td>))}
                    </tr>
                    <tr>
                        <td>Price Fair Value</td>
                        {RatiosQ.map((r, i) =>(
                        <td key={i}>{r.priceFairValue === null ? "-" : r.priceFairValue.toFixed(2)}</td>))}
                    </tr>
                </tbody>
            </table>
        </div>
        </>}
    </Fragment>
}

export default RatiosQ;