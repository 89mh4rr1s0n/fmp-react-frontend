import React, { Fragment, useContext, useEffect, useState } from "react";
import { TickerContext } from './TickerContext';
import { useParams } from 'react-router-dom';
import ReactLoading from "react-loading";


const CompanyNews = () => {
    const [data, setData] = useContext(TickerContext);
    const { symb } = useParams();
    const [loading, setLoading] = useState(false);
    const [cim, setCim] = useState([]);
    const [profile, setProfile] = useState([]);
    const [quote, setQuote] = useState([]);
    const [news, setNews] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPage] = useState(15);

    const setTheData = async () => {
        setLoading(true);
        const news = await fetch(`http://fmp-react-app.herokuapp.com/stockNews/${symb.toUpperCase()}`)
        const jsonNews = await news.json();
        const quote = await fetch(`http://fmp-react-app.herokuapp.com/company/info/${symb.toUpperCase()}`)
        const jsonQuote = await quote.json();
        setData(jsonQuote)
        data.news = jsonNews
        setCim(data.cimData)
        setProfile(data.profile)
        setQuote(data.quote)
        setNews(jsonNews)
        setLoading(false);
    }

    useEffect(() => {
        //setData()
        setTheData()
    }, [])

    if(loading){
        return <div>
            <ReactLoading id="loading" type={'bars'} color="#007bff" />
        </div>
    }

    if(!loading && news && news.length === 0){
        return <div className="mt-3 ml-4">
            No News Available for this Company/Instrument
        </div>
    }

    return <Fragment>

        <div style={{marginTop: "20px",marignBottom: "40px"}}>
            {news && <>
            {news.map((n, index) =>(
                <div className="d-flex mb-3" style={{maxHeight: "141px"}}>
                    <div><a href={n.url} target="_blank"><img style={{maxWidth: '250px', maxHeight: '141px'}} className="mr-4 . w-auto . img-fluid " src={n.image}></img></a></div>
                    <div>
                        <div id="newsF">{n.publishedDate}</div>
                        <h6 id="newsH">{n.title}</h6>
                        <div id="newsT">{`${n.text}`}</div>
                        <div id="newsF" className="d-flex mt-0">
                            <div className="mr-4">Source: </div>
                            <a href={n.url} target="_blank" id="newsF"><div>{n.site}</div></a>
                        </div>
                    </div>
                </div>
            ))}
            
            </>}
        </div>


    </Fragment>

};

export default CompanyNews;