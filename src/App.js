import React, { Fragment } from "react";
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { TickerProvider } from "./components/TickerContext";

//components
import HistPrices from "./components/HistPrices";
import Navigation from "./components/Navigation";
import Navbar from "./components/Navbar";
import StockNews from "./components/StockNews";
import Profiletwo from "./components/Profile2";
import Myquote from './components/MyQuote';
import CompanyHeader from './components/CompanyHeader';
import CompanyNews from "./components/CompanyNews";
import Dashboard from './components/Dashboard';
import ForgotPassword from './components/ForgotPassword';
import LoginPage from './components/Login';
import UpdateProfile from './components/UpdateProfile';
import Signup from './components/Signup';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './components/NotFound';
import Financials from "./components/Financials";
import Statistics from "./components/Statistics";

function App() {

  //let location = useLocation();

  return (
    <TickerProvider>
    <AuthProvider>
      <BrowserRouter>
        <Fragment>
          <div className="container">
          {/*<Route path="/" component={Navigation}/>*/}
          <Route path="/" component={Navbar}/>
          <Route path="/company/" component={CompanyHeader} />
          <Switch>
            <Route path="/company/financials/:report/:period/:symb" component={Financials} />
            <Route path="/company/statistics/:report/:period/:symb" component={Statistics} />
            <Route path="/company/profile/:symb" component={Profiletwo} />
            <Route path="/company/historical/:symb" component={HistPrices} />
            <Route path='/company/quote/:symb' component={Myquote} />
            <Route path="/company/news/:symb" component={CompanyNews} />
            <PrivateRoute exact path="/profile" component={Dashboard} />
            <PrivateRoute exact path="/update-profile" component={UpdateProfile} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={LoginPage} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/home" component={StockNews} />
            <Route path="*" ><NotFound/></Route>
          </Switch>
          </div>
        </Fragment>
      </BrowserRouter>
      </AuthProvider>
    </TickerProvider>
  );
}

export default App;
