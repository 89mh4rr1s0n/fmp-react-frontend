import React, { Fragment, useEffect, useState } from "react";
import ReactLoading from "react-loading";
import {getRandomColor,createImageFromInitials} from './Utils';
import { Link } from 'react-router-dom';
import '../myStyles.css';


const StockNews = () => {
    const [loading, setLoading] = useState(false);
    const [news, setNews] = useState([])
    const [mostActive, setMostActive] = useState([])
    const [gainers, setGainers] = useState([])
    const [sectors, setSectors] = useState([])

    const getData = async () => {
        setLoading(true);
        const data = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/home`)
        const jsonData = await data.json();
        setNews(jsonData.news);
        setMostActive(jsonData.mostActive);
        setGainers(jsonData.gainers);
        setSectors(jsonData.sectorPerformance);
        setLoading(false);
    };

    useEffect(() => {
        getData();
    }, []);

    if(loading){
        return <div style={{marginTop: "80px"}}>
            <ReactLoading id="loading" type={'bars'} color="#007bff" />
        </div>
    }

    return <Fragment>   
        <div 
        class="row1" 
        className="d-flex" 
        style={{width: "100%", margin: "80px 0px 0px 0px"}}>
            <h5 
            class="col-sm-9" 
            style={{maxWidth: "680px", padding: "0px", fontSize: "17px"}}>
                News
            </h5>
            <h5 
            class="col-sm-3" 
            style={{padding: "0px", fontSize: "17px"}}>
                Sector Performance
            </h5>
        </div> 
        <div className="d-flex mt-1">
            <div>
                {news.map((news, index) =>(
                    <div key={index} className="mb-3 d-flex" style={{maxHeight: "141px"}}>
                        <a 
                        href={news.url} 
                        rel="noopener noreferrer"
                        target="_blank">
                            <img 
                            style={{maxWidth: '220px'}} 
                            alt="news item"
                            className="mr-4 w-auto img-fluid" 
                            src={news.image}>
                            </img>
                        </a>
                        <div>
                            <div id="newsF">{news.publishedDate}</div>
                            <h6 id="newsH">{news.title}</h6>
                            <div id="homeNewsT">{`${news.text}`}</div>
                            <div id="newsF" className="d-flex mt-0">
                                <div className="mr-4">Source: </div>
                                <a href={news.url} target="_blank" rel="noopener noreferrer" id="newsF">
                                    <div>{news.site}</div>
                                </a>
                            </div>
                        </div>
                    </div>
                    ))}
            </div>
            <div class="col-sm-4">
                <div style={{marginLeft: "45px", width: "250px"}}>
                    <div style={{minWitdh: "250px"}} className="d-flex">
                        <div className="mr-2" style={{fontWeight: "700", width: "190px", fontSize: "14px"}}>sector</div>
                        <div className="text-right" style={{fontWeight: "700", fontSize: "14px"}}>%change</div>
                    </div>
                {sectors.map(sectors =>(
                    <div className="d-flex">
                        <div className="mr-2. border-top" id="sector" style={{fontSize: '14px', width: "190px"}}>{sectors.sector}</div>
                        {parseFloat(sectors.changesPercentage) < 0 ? 
                        <div 
                            id='tabel' 
                            className="border-top text-right" 
                            style={{color: "red", width: "60px"}}>
                                {`${parseFloat(sectors.changesPercentage.slice(0,-1)).toFixed(2)}%`}
                        </div> 
                        : 
                        <div 
                            id='tabel' 
                            className="border-top text-right" 
                            style={{color: "green", width: "60px"}}>
                                {`+${parseFloat(sectors.changesPercentage.slice(0,-1)).toFixed(2)}%`}
                        </div>
                        }
                    </div>
                ))}
                </div>

                
                <h5 className='mt-4' style={{marginLeft: "45px", fontSize: "16px" }}>Gainers</h5>
                <div id="gainers" className="mb-1">
                    <div className="d-flex justify-content-between" style={{width: "310px"}}>
                        <div id='tabh' style={{width: '62px', marginLeft: "45px"}}>ticker</div>
                        <div id='tabh' style={{width: '52px'}}>price</div>
                        <div id='tabh' style={{width: '54px'}}>change</div>
                        <div id='tabh' style={{width: '52px', marginRight: "10px"}}>%change</div>
                    </div>
                {gainers.map(gainers =>(
                    <Link to={`/company/quote/${gainers.ticker}`} style={{ textDecoration: 'none' }}>
                    
                        <div id='bjc' className="d-flex border-top">
                            <div className="d-flex" id="imgContainer" >
                                    <img 
                                    id="prImgSml"
                                    alt="company logo" 
                                    src={`https://financialmodelingprep.com/image-stock/${gainers.ticker}.png`}
                                    onError={(e)=>{e.target.onerror = null; e.target.src=`${createImageFromInitials(30, `${gainers.ticker}`, getRandomColor())}`   }}></img>
                                </div>
                            <div className="justify-content-between">
                                <div id="homeItems" className="d-flex justify-content-between w-100">
                                    <div 
                                    id='tabel' 
                                    style={{
                                        width: '62px',
                                        fontWeight: '700', 
                                        marginRight: "3px",
                                        color: "black"
                                        }}>
                                            {gainers.ticker}
                                    </div>
                                    <div 
                                    id='tabel' 
                                    style={{
                                        width: '52px',
                                        color: "black"
                                        }}>
                                            {parseFloat(gainers.price).toFixed(2)}
                                    </div>
                                    <div 
                                    id='tabel' 
                                    style={{
                                        width: '54px', 
                                        color: 'green', 
                                        textAlign: "right", 
                                        paddingRight: "14px"
                                        }}>
                                            {`+${gainers.changes.toFixed(2)}`}
                                    </div>
                                    <div 
                                    id='tabel' 
                                    style={{
                                        width: '52px', 
                                        color: 'green', 
                                        float: "right",
                                        textAlign: "right"
                                        }}>
                                            {`+${parseFloat(gainers.changesPercentage).toFixed(2)}%`}
                                    </div>
                                </div>
                                <p 
                                id="sector"
                                style={{fontSize: '11px', marginBottom: '1px', width: "220px", color: "black"}}>
                                    {gainers.companyName}
                                </p>
                            </div>
                        </div>
                            
                        
                    </Link>
                ))}
                
                </div>

                
                <div style={{marginTop: "10px"}}>
                    <h5 style={{
                        width: "45px", 
                        fontSize: "16px", 
                        height: "70px", 
                        display: 'table-cell',
                        verticalAlign: 'bottom'}}>
                    </h5>
                    <h5 style={{
                        marginLeft: "45px", 
                        fontSize: "16px", 
                        height: "70px", 
                        display: 'table-cell',
                        verticalAlign: 'bottom'}}>
                        Most Active
                    </h5>
                    <div className="d-flex justify-content-between" style={{width: "310px", marginTop: "10px"}}>
                        <div id='tabh' style={{width: '62px', marginLeft: "45px"}}>ticker</div>
                        <div id='tabh' style={{width: '52px'}}>price</div>
                        <div id='tabh' style={{width: '54px'}}>change</div>
                        <div id='tabh' style={{width: '52px', marginRight: "10px"}}>%change</div>
                    </div>
                {mostActive.map(mostActive =>(
                    <Link to={`/company/quote/${mostActive.ticker}`} style={{ textDecoration: 'none' }}>
                        <div id='bjc' className="d-flex border-top">
                            <div className="d-flex" id="imgContainer">
                                <img 
                                id="prImgSml" 
                                alt="company logo"
                                src={`https://financialmodelingprep.com/image-stock/${mostActive.ticker}.png`}
                                onError={(e)=>{e.target.onerror = null; e.target.src=`${createImageFromInitials(30, `${mostActive.ticker}`, getRandomColor())}` }}>
                                </img>
                            </div>
                            <div className="justify-content-between">
                                <div id="homeItems" className="d-flex justify-content-between w-100">
                                <div 
                                id='tabel' 
                                style={{
                                    width: '62px',
                                    fontWeight: '700', 
                                    marginRight: "3px",
                                    color: "black"
                                    }}>
                                    {mostActive.ticker}
                                </div>
                                <div 
                                id='tabel' 
                                style={{
                                    width: '52px',
                                    color: "black"
                                    }}>
                                        {parseFloat(mostActive.price).toFixed(2)}
                                </div>

                                {parseFloat(mostActive.changes) > 0 ? 
                                <div 
                                id='tabel' 
                                style={{
                                    width: '54px', 
                                    color: 'green', 
                                    textAlign: "right", 
                                    paddingRight: "14px"
                                }}>
                                    {`+${parseFloat(mostActive.changes).toFixed(2)}`}
                                </div> :
                                <div 
                                id='tabel' 
                                style={{
                                    width: '54px', 
                                    color: 'red', 
                                    textAlign: "right", 
                                    paddingRight: "14px"
                                }}>
                                    {`${parseFloat(mostActive.changes).toFixed(2)}`}
                                </div>
                                }
                                
                                {parseFloat(mostActive.changesPercentage) > 0 ?
                                <div id='tabel' style={{width: '52px', color: 'green',float: "right", textAlign: "right"}}>
                                    {`+${parseFloat(mostActive.changesPercentage).toFixed(2)}%`}
                                </div> :
                                <div id='tabel' style={{width: '52px', color: 'red',float: "right", textAlign: "right"}}>
                                {`${parseFloat(mostActive.changesPercentage).toFixed(2)}%`}
                                </div> 
                                }
                                
                            </div>
                            <p 
                            id="sector" 
                            style={{fontSize: '11px', marginBottom: '1px', width: "220px", color: "black"}}>
                                {mostActive.companyName}
                            </p>
                            </div>
                        </div>
                    </Link>
                ))}
                </div>
            </div>
            
        </div> 
    </Fragment>

}

export default StockNews;