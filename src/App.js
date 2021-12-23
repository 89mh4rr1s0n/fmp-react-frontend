import React, { Fragment } from "react";
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {TickerProvider} from "./components/TickerContext";

//components
import HistPrices from "./components/HistPrices";
import Navbar from "./components/Navbar";
import Navbar2 from "./components/Navbar2";
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

function App() {

  return (
    <TickerProvider>
    <AuthProvider>
      <BrowserRouter>
        <Fragment>
          <div className="container">
          <Navbar />
            <PrivateRoute exact path="/profile" component={Dashboard} />
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/home" component={StockNews} />
            <Route path="/company/" component={CompanyHeader} />
            <Route path="/company/summary" component={Summary} />
            <Route path="/company/profile/:symb" component={Profiletwo} />
            <Route path="/company/historical/:symb" component={HistPrices} />
            <Route path='/company/quote/:symb' component={Myquote} />
            <Route path="/company/news/:symb" component={CompanyNews} />
            <Route path="/company/financials/:report/:period/:symb" component={FinancialNav} />
            <Route path="/company/financials/income-statement/quarter/:symb" component={IncomeQ} />
            <Route path="/company/financials/income-statement/annual/:symb" component={IncomeA} />
            <Route path="/company/financials/balance-sheet/annual/:symb" component={BalanceA} />
            <Route path="/company/financials/balance-sheet/quarter/:symb" component={BalanceQ} />
            <Route path="/company/financials/cash-flow/quarter/:symb" component={CashflowQ} />
            <Route path="/company/financials/cash-flow/annual/:symb" component={CashflowA} />
            <Route path="/company/statistics/:report/:period/:symb" component={StatisticsNav} />
            <Route path="/company/statistics/key-metrics/annual/:symb" component={KeyMetricsA} />
            <Route path="/company/statistics/key-metrics/quarter/:symb" component={KeyMetricsQ} />
            <Route path="/company/statistics/ratios/annual/:symb" component={RatiosA} />
            <Route path="/company/statistics/ratios/quarter/:symb" component={RatiosQ} />
          </div>
        </Fragment>
      </BrowserRouter>
      </AuthProvider>
    </TickerProvider>
  );
}

export default App;
