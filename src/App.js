import React, { Fragment } from "react";
import './App.css';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import {TickerProvider} from "./components/TickerContext";

//components
import HistPrices from "./components/HistPrices";
import Navbar from "./components/Navbar";
import StockNews from "./components/StockNews";
import Profiletwo from "./components/Profile2";
import Summary from './components/Summary';
import Myquote from './components/MyQuote';
import CompanyHeader from './components/CompanyHeader';
import CompanyNews from "./components/CompanyNews";
import FinancialNav from "./components/FinancialsNav";
import IncomeQ from "./components/IncomeQ";
import IncomeA from "./components/IncomeA";
import BalanceA from "./components/BalanceA";
import BalanceQ from "./components/BalanceQ";
import CashflowQ from "./components/CashflowQ";
import CashflowA from "./components/CashflowA";
import KeyMetricsA from "./components/KeyMetricsA";
import StatisticsNav from "./components/StatisticsNav";
import KeyMetricsQ from "./components/KeyMetricsQ";
import RatiosA from "./components/RatiosA";
import RatiosQ from "./components/RatiosQ";
import Dashboard from './components/Dashboard';
import ForgotPassword from './components/ForgotPassword';
import Login from './components/Login';
import UpdateProfile from './components/UpdateProfile';
import Signup from './components/Signup';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import { useAuth } from "./contexts/AuthContext"

function App() {
  const  currentUser  = useAuth()
  return (
    <TickerProvider>
    <AuthProvider>
      <BrowserRouter>
        <Fragment>
          <div className="container">
          <Navbar />
            <Routes>
              <Route exact path="/profile" render={props => {
        return currentUser ? <Dashboard {...props} /> : <Navigate to="/login" />
      }}/>
              <Route exact path="/update-profile" render={props => {
        return currentUser ? <UpdateProfile {...props} /> : <Navigate to="/login" />
      }} />
              {/*(<PrivateRoute exact path="/profile" element={<Dashboard/>} />
              <PrivateRoute path="/update-profile" element={<UpdateProfile/>} />*/}
              <Route path="/signup" element={<Signup/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/forgot-password" element={<ForgotPassword/>} />
              <Route path="/home" element={<StockNews/>} />
              <Route path="/company/" element={<CompanyHeader/>} />
              <Route path="/company/summary" element={<Summary/>} />
              <Route path="/company/profile/:symb" element={<Profiletwo/>} />
              <Route path="/company/historical/:symb" element={<HistPrices/>} />
              <Route path='/company/quote/:symb' element={<Myquote/>} />
              <Route path="/company/news/:symb" element={<CompanyNews/>} />
              <Route path="/company/financials/:report/:period/:symb" element={<FinancialNav/>} />
              <Route path="/company/financials/income-statement/quarter/:symb" element={<IncomeQ/>} />
              <Route path="/company/financials/income-statement/annual/:symb" element={<IncomeA/>} />
              <Route path="/company/financials/balance-sheet/annual/:symb" element={<BalanceA/>} />
              <Route path="/company/financials/balance-sheet/quarter/:symb" element={<BalanceQ/>} />
              <Route path="/company/financials/cash-flow/quarter/:symb" element={<CashflowQ/>} />
              <Route path="/company/financials/cash-flow/annual/:symb" element={<CashflowA/>} />
              <Route path="/company/statistics/:report/:period/:symb" element={<StatisticsNav/>} />
              <Route path="/company/statistics/key-metrics/annual/:symb" element={<KeyMetricsA/>} />
              <Route path="/company/statistics/key-metrics/quarter/:symb" element={<KeyMetricsQ/>} />
              <Route path="/company/statistics/ratios/annual/:symb" element={<RatiosA/>} />
              <Route path="/company/statistics/ratios/quarter/:symb" element={<RatiosQ/>} />
            </Routes>
          </div>
        </Fragment>
      </BrowserRouter>
      </AuthProvider>
    </TickerProvider>
  );
}

export default App;
