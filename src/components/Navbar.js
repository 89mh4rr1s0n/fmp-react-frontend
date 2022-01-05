import React, { Fragment, useContext, useEffect, useReducer, useState } from "react";
import { Link, useHistory, useParams } from 'react-router-dom';
import { TickerContext } from './TickerContext';
import { useAuth } from "../contexts/AuthContext";
import ConfirmLogout from './ConfirmLogout';
//import availableSymbols from '../availableTraded.json';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';


const Navbar2 = () => {

    const getAvailable = async () => {
        const availableData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/symbols`);
        const availableJson = await availableData.json();
        setAvailable(availableJson);
    }
    const { currentUser } = useAuth();
    console.log(currentUser)
    const { symb } = useParams();
    const [symbol, setSymbol] = useState('')
    const [quote, setQuote] = useState([]);
    const [profile, setProfile] = useState([]);
    const [cim, setCim] = useState([]);
    const [available, setAvailable] = useState(null);
    const [filteredSymbols, setFilteredSymbols] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    const [data, setData] = useContext(TickerContext);
    const history = useHistory();

    console.log(symb)

    const getData = async () => {
        const data = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/company/info/${symbol.toUpperCase()}`)
        const jsonData = await data.json();
        setQuote(jsonData.quote);
        setProfile(jsonData.profile);
        //setCim(jsonData.cimData);
        setData(jsonData)
        //setTicker(symbol);
        data.report = "income-statement";
        console.log(jsonData)
        console.log(quote)
    }

    const clearSearch = () => {
        setSymbol('')
    }


        console.log(`symbol state is ${symbol}`)
        console.log(`data is ${data}`)

    const handleSubmit = e => {
        e.preventDefault()
        //data.report = "income-statement";
        data.symbol = symbol.toUpperCase();
        getData().then( history.push(`/company/quote/${data.symbol}`));

        setSymbol('')
    }

    const handleFilter = (event) => {
        data.symbol = event.target.value.toUpperCase();
        const searchWord = event.target.value;
        setSymbol(event.target.value)
        setSymbol(searchWord.toUpperCase());
        const newFilter = available.filter((value) => {
            if(searchWord.length <= 2){
                return value.symbol.toUpperCase().includes(searchWord.toUpperCase())
            } else {
                return value.symbol.toUpperCase().includes(searchWord.toUpperCase()) ||
                value.name.toUpperCase().includes(searchWord.toUpperCase())
            }
        });
        if (searchWord === "") {
            setFilteredSymbols([]);
          } else if (searchWord.length >= 1) {
            setFilteredSymbols(newFilter.sort((a,b) => a.symbol.length - b.symbol.length));
          } else {
            setFilteredSymbols(newFilter.sort((a,b) => a.symbol.length - b.symbol.length));
          }
        };

    useEffect(() => {
        //getData()
        getAvailable()
        //const interval = setInterval(() => {
        //    getData()
        //  }, 2000);
        //  return () => clearInterval(interval);
    }, [])


    return <Fragment>
        <nav class="navbar fixed-top  navbar-expand-sm bg-dark navbar-dark">
  <a class="navbar-brand" href={`${process.env.REACT_APP_CLIENT_DOMAIN}/home`}>INTALLEX</a>
  <ul class="navbar-nav">
    <li class="nav-item">
      <a class="nav-link" href={`${process.env.REACT_APP_CLIENT_DOMAIN}/home`}>Home</a>
    </li>
  </ul>
  <ul class="nav navbar-nav ml-auto">
  <form className="d-flex" onSubmit={handleSubmit}>
            <div>
                <input 
                style={{
                    width: "330px",
                    borderTopRightRadius: "0px",
                    borderBottomRightRadius: "0px",
                    border: "0px",
                    height: "38px"
                }}
                className="form-control"
                contentType = "application/json"
                placeholder="Search for a Ticker or Company name here"
                name="ticker"
                value={symbol}
                onChange={handleFilter}
                />
                
                {available && symbol.length != 0 && <>
                <div id="dataResult">
                    {filteredSymbols.slice(0, 15).map((value, key) => {
                        return <a style={{textDecoration: "none"}} href={`${process.env.REACT_APP_CLIENT_DOMAIN}/company/quote/${value.symbol}`}>
                            <div /*onClick={handleSubmit}*/ id="dataItems" className="d-flex">
                                <div id="dropdownSymbol">{value.symbol}</div>
                                <div id="dropdownName">{value.name}</div>
                                <div id="exch">{value.exchange}</div>
                            </div>
                        </a>
                            
                    })}
                </div>
                </>}
            </div>
        </form>
            <button 
            class=" btn btn-light" 
            style={{
                height: "38px", 
                borderTopLeftRadius: "0px",
                borderBottomLeftRadius: "0px"}}>
                    {symbol.length === 0 ? <SearchIcon /> : <CloseIcon onClick={clearSearch} />}
                
            </button>
            {currentUser === null ? <>
            <li>
                <Link to="/signup"><button class=" btn btn-light mx-2">Sign Up</button></Link>
            </li>
            <li>
                <Link to="/login"><button class=" btn btn-light bi bi-box-arrow-in-right">Login</button></Link>
            </li>
            </> : <>
            <li>
                <Link to="/profile"><button type="button" class=" btn btn-light mx-2">Profile</button></Link>
            </li>
            <li>
                <ConfirmLogout/>
            </li>
            </>}
        
  </ul>
</nav>
    </Fragment>
}

export default Navbar2;