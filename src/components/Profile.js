import React, { Fragment, useEffect, useState, useContext } from "react";
import {TickerContext} from "./TickerContext";
import { Link } from 'react-router-dom';

const Profile = (props) => {

    const [quote, setQuote] = useState([]);
    const [profile, setProfile] = useState([]);
    const [cim, setCim] = useState([]);

    const [symbol, setSymbol] = useState("");
    //const search = useContext(TickerContext);

    const changeTicker = (e) => {
        setSymbol(e.target.value);
    };


    const handleSubmit = e => {
        try {
            setSymbol("")
            e.preventDefault();
           (async () => {const profileData = await fetch(`http://localhost:5000/company/quotes/${symbol.toUpperCase()}`)
           const jsonData = await profileData.json();
           console.log(jsonData)
           setQuote(jsonData.quote);
           setProfile(jsonData.profile);
           setCim(jsonData.cimData);
           console.log(symbol);})()
            
            //window.location =`http://localhost:3000/company/profile/${symbol}` 
        } catch (error) {
            console.log(error.message)
        }
    };

    console.log(symbol)
    console.log(quote)
    useEffect(() => {
        handleSubmit();
        console.log('render')
    }, [profile]);

    return <Fragment>
        <h1>Profile is here</h1>

        <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
                <Link to="/home"><a class="navbar-brand">MH FINANCE</a></Link>
          <ul class="navbar-nav">
            <li class="nav-item">
                <Link to="/home"><a class="nav-link">Home</a></Link>
            </li>
          </ul>
          <ul class="nav navbar-nav ml-auto">
          <form className="d-flex" onSubmit={handleSubmit}>
                    <input 
                    style={{minWidth: "330px"}}
                    className="form-control"
                    contentType = "application/json"
                    placeholder="Search for a Ticker or Company name here"
                    //name="ticker"
                    value={symbol}
                    onChange={changeTicker} 
                    //className="form-control" 
                    />
                    
                    <button className="btn btn-success">
                        <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="25" height="16" fill="currentColor" 
                        class="bi bi-search" 
                        viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>Search
                    </button>
                    
                    <li><button class=" btn .btn-primary mx-2"><a href="#">Sign Up</a></button></li>
              <li><button class=" btn .btn-primary bi bi-box-arrow-in-right"><a href="#"> Login</a></button></li>
                </form>
          </ul>
        </nav>





        {profile.map(profile =>(
        <div key={profile.symbol}>
            <div class="row0" className="d-flex . mt-5">
                <div class="col-sm-2"><img src={profile.image}
                style={{maxWidth:"100px", maxHeight:"100px", borderRadius: "50%"}}></img></div>
                <div class="col-sm-2 . my-0">
                    <h2 className="col-sm-12">{profile.symbol}</h2>
                    <div className="col-sm-16">{profile.price} {profile.changes.toFixed(2)}</div>
                </div>
                <div class="col-sm-9">
                    <h2 class="col-sm-12">{profile.companyName}</h2>
                    <div class="col-sm-12">{quote.changesPercentage}</div>
                </div>
            </div> 
            <div class="row1" className="d-flex . mt-3">
                <h1 class="col-sm-2">{profile.symbol}</h1>
                <h1 class="col-sm-9">{profile.companyName}</h1>
            </div>    

            <nav className="navbar-expand-sm" style={{backgroundColor: "#e3f2fd", width: "100%"}}>
                <div style={{ width: "100%"}} id="navbarNav">
                    <ul class="navbar-nav . justify-content-around">
                        <li class="nav-item active">
                            <a class="nav-link" href="#">Quote<span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">News</a>
                         </li>
                         <li class="nav-item">
                            <Link to="/company/historical/"><a class="nav-link">Historical Data</a></Link>
                         </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Financials</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Profile</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Statistics</a>
                        </li>
                    </ul>
                </div>
            </nav>
            
             <div class="row2" className="d-flex . mt-5">
                <div class="col-sm-2">Market Cap</div>
                <div class="col-sm-3">{profile.mktCap.toLocaleString()}  {profile.currency}</div>
                <div class="col-sm-2">Dividend</div>
                <div class="col-sm-3">{profile.lastDiv.toFixed(2)}</div>
            </div>
            <div class="row3" className="d-flex . mt-0">
                <div class="col-sm-2">Sector</div>
                <div class="col-sm-3">{profile.sector}</div>
                <div class="col-sm-2">Exchange</div>
                <div class="col-sm-3">{profile.exchange}</div>
            </div>
            <div class="row4" className="d-flex . mt-0">
                <div class="col-sm-2">Industry</div>
                <div class="col-sm-3">{profile.industry}</div>
                <div class="col-sm-2">5yr Beta</div>
                <div class="col-sm-3">{profile.beta.toFixed(2)}</div>
            </div>
            <div class="row5" className="d-flex . mt-0">
                <div class="col-sm-2">Employees</div>
                <div class="col-sm-3">{profile.fullTimeEmployees.toLocaleString()}</div>
                <div class="col-sm-2">IPO Date</div>
                <div class="col-sm-3">{profile.ipoDate}</div>
            </div>
            <div class="row5" className="d-flex . mt-0">
                <div class="col-sm-2">Website</div>
                <div class="col-sm-3" >
                     <a href={profile.website}
                     target="_blank" >{profile.website}</a></div>
                <div class="col-sm-2">CEO</div>
                <div class="col-sm-3">{profile.ceo}</div>
            </div>
            <div class="row5" className="d-flex . mt-2">
                <h5 class="col-sm-2">Address</h5>
            </div>
            <div class="row5">
                <div class="col-sm-6">{profile.address}</div>
                <div class="col-sm-6">{profile.city}</div>
                <div class="col-sm-6">{profile.state}</div>
                <div class="col-sm-6">{profile.zip}</div>
                <div class="col-sm-6">{profile.country}</div>
                <div className="d-flex mt-3">
                    <div class="col-sm-2">Phone:</div>
                    <div class="col-sm-6">{profile.phone}</div>
                </div>
                <div>
                    <div class="col-sm-11" className="mt-5">{profile.description}</div>
                </div>
            </div>
        </div>
        ))}
    </Fragment>

}

export default Profile;