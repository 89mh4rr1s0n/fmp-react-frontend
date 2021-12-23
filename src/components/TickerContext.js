import React, {useState, createContext} from 'react';

export const TickerContext = createContext([]);

export const TickerProvider = (props) => {

    const [data, setData] = useState([]);



    return (
    <TickerContext.Provider value={[data, setData]}>
        {props.children}
    </TickerContext.Provider>
    );
}

//export const useSearch = () => useContext(TickerContext)