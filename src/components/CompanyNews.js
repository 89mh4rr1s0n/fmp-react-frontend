import React, { Fragment, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import ReactLoading from "react-loading";

const CompanyNews = () => {
    
    const { symb } = useParams();
    const [loading, setLoading] = useState(false);
    const [news, setNews] = useState(null);

    const setTheData = async () => {
        setLoading(true);
        const news = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/stockNews/${symb.toUpperCase()}`)
        const jsonNews = await news.json();
        setNews(jsonNews)
        setLoading(false);
    }

    useEffect(() => {
        setTheData()
        // eslint-disable-next-line
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
                <div key={index} className="d-flex mb-3" style={{maxHeight: "141px"}}>
                    <div><a href={n.url} target="_blank" rel="noopener noreferrer"><img style={{maxWidth: '250px', maxHeight: '141px'}}  alt="company" className="mr-4 . w-auto . img-fluid " src={n.image}></img></a></div>
                    <div>
                        <div id="newsF">{n.publishedDate}</div>
                        <h6 id="newsH">{n.title}</h6>
                        <div id="newsT">{`${n.text}`}</div>
                        <div id="newsF" className="d-flex mt-0">
                            <div className="mr-4">Source: </div>
                            <a href={n.url} target="_blank" id="newsF"  rel="noopener noreferrer"><div>{n.site}</div></a>
                        </div>
                    </div>
                </div>
            ))}
            
            </>}
        </div>


    </Fragment>

};

export default CompanyNews;