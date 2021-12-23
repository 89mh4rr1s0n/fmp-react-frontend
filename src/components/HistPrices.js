import React, { Fragment, useContext, useEffect, useState } from "react";
import ReactLoading from "react-loading";
import {TickerContext} from "./TickerContext";
import { useParams } from 'react-router-dom';

const HistPrices = (props) => {
    const [data, setData] = useContext(TickerContext);
    const { symb } = useParams();
    const [loading, setLoading] = useState(false);
    const [cim, setCim] = useState([]);
    const [profile, setProfile] = useState([]);
    const [quote, setQuote] = useState([]);
    const [histData, setHistData] = useState(null);

    const getHist = async () => {
        setLoading(true);
        const historicalData = await fetch(`http://fmp-react-app.herokuapp.com/company/historical/${symb.toUpperCase()}`)
        const histJson = await historicalData.json();
        const quote = await fetch(`http://fmp-react-app.herokuapp.com/company/info/${symb.toUpperCase()}`)
        const jsonQuote = await quote.json();
        setData(jsonQuote)
        data.historical = histJson
        setCim(data.cimData)
        setProfile(data.profile)
        setQuote(data.quote)
        setHistData(histJson);
        setLoading(false);
    }

    useEffect(() => {
        getHist();
        
    }, []);

    if(loading){
        return <div>
            <ReactLoading id="loading" type={'bars'} color="#007bff" />
        </div>
    }

    if(!loading && histData && histData == "{}"){
        return <div className="mt-3 ml-4">
            No Historical Price Data Available for this Company/Instrument
        </div>
    }

    return <Fragment>
        {histData && <>
        <table className="table mt-5 text-center">
            <thead>
                <tr id="keyExecs">
                    <th style={{width: "130px"}}>Date</th>
                    <th>Open</th>
                    <th>High</th>
                    <th>Low</th>
                    <th>Close</th>
                    <th>Adj Close</th>
                    <th>Volume</th>
                </tr>
            </thead>
            <tbody>
                {histData.historical.map(historical =>(
                    <tr id="keyExecs" key={historical.label}>
                        <td style={{height: "10px",padding: "3px",width: "130px"}}>{historical.date}</td>
                        <td style={{height: "10px",padding: "3px"}}>{historical.open.toFixed(2)}</td>
                        <td style={{height: "10px",padding: "3px"}}>{historical.high.toFixed(2)}</td>
                        <td style={{height: "10px",padding: "3px"}}>{historical.low.toFixed(2)}</td>
                        <td style={{height: "10px",padding: "3px"}}>{historical.close.toFixed(2)}</td>
                        <td style={{height: "10px",padding: "3px"}}>{historical.adjClose.toFixed(2)}</td>
                        <td style={{height: "10px",padding: "3px"}}>{historical.volume.toLocaleString()}</td>
                    </tr>
                ))}
            </tbody>
        </table></>}
    </Fragment>
}

export default HistPrices;