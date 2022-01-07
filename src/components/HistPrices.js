import React, { Fragment, useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { useParams } from 'react-router-dom';

const HistPrices = () => {

    const { symb } = useParams();
    const [loading, setLoading] = useState(false);
    const [histData, setHistData] = useState(null);

    const getHist = async () => {
        setLoading(true);
        const historicalData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/company/historical/${symb.toUpperCase()}`)
        const histJson = await historicalData.json();
        setHistData(histJson);
        setLoading(false);
    }

    useEffect(() => {
        getHist();
        // eslint-disable-next-line
    }, []);

    if(loading){
        return <div>
            <ReactLoading id="loading" type={'bars'} color="#007bff" />
        </div>
    }

    if(!loading && histData && histData === "{}"){
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
                {histData.historical.map((historical, i) =>(
                    <tr id="keyExecs" key={i}>
                        <td style={{height: "10px",padding: "3px",width: "130px"}}>{historical.date}</td>
                        <td style={{height: "10px",padding: "3px"}}>{historical.open === undefined ? "-" : historical.open.toFixed(2)}</td>
                        <td style={{height: "10px",padding: "3px"}}>{historical.high === undefined ? "-" : historical.high.toFixed(2)}</td>
                        <td style={{height: "10px",padding: "3px"}}>{historical.low === undefined ? "-" : historical.low.toFixed(2)}</td>
                        <td style={{height: "10px",padding: "3px"}}>{historical.close === undefined ? "-" : historical.close.toFixed(2)}</td>
                        <td style={{height: "10px",padding: "3px"}}>{historical.adjClose === undefined ? "-" : historical.adjClose.toFixed(2)}</td>
                        <td style={{height: "10px",padding: "3px"}}>{historical.volume === undefined ? "-" : historical.volume.toLocaleString()}</td>
                    </tr>
                ))}
            </tbody>
        </table></>}
    </Fragment>
}

export default HistPrices;