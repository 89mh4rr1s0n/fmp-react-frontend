import React, { Fragment, useContext, useEffect, useReducer, useState } from "react";
import { Link, useHistory, useParams } from 'react-router-dom';
import { TickerContext } from './TickerContext';
//import availableSymbols from '../availableTraded.json';

const Navbar2 = ({ availableSymbols }) => {

    const getAvailable = async () => {
        const availableData = await fetch(`http://localhost:5000/symbols2`);
        const availableJson = await availableData.json();
        setAvailable(availableJson);
    }
    const { symb } = useParams();
    //console.log(availableSymbols)
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
        const data = await fetch(`http://localhost:5000/company/quotes/${symbol.toUpperCase()}`)
        const jsonData = await data.json();
        setQuote(jsonData.quote);
        setProfile(jsonData.profile);
        setCim(jsonData.cimData);
        setData(jsonData)
        //setTicker(symbol);
        data.report = "income-statement";
        console.log(jsonData)
        console.log(quote)
    }

    const getDataClick = async (e,p) => {
        e.preventDefault()
        
        history.push(`/company/quote/${data.symbol}`)
    }


        console.log(`symbol state is ${symbol}`)
        console.log(`data is ${data}`)

    const handleSubmit = e => {
        e.preventDefault()
        //data.report = "income-statement";
        data.symbol = symbol.toUpperCase();
        getData().then( history.push(`/company/quote/${data.symbol}`));
        //setSymbol('')
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
        getData()
        getAvailable()
    }, [])


    return <Fragment>
        <nav class="navbar fixed-top  navbar-expand-sm bg-dark navbar-dark">
  <a class="navbar-brand" href="http://localhost:3000/home">MH FINANCE</a>
  <ul class="navbar-nav">
    <li class="nav-item">
      <a class="nav-link" href="http://localhost:3000/home">Home</a>
    </li>
  </ul>
  <ul class="nav navbar-nav ml-auto">
  <form className="d-flex" onSubmit={handleSubmit}>
            <div>
                <input 
                style={{width: "330px"}}
                className="form-control"
                contentType = "application/json"
                placeholder="Search for a Ticker or Company name here"
                name="ticker"
                //onChange={e => setSymbol(e.target.value)} 
                onChange={handleFilter}
                //className="form-control" 
                />
                {available && filteredSymbols.length != 0 && <>
                <div id="dataResult">
                    {filteredSymbols.slice(0, 15).map((value, key) => {
                        return <Link id="result" to={`/company/quote/${value.symbol}`}>
                            <div /*onClick={handleSubmit}*/ id="dataItems" className="d-flex">
                                <div id="dropdownSymbol">{value.symbol}</div>
                                <div id="dropdownName">{value.name}</div>
                            </div>
                            </Link>
                    })}
                </div>
                </>}
            </div>
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
    </Fragment>
}

export default Navbar2;