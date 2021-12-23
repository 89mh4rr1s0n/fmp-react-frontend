import React, { Fragment, useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { TickerContext } from './TickerContext';
import ReactLoading from "react-loading";
import { Tooltip, OverlayTrigger } from "react-bootstrap"

const Profiletwo = () => {
    const [data, setData] = useContext(TickerContext);
    const { symb } = useParams();
    const [loading, setLoading] = useState(false);
    const [cim, setCim] = useState([])
    const [profile, setProfile] = useState(null)
    const [sic, setSic] = useState(null);
    const [keyExecs, setKeyExecs] = useState(null);
    const [quote, setQuote] = useState([])

    const key = process.env.REACT_APP_FMP_API_KEY;

    const setTheData = async () => {
        setLoading(true)
        const quote = await fetch(`http://fmp-react-app.herokuapp.com/company/info/${symb.toUpperCase()}`)
        const jsonQuote = await quote.json();
        const sicCode = await fetch(`https://financialmodelingprep.com/api/v4/standard_industrial_classification?symbol=${symb.toUpperCase()}&apikey=${key}`)
        const jsonSic = await sicCode.json();
        setSic(jsonSic);
        setData(jsonQuote)
        setKeyExecs(jsonQuote.keyExecs);
        //setCim(data.cimData)
        setProfile(jsonQuote.profile)
        //setQuote(data.quote)
        console.log(data)
        setLoading(false)
    }

    console.log(data)
    {sic ? console.log(sic) : console.log("fd")}

    useEffect(() => {
        setTheData()
    }, [])

    if(loading){
        return <div>
            <ReactLoading id="loading" type={'bars'} color="#007bff" />
        </div>
    }

    return <Fragment>

        {data.profile && <>
        <div class="row1" className="d-flex mt-5">
            <div id="HASH" className="justify-content-between mr-4">
                <div>sector:</div>
                <div id="right">{data.profile[0].sector}</div>
            </div>
            <div id="HASH" class="justify-content-between">
                <div>CIK:</div>
                <div id="right">{data.profile[0].cik}</div>
            </div>
        </div>
        <div class="row2" className="d-flex ">
            <div id="HASH" class="justify-content-between mr-4  border-top">
                <div>industry:</div>
                <div id="right">{data.profile[0].industry}</div>
            </div>
            <div id="HASH" class="justify-content-between  border-top">
                <div>ISIN:</div>
                <div id="right">{data.profile[0].isin}</div>
            </div>
        </div>
        <div class="row3" className="d-flex ">
            <div id="HASH" class="justify-content-between mr-4 border-top">
                <div>ceo:</div>
                <div id="right">{data.profile[0].ceo}</div>
            </div>
            <div id="HASH" class="justify-content-between border-top">
                <div>CUSIP:</div>
                <div id="right">{data.profile[0].cusip}</div>
            </div>
        </div>
        <div class="row4" className="d-flex ">
            <div id="HASH" class="justify-content-between mr-4 border-top" >
                <div>sic code:</div>
                <div id="right">{sic ? sic[0].siccode : "-"}</div>
            </div>
            <div id="HASH" class="justify-content-between mr-5 border-top" >
                <div>sic title:</div>
                <div id="right">{sic ? sic[0].industryTitle : "-"}</div>
            </div>
        </div>
        <div class="row5" className="d-flex ">
            <div id="HASH" class="justify-content-between mr-4 border-top" >
                <div>shares outstanding:</div>
                <div id="right">{data.quote[0].sharesOutstanding === null ? "-" : data.quote[0].sharesOutstanding.toLocaleString()}</div>
            </div>
            <div id="HASH" class="justify-content-between mr-5 border-top" >
                <div>full time employees:</div>
                <div id="right">{data.profile[0].fullTimeEmployees === null ? "-" : data.profile[0].fullTimeEmployees.toLocaleString()}</div>
            </div>
        </div>
        <div class="row5" className="d-flex ">
            <div id="HASH" class="justify-content-between mr-4 border-top">
                <div>IPO date:</div>
                <div id="right">{data.profile[0].ipoDate}</div>
            </div>
            <div id="HASH" class="justify-content-between mr-5 border-top">
                <div>CEO:</div>
                <div id="right">{data.profile[0].ceo}</div>
            </div>
        </div>
        <div className="mt-3" id="HASH" style={{fontWeight: "600"}}>{data.profile[0].companyName}</div>
        <div id="HASH">{data.profile[0].address}</div>
        <div id="HASH">{data.profile[0].city}</div>
        <div id="HASH">{data.profile[0].state}</div>
        <div id="HASH">{data.profile[0].country}</div>

        <div id="HASH" className="mt-2">zip: {data.profile[0].zip}</div>
        <div id="HASH">phone: {data.profile[0].phone}</div>
        <div id="HASH">
            <a
            style={{fontWeight: "600"}}
            href={data.profile[0].website} 
            target="_blank">{data.profile[0].website}</a></div>
        
                
        {keyExecs &&
        <table className="table mt-5 text-left" id="ke">
            <thead style={{padding: "5px"}}>
                <tr id="keyExecs">
                    <th>title</th>
                    <th>name</th>
                    <th>pay</th>
                    <th>gender</th>
                    <th>yr born</th>
                </tr>
            </thead>  
            <tbody style={{height: "20px"}}>
                
                {keyExecs.map(ke =>(
                    <tr id="keyExecs" >
                        {ke.title.length >= 33 ?
                        <OverlayTrigger
                          key={ke.title}
                          placement="top"
                          overlay={
                            <Tooltip id={`tooltip-${ke.title}`}>
                              {ke.title}
                            </Tooltip>
                          }>
                        <td id="keTable" style={{padding: "3px 15px 3px 3px"}}>{ke.title}</td>
                        </OverlayTrigger> : 
                        <td id="keTable" style={{padding: "3px 15px 3px 3px"}}>{ke.title}</td>}
                        <td style={{padding: "3px"}}>{ke.name}</td>
                        <td style={{padding: "3px"}}>{ke.pay !== null ? ke.pay.toLocaleString() : "-"}</td>
                        <td style={{padding: "3px"}}>{ke.gender}</td>
                        <td style={{padding: "3px"}}>{ke.yearBorn !== null ? ke.yearBorn : "-"}</td>
                    </tr>
                    ))}
            </tbody>
        </table>}
        <div style={{marginTop: "50px", fontWeight: "600"}}>Description</div>
        <p style={{fontSize: "14px", marginTop: "5px",marginBottom: "50px"}}>{data.profile[0].description}</p>    
        </>}      
        </Fragment>

};

export default Profiletwo;