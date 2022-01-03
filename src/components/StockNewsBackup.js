import React, { Fragment, useCallback, useEffect, useState } from "react";
import ReactLoading from "react-loading";
import '../../src/App.css';
import {getRandomColor,createImageFromInitials} from './Utils';
import { Link } from 'react-router-dom';


const StockNews = () => {
    const [loading, setLoading] = useState(false);
    const [news, setNews] = useState([])
    const [mostActive, setMostActive] = useState([])
    const [gainers, setGainers] = useState([])
    const [sectors, setSectors] = useState([])

    const getData = useCallback( async () => {
        setLoading(true);
        const data = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/home`)
        const jsonData = await data.json();
        setNews(jsonData.news);
        setMostActive(jsonData.mostActive);
        setGainers(jsonData.gainers);
        setSectors(jsonData.sectorPerformance);
        setLoading(false);
    }, []);

    useEffect(() => {
        getData();
    }, []);

    if(loading){
        return <div style={{marginTop: "80px"}}>
            <ReactLoading id="loading" type={'bars'} color="#007bff" />
        </div>
    }

    return <Fragment>   
        <div class="row1" className="d-flex" style={{width: "100%", margin: "80px 0px 20px 0px"}}>
            <h5 class="col-sm-9">News</h5>
            <h5 class="col-sm-3">Sector Performance</h5>
        </div> 
        <div className="d-flex mt-2">
            <div>
                {news.map((news, index) =>(
                    <div key={index} className="mb-3 d-flex" style={{maxHeight: "141px"}}>

                        <a href={news.url} target="_blank"><img style={{maxWidth: '220px'}} className="mr-4 . w-auto . img-fluid "   src={news.image}></img></a>
                        <div>
                            <div id="newsF">{news.publishedDate}</div>
                            <h6 id="newsH">{news.title}</h6>
                            <div id="homeNewsT">{`${news.text}`}</div>
                            <div id="newsF" className="d-flex mt-0">
                                <div className="mr-4">Source: </div>
                                <a href={news.url} target="_blank" id="newsF"><div>{news.site}</div></a>
                            </div>
                        </div>
                    </div>
                    ))}
            </div>
            <div class="col-sm-4">
                <table>
                    <tr>
                        <th className="mr-2" >sector</th>
                        <th class="text-right" >change</th>
                    </tr>
                {sectors.map(sectors =>(
                    <tr>
                        <td className="mr-2. border-top" id="sector" style={{fontSize: '14px'}}>{sectors.sector}</td>
                        {parseFloat(sectors.changesPercentage) < 0 ? 
                        <td id='tabel' className="border-top text-right" style={{color: "red"}}>{`${parseFloat(sectors.changesPercentage.slice(0,-1)).toFixed(2)}%`}</td> : 
                        <td id='tabel' className="border-top text-right" style={{color: "green"}}>{`+${parseFloat(sectors.changesPercentage.slice(0,-1)).toFixed(2)}%`}</td>
                        }
                    </tr>
                ))}
                </table>
                <h5 className='mt-4' style={{textAlign: 'center', fontSize: "16px"}}>Gainers</h5>
                <table id="gainers">
                    <tr className="d-flex"><div className="d-flex" style={{float: "left",width: "41.5px"}}></div>
                        <div>
                        <th id='tabh' style={{width: '62px'}}>ticker</th>
                        <th id='tabh' style={{width: '52px'}}>price</th>
                        <th id='tabh' style={{width: '54px'}}>change</th>
                        <th id='tabh' style={{width: '52px'}}>%change</th>
                        </div>
                    </tr>
                {gainers.map(gainers =>(
                    <Link to={`/company/quote/${gainers.ticker}`} style={{ textDecoration: 'none' }}>
                        <tr style={{minWidth: "280px"}}>
                            <td id='bjc'>
                            <div className="d-flex border-top" style={{height: "41.5px",width: "41.5px",marginRight: "0px",float: "left"}}>
                                <img id="prImgSml" src={`https://financialmodelingprep.com/image-stock/${gainers.ticker}.png`}
                                onError={(e)=>{e.target.onerror = null; e.target.src=`${createImageFromInitials(30, `${gainers.ticker}`, getRandomColor())}`   }}></img>
                            </div>
                                <div className="d-flex border-top">
                                    <div id='tabel' style={{width: '62px', fontWeight: '700', marginRight: "3px"}}>{gainers.ticker}</div>
                                    <div id='tabel' style={{width: '52px'}}>{parseFloat(gainers.price).toFixed(2)}</div>
                                    <div id='tabel' style={{width: '54px', color: 'green'}}>{`+${gainers.changes.toFixed(2)}`}</div>
                                    <div id='tabel' style={{width: '52px', color: 'green'}}>{`+${parseFloat(gainers.changesPercentage).toFixed(2)}%`}</div>
                                </div>
                                <p id="sector" style={{fontSize: '11px', marginBottom: '1px'}}>{gainers.companyName}</p>
                            </td>
                        </tr>
                    </Link>
                ))}
                </table>

                <h5 className='mt-4' style={{textAlign: 'center', fontSize: "16px"}}>Most Active</h5>
                <table >
                    <tr>
                        <div>
                        <th class="col-sm-2 " className='mr-1' id='tabh' style={{width: '75px'}}>ticker</th>
                        <th class="col-sm-2 " className='mr-1' id='tabh' style={{width: '54px'}}>price</th>
                        <th class="col-sm-2 " className='mr-1' id='tabh' style={{width: '62px'}}>change</th>
                        <th class="col-sm-2 " className='mr-1' id='tabh' style={{width: '62px'}}>%change</th>
                        </div>
                    </tr>
                {mostActive.map(mostActive =>(
                    <Link to={`/company/quote/${mostActive.ticker}`} style={{ textDecoration: 'none' }}>
                    <tr>
                        <td id='bjc'>
                        <div className="d-flex border-top" style={{height: "41.5px",width: "41.5px",marginRight: "1px",float: "left"}}>
                                <img id="prImgSml" src={`https://financialmodelingprep.com/image-stock/${mostActive.ticker}.png`}
                                onError={(e)=>{e.target.onerror = null; e.target.src=`${createImageFromInitials(30, `${mostActive.ticker}`, getRandomColor())}`   }}></img>
                            </div>
                            <div className="d-flex . border-top">
                                <div class="col-sm-2" className='mr-1' id='tabel' style={{width: '70px', fontWeight: '700'}}>{mostActive.ticker}</div>
                                <div class="col-sm-2" className='mr-1' id='tabel' style={{width: '52px'}}>{parseFloat(mostActive.price).toFixed(2)}</div>
                                {/*renderMostActiveChanges()*/}
                                <div class="col-sm-2" className='mr-1' id='tabel' 
                                     style={{
                                        width: '56px',
                                        color: parseFloat(mostActive.changes) > 0 ? "green" : "red"
                                    }}>{`${parseFloat(mostActive.changes).toFixed(2)}`}</div>
                                <div class="col-sm-2" className='mr-1' id='tabel' 
                                     style={{
                                         width: '52px', 
                                         color: parseFloat(mostActive.changesPercentage) > 0 ? "green" : "red"}}>
                                            {`${parseFloat(mostActive.changesPercentage).toFixed(2)}%`}</div>
                            </div>
                            <p style={{fontSize: '11px', marginBottom: '1px'}}>{mostActive.companyName}</p>
                        </td>
                        
                    </tr>
                    </Link>
                ))}
                </table>
            </div>
            
        </div> 
    </Fragment>

}

export default StockNews;