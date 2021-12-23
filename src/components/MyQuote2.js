import React, { Fragment, useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { TickerContext } from './TickerContext';

const Myquote = (props) => {
    const [data, setData] = useContext(TickerContext);
    const { symb } = useParams();
    const [loading, setLoading] = useState(false);
    const [cim, setCim] = useState([])
    const [profile, setProfile] = useState([])
    const [quote, setQuote] = useState([])

    const setTheData = async () => {
        setLoading(true);
        const quote = await fetch(`http://localhost:5000/company/quotes/${symb.toUpperCase()}`)
        const jsonQuote = await quote.json();
        setData(data)
        setCim(data.cimData)
        setProfile(data.profile)
        setQuote(jsonQuote)
        console.log(data)
        setLoading(false);
    }

    console.log(data)
    console.log(props)
    console.log(quote)

    useEffect(() => {
        //setData()
        setTheData()
    }, [])

    if(loading){
        return <h2>Loading...</h2>
    }

    return <Fragment>
        <div>symb: {symb}</div>
        {data.cimData && <>
        <div class="row1" className="d-flex . mt-5">
            <div id="HASH" class="justify-content-between mr-4">
                <div>Previous Close</div>
                <div id="right">{data.quote[0].previousClose}</div>
            </div>
            <div id="HASH" class="justify-content-between mr-4">    
                <div>Market Cap</div>
                <div id="right">{data.profile[0].mktCap.toLocaleString()}  {data.profile[0].currency}</div>
            </div>
            </div>
            <div class="row2" className="d-flex mt-0">
                <div id="HASH" class="justify-content-between mr-4 border-top">
                    <div>Open</div>
                    <div id="right">{data.quote[0].open}</div>
                </div>
                <div id="HASH" class="justify-content-between mr-4 border-top">
                    <div>eps</div>
                    <div id="right">{data.quote[0].eps}</div>
                </div>
            </div>
            <div class="row3" className="d-flex mt-0">
                <div id="HASH" class="justify-content-between mr-4 border-top">
                    <div>Day's Range</div>
                    <div id="right">{`${data.quote[0].dayLow.toFixed(2)}-${data.quote[0].dayHigh.toFixed(2)}`}</div>
                </div>
                <div id="HASH" class="justify-content-between mr-4 border-top">
                    <div>5yr Beta</div>
                    <div id="right">{data.profile[0].beta.toFixed(2)}</div>
                </div>
            </div>
            <div class="row4" className="d-flex mt-0">
                <div id="HASH" class="justify-content-between mr-4 border-top">
                    <div>52 Week Range</div>
                    <div id="right">{data.profile[0].range}</div>
                </div>
                <div id="HASH" class="justify-content-between mr-4 border-top">
                    <div>Earnings Date</div>
                    <div id="right">{data.quote[0].earningsAnnouncement.slice(0,10)}</div>
                </div>
            </div>
            <div class="row5" className="d-flex mt-0">
                <div id="HASH" class="justify-content-between mr-4  border-top">
                    <div>Volume</div>
                    <div id="right">{data.quote[0].volume.toLocaleString()}</div>
                </div>
                <div id="HASH" class="justify-content-between mr-4  border-top">
                    <div>Dividend</div>
                    <div id="right">{data.profile[0].lastDiv.toFixed(2)}</div>
                </div>
            </div>
            <div class="row6" className="d-flex mt-0">
                <div id="HASH" class="justify-content-between mr-4  border-top">
                    <div>Avg Volume</div>
                    <div id="right">{data.quote[0].avgVolume.toLocaleString()}</div>
                </div>
                <div id="HASH" class="justify-content-between mr-4 border-top">
                    <div>Website</div>
                    <div id="right"><a href={data.profile[0].website}
                         target="_blank" >{data.profile[0].website}</a></div>
                </div>
            </div>
            <div class="row5" className="d-flex . mt-3 ">
                <div style={{width: "390px", paddingLeft: "10px", fontSize: "14px"}}>Performance</div>
                <div style={{fontSize: "14px", width: "250px"}}>Monthly ATR</div>
            </div>
            <div class="row6" className="d-flex mt-0 ">
                <div id="perfBox" className="my-1 mr-1" style={{
                        borderRadius: "6px",
                        color: data.cimData[0]['1_wk_%'] > 0 ? "green" : "red",
                        backgroundColor: data.cimData[0]['1_wk_%'] > 0 ? "rgb(177, 255, 177)" : "rgb(253, 174, 174)"
                        }}>
                    <div id="perf1" >{`${data.cimData[0]['1_wk_%'].toFixed(2)}%`}</div>
                    <div id="perf2" style={{color: "black"}}>1w</div>
                </div>
                <div id="perfBox" className="my-1 mr-1" style={{
                        borderRadius: "6px",
                        color: data.cimData[0]['1_mth_%'] > 0 ? "green" : "red",
                        backgroundColor: data.cimData[0]['1_mth_%'] > 0 ? "rgb(177, 255, 177)" : "rgb(253, 174, 174)"
                        }}>
                    <div id="perf1">{`${data.cimData[0]['1_mth_%'].toFixed(2)}%`}</div>
                    <div id="perf2" style={{color: "black"}}>1m</div>
                </div>
                <div id="perfBox" className="my-1 mr-1" style={{paddingRight: "120px"}} style={{
                        borderRadius: "6px",
                        color: data.cimData[0]['3_mth_%'] > 0 ? "green" : "red",
                        backgroundColor: data.cimData[0]['3_mth_%'] > 0 ? "rgb(177, 255, 177)" : "rgb(253, 174, 174)"
                        }}>
                    <div id="perf1">{`${data.cimData[0]['3_mth_%'].toFixed(2)}%`}</div>
                    <div id="perf2" style={{color: "black"}}>3m</div>
                </div>
                <div id="perfBox" className="my-1 mr-1" 
                    style={{
                        backgroundColor: "rgb(193, 228, 240)",
                        borderRadius: "6px",
                        marginLeft: "30px"}}>
                    <div id="perf1">{`${data.cimData[0]['1moAvgAtr'].toFixed(2)}%`}</div>
                    <div id="perf2">1m</div>
                </div>
                <div id="perfBox" className="my-1 mr-1" style={{backgroundColor: "rgb(193, 228, 240)",borderRadius: "6px"}}>
                    <div id="perf1">{`${data.cimData[0]['3moAvgAtr'].toFixed(2)}%`}</div>
                    <div id="perf2">3mAvg</div>
                </div>
            </div>
            <div class="row7" className="d-flex  mt-0 ">
                <div id="perfBox"  className="my-1 mr-1" style={{
                        borderRadius: "6px",
                        color: data.cimData[0]['6_mth_%'] > 0 ? "green" : "red",
                        backgroundColor: data.cimData[0]['6_mth_%'] > 0 ? "rgb(177, 255, 177)" : "rgb(253, 174, 174)"
                        }}>
                    <div id="perf1">{`${data.cimData[0]['6_mth_%'].toFixed(2)}%`}</div>
                    <div id="perf2" style={{color: "black"}}>6m</div>
                </div>
                <div id="perfBox" className="my-1 mr-1" style={{
                        borderRadius: "6px",
                        color: data.cimData[0]['1_yr_%'] > 0 ? "green" : "red",
                        backgroundColor: data.cimData[0]['1_yr_%'] > 0 ? "rgb(177, 255, 177)" : "rgb(253, 174, 174)"
                        }}>
                    <div id="perf1">{`${data.cimData[0]['1_yr_%'].toFixed(2)}%`}</div>
                    <div id="perf2" style={{color: "black"}}>1y</div>
                </div>
                <div id="perfBox" className="my-1 mr-1" style={{paddingRight: "120px"}} style={{
                        borderRadius: "6px",
                        color: data.cimData[0]['2_yr_%'] > 0 ? "green" : "red",
                        backgroundColor: data.cimData[0]['2_yr_%'] > 0 ? "rgb(177, 255, 177)" : "rgb(253, 174, 174)"
                        }}>
                    <div id="perf1">{`${data.cimData[0]['2_yr_%'].toFixed(2)}%`}</div>
                    <div id="perf2" style={{color: "black"}}>2y</div>
                </div>
                <div id="perfBox" className="my-1 mr-1" 
                    style={{
                        backgroundColor: "rgb(193, 228, 240)",
                        borderRadius: "6px",
                        marginLeft: "30px"}}>
                    <div id="perf1">{`${data.cimData[0]['6moAvgAtr'].toFixed(2)}%`}</div>
                    <div id="perf2">6mAvg</div>
                </div>
                <div id="perfBox" className="my-1 mr-1" style={{backgroundColor: "rgb(193, 228, 240)",borderRadius: "6px"}}>
                    <div id="perf1">{`${data.cimData[0]['9moAvgAtr'].toFixed(2)}%`}</div>
                    <div id="perf2">9mAvg</div>
                </div>
            </div></>}

                
                
                
        </Fragment>

};

export default Myquote;