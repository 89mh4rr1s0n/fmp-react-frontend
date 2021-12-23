import React, { Fragment, useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import ReactLoading from "react-loading";
import { TickerContext } from './TickerContext';
import { shortVal } from './Utils';

const Myquote = (props) => {
    const [data, setData] = useContext(TickerContext);
    const { symb } = useParams();
    const [loading, setLoading] = useState(false);
    const [cim, setCim] = useState(null)
    const [profile, setProfile] = useState(null)
    const [quote, setQuote] = useState(null)

    const getData = async () => {
        //setData([]);
        setLoading(true);
        const data = await fetch(`http://fmp-react-app.herokuapp.com/company/info/${symb.toUpperCase()}`)
        const jsonQuote = await data.json();
        setData(jsonQuote)
        setCim(jsonQuote.perfAtr)
        setProfile(jsonQuote.profile)
        setQuote(jsonQuote.quote)
        setLoading(false);
        cim !== null && loading === false ? console.log(cim.length) : console.log(cim)
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
        {quote && <>
        <div class="row1" className="d-flex . mt-5">
            <div id="HASH" class="justify-content-between mr-4">
                <div>Previous Close</div>
                <div id="right">{quote[0].previousClose}</div>
            </div>
            <div id="HASH" class="justify-content-between mr-4">    
                <div>Mkt Cap</div>
                <div id="right">{quote[0].mktCap === null ? "-" : shortVal(profile[0].mktCap)}  {profile[0].currency}</div>
            </div>
            </div>
            <div class="row2" className="d-flex mt-0">
                <div id="HASH" class="justify-content-between mr-4 border-top">
                    <div>Open</div>
                    <div id="right">{quote[0].open}</div>
                </div>
                <div id="HASH" class="justify-content-between mr-4 border-top">
                    <div>eps</div>
                    <div id="right">{quote[0].eps === null ? "-" : quote[0].eps}</div>
                </div>
            </div>
            <div class="row3" className="d-flex mt-0">
                <div id="HASH" class="justify-content-between mr-4 border-top">
                    <div>Day's Range</div>
                    <div id="right">{`${quote[0].dayLow.toFixed(2)}-${quote[0].dayHigh.toFixed(2)}`}</div>
                </div>
                <div id="HASH" class="justify-content-between mr-4 border-top">
                    <div>5yr Beta</div>
                    <div id="right">{profile[0].beta.toFixed(2)}</div>
                </div>
            </div>
            <div class="row4" className="d-flex mt-0">
                <div id="HASH" class="justify-content-between mr-4 border-top">
                    <div>52 Week Range</div>
                    <div id="right">{profile[0].range}</div>
                </div>
                <div id="HASH" class="justify-content-between mr-4 border-top">
                    <div>Earnings Date</div>
                    <div id="right">{quote[0].earningsAnnouncement === null ? "-" : quote[0].earningsAnnouncement.slice(0,10)}</div>
                </div>
            </div>
            <div class="row5" className="d-flex mt-0">
                <div id="HASH" class="justify-content-between mr-4  border-top">
                    <div>Volume</div>
                    <div id="right">{quote[0].volume.toLocaleString()}</div>
                </div>
                <div id="HASH" class="justify-content-between mr-4  border-top">
                    <div>Dividend</div>
                    <div id="right">{profile[0].lastDiv.toFixed(2)}</div>
                </div>
            </div>
            <div class="row6" className="d-flex mt-0">
                <div id="HASH" class="justify-content-between mr-4  border-top">
                    <div>Avg Volume</div>
                    <div id="right">{quote[0].avgVolume === null ? "-" : quote[0].avgVolume.toLocaleString()}</div>
                </div>
                <div id="HASH" class="justify-content-between mr-4 border-top">
                    <div>p/e ratio</div>
                    <div id="right">{quote[0].pe === null ? "-" : quote[0].pe.toFixed(2)}</div>
                </div>
            </div>



            {cim.length !== 1 ? <>
            <div class="row5" className="d-flex . mt-3 ">
                <div style={{width: "390px", paddingLeft: "10px", fontSize: "14px"}}>Performance</div>
                <div style={{fontSize: "14px", width: "250px"}}>Monthly ATR</div>
            </div>
            <div class="row6" className="d-flex mt-0 ">
                <div id="perfBox" className="my-1 mr-1" style={{
                        borderRadius: "6px",
                        color: "#007bff",
                        backgroundColor: "rgb(193, 228, 240)"
                        }}>
                    <div id="perf1">-</div>
                    <div id="perf2" style={{color: "black"}}>1w</div>
                </div>
                <div id="perfBox" className="my-1 mr-1" style={{
                        borderRadius: "6px",
                        color: "#007bff",
                        backgroundColor: "rgb(193, 228, 240)"
                        }}>
                    <div id="perf1">-</div>
                    <div id="perf2" style={{color: "black"}}>2w</div>
                </div>
                <div id="perfBox" className="my-1 mr-1" style={{paddingRight: "120px"}} style={{
                        borderRadius: "6px",
                        color: "#007bff",
                        backgroundColor: "rgb(193, 228, 240)"
                        }}>
                    <div id="perf1">-</div>
                    <div id="perf2" style={{color: "black"}}>1m</div>
                </div>
                <div id="perfBox" className="my-1 mr-1" 
                    style={{
                        backgroundColor: "rgb(193, 228, 240)",
                        borderRadius: "6px",
                        marginLeft: "30px"}}>
                    <div id="perf1">-</div>
                    <div id="perf2">2w</div>
                </div>
                <div id="perfBox" className="my-1 mr-1" style={{backgroundColor: "rgb(193, 228, 240)",borderRadius: "6px"}}>
                    <div id="perf1">-</div>
                    <div id="perf2">3mAvg</div>
                </div>
            </div>
            <div class="row7" className="d-flex  mt-0 ">
                <div id="perfBox"  className="my-1 mr-1" style={{
                        borderRadius: "6px",
                        color: "#007bff",
                        backgroundColor: "rgb(193, 228, 240)"
                        }}>
                    <div id="perf1">-</div>
                    <div id="perf2" style={{color: "black"}}>3m</div>
                </div>
                <div id="perfBox" className="my-1 mr-1" style={{
                        borderRadius: "6px",
                        color: "#007bff",
                        backgroundColor: "rgb(193, 228, 240)"
                        }}>
                    <div id="perf1">-</div>
                    <div id="perf2" style={{color: "black"}}>6m</div>
                </div>
                <div id="perfBox" className="my-1 mr-1" style={{paddingRight: "120px"}} style={{
                        borderRadius: "6px",
                        color: "#007bff",
                        backgroundColor: "rgb(193, 228, 240)"
                        }}>
                    <div id="perf1">-</div>
                    <div id="perf2" style={{color: "black"}}>1y</div>
                </div>
                <div id="perfBox" className="my-1 mr-1" 
                    style={{
                        backgroundColor: "rgb(193, 228, 240)",
                        borderRadius: "6px",
                        marginLeft: "30px"}}>
                    <div id="perf1">-</div>
                    <div id="perf2">6mAvg</div>
                </div>
                <div id="perfBox" className="my-1 mr-1" style={{backgroundColor: "rgb(193, 228, 240)",borderRadius: "6px"}}>
                    <div id="perf1">-</div>
                    <div id="perf2">9mAvg</div>
                </div>
            </div></>

                :
            <>
                <div class="row5" className="d-flex . mt-3 ">
                <div style={{width: "390px", paddingLeft: "10px", fontSize: "14px"}}>Performance</div>
                <div style={{fontSize: "14px", width: "250px"}}>Monthly ATR</div>
            </div>
            <div class="row6" className="d-flex mt-0 ">
                <div id="perfBox" className="my-1 mr-1" style={{
                        borderRadius: "6px",
                        color: cim[0]['1_wk_%'] > 0 ? "green" : "red",
                        backgroundColor: cim[0]['1_wk_%'] > 0 ? "rgb(177, 255, 177)" : "rgb(253, 174, 174)"
                        }}>
                    <div id="perf1" >{cim[0]['1_wk_%'] === undefined ? "-" : `${cim[0]['1_wk_%'].toFixed(2)}%`}</div>
                    <div id="perf2" style={{color: "black"}}>1w</div>
                </div>
                <div id="perfBox" className="my-1 mr-1" style={{
                        borderRadius: "6px",
                        color: cim[0]['2_wk_%'] > 0 ? "green" : "red",
                        backgroundColor: cim[0]['2_wk_%'] > 0 ? "rgb(177, 255, 177)" : "rgb(253, 174, 174)"
                        }}>
                    <div id="perf1">{`${cim[0]['2_wk_%'].toFixed(2)}%`}</div>
                    <div id="perf2" style={{color: "black"}}>2w</div>
                </div>
                <div id="perfBox" className="my-1 mr-1" style={{paddingRight: "120px"}} style={{
                        borderRadius: "6px",
                        color: cim[0]['1_mth_%'] > 0 ? "green" : "red",
                        backgroundColor: cim[0]['1_mth_%'] > 0 ? "rgb(177, 255, 177)" : "rgb(253, 174, 174)"
                        }}>
                    <div id="perf1">{`${cim[0]['1_mth_%'].toFixed(2)}%`}</div>
                    <div id="perf2" style={{color: "black"}}>1m</div>
                </div>
                <div id="perfBox" className="my-1 mr-1" 
                    style={{
                        backgroundColor: "rgb(193, 228, 240)",
                        borderRadius: "6px",
                        marginLeft: "30px"}}>
                    <div id="perf1">{`${cim[0]['1moAvgAtr'].toFixed(2)}%`}</div>
                    <div id="perf2">2w</div>
                </div>
                <div id="perfBox" className="my-1 mr-1" style={{backgroundColor: "rgb(193, 228, 240)",borderRadius: "6px"}}>
                    <div id="perf1">{`${cim[0]['3moAvgAtr'].toFixed(2)}%`}</div>
                    <div id="perf2">3mAvg</div>
                </div>
            </div>

            
            <div class="row7" className="d-flex  mt-0 ">
                {cim[0]['6_mth_%'] === null ? <>
                <div id="perfBox"  className="my-1 mr-1" style={{
                        borderRadius: "6px",
                        color: "#007bff",
                        backgroundColor: "rgb(193, 228, 240)",
                        }}>
                    <div id="perf1">-</div>
                    <div id="perf2" style={{color: "black"}}>3m</div>
                </div></> : <>
                <div id="perfBox"  className="my-1 mr-1" style={{
                        borderRadius: "6px",
                        color: cim[0]['3_mth_%'] > 0 ? "green" : "red",
                        backgroundColor: cim[0]['3_mth_%'] > 0 ? "rgb(177, 255, 177)" : "rgb(253, 174, 174)"
                        }}>
                    <div id="perf1">{`${cim[0]['3_mth_%'].toFixed(2)}%`}</div>
                    <div id="perf2" style={{color: "black"}}>3m</div>
                </div>
                </>}


                {cim[0]['6_mth_%'] === null ? <>
                <div id="perfBox" className="my-1 mr-1" style={{
                        borderRadius: "6px",
                        color: "#007bff",
                        backgroundColor: "rgb(193, 228, 240)",
                        }}>
                    <div id="perf1">-</div>
                    <div id="perf2" style={{color: "black"}}>6m</div>
                </div></> : <>
                <div id="perfBox" className="my-1 mr-1" style={{
                        borderRadius: "6px",
                        color: cim[0]['6_mth_%'] > 0 ? "green" : "red",
                        backgroundColor: cim[0]['6_mth_%'] > 0 ? "rgb(177, 255, 177)" : "rgb(253, 174, 174)"
                        }}>
                    <div id="perf1">{`${cim[0]['6_mth_%'].toFixed(2)}%`}</div>
                    <div id="perf2" style={{color: "black"}}>6m</div>
                </div>
                </>}

                {cim[0]['1_yr_%'] === null ? <>
                <div id="perfBox" className="my-1 mr-1" style={{
                        borderRadius: "6px",
                        color: "#007bff",
                        backgroundColor: "rgb(193, 228, 240)",
                        }}>
                    <div id="perf1">-</div>
                    <div id="perf2" style={{color: "black"}}>1y</div>
                </div></> : <>
                <div id="perfBox" className="my-1 mr-1" style={{
                        borderRadius: "6px",
                        color: cim[0]['1_yr_%'] > 0 ? "green" : "red",
                        backgroundColor: cim[0]['1_yr_%'] > 0 ? "rgb(177, 255, 177)" : "rgb(253, 174, 174)"
                        }}>
                    <div id="perf1">{`${cim[0]['1_yr_%'].toFixed(2)}%`}</div>
                    <div id="perf2" style={{color: "black"}}>1y</div>
                </div>
                </>}

                {cim[0]['6moAvgAtr'] === null ? <>
                <div id="perfBox" className="my-1 mr-1" 
                    style={{
                        backgroundColor: "rgb(193, 228, 240)",
                        borderRadius: "6px",
                        marginLeft: "30px"}}>
                    <div id="perf1">-</div>
                    <div id="perf2">6mAvg</div>
                </div></> : <>
                <div id="perfBox" className="my-1 mr-1" 
                    style={{
                        backgroundColor: "rgb(193, 228, 240)",
                        borderRadius: "6px",
                        marginLeft: "30px"}}>
                    <div id="perf1">{`${cim[0]['6moAvgAtr'].toFixed(2)}%`}</div>
                    <div id="perf2">6mAvg</div>
                </div>
                </>}

                {cim[0]['9moAvgAtr'] === null ? <>
                <div id="perfBox" className="my-1 mr-1" style={{backgroundColor: "rgb(193, 228, 240)",borderRadius: "6px"}}>
                    <div id="perf1">-</div>
                    <div id="perf2">9mAvg</div>
                </div></> : <>
                <div id="perfBox" className="my-1 mr-1" style={{backgroundColor: "rgb(193, 228, 240)",borderRadius: "6px"}}>
                    <div id="perf1">{`${cim[0]['9moAvgAtr'].toFixed(2)}%`}</div>
                    <div id="perf2">9mAvg</div>
                </div>
                </>}
                
            </div> 
            </>}
            
            </>}

                
                
                
        </Fragment>

};

export default Myquote;