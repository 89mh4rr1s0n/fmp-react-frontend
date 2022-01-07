import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link, useHistory, NavLink } from 'react-router-dom';
import { TickerContext } from './TickerContext';
import { useAuth } from "../contexts/AuthContext";
import ConfirmLogout from './ConfirmLogout';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';


const Navbar2 = () => {

    const getAvailable = async () => {
        const availableData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/symbols`);
        const availableJson = await availableData.json();
        setAvailable(availableJson);
    }
    //contentType
    const { currentUser } = useAuth();
    //console.log(currentUser)
    const [symbol, setSymbol] = useState('')
    // eslint-disable-next-line
    const [quote, setQuote] = useState([]);
    // eslint-disable-next-line
    const [profile, setProfile] = useState([]);
    const [available, setAvailable] = useState(null);
    const [filteredSymbols, setFilteredSymbols] = useState([]);
    const [data, setData] = useContext(TickerContext);
    const history = useHistory();

    const getData = async () => {
        const data = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/company/info/${symbol.toUpperCase()}`)
        const jsonData = await data.json();
        setQuote(jsonData.quote);
        setProfile(jsonData.profile);
        setData(jsonData)
    }

    const clearSearch = () => {
        setSymbol('')
    }

    const handleSubmit = e => {
        e.preventDefault()
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
        getAvailable()
    }, [])


    return <Fragment>
        <nav className="navbar fixed-top  navbar-expand-sm bg-dark navbar-dark">
        <NavLink className="navbar-brand" to={`/home`}>INTALLEX</NavLink>
        <ul className="navbar-nav">
            <li className="nav-item">
            <NavLink className="nav-link" to={`/home`}>Home</NavLink>
            </li>
        </ul>
        <ul className="nav navbar-nav ml-auto">
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
                placeholder="Search for a Ticker or Company name here"
                name="ticker"
                value={symbol}
                onChange={handleFilter}
                />
                
                {available && symbol.length !== 0 && <>
                <div id="dataResult">
                    {filteredSymbols.slice(0, 15).map((value, key) => {
                        return <a key={key} style={{textDecoration: "none"}} href={`${process.env.REACT_APP_CLIENT_DOMAIN}/company/quote/${value.symbol}`}>
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
            className=" btn btn-light" 
            style={{
                height: "38px", 
                borderTopLeftRadius: "0px",
                borderBottomLeftRadius: "0px"}}>
                    {symbol.length === 0 ? <SearchIcon /> : <CloseIcon onClick={clearSearch} />}
                
            </button>
            {currentUser === null ? <>
            <li>
                <Link to="/signup"><button className=" btn btn-light mx-2">Sign Up</button></Link>
            </li>
            <li>
                <Link to="/login"><button className=" btn btn-light bi bi-box-arrow-in-right">Login</button></Link>
            </li>
            </> : <>
            <li>
                <Link to="/profile"><button type="button" className=" btn btn-light mx-2">Profile</button></Link>
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