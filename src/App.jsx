import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import  {ContactApp}  from './pages/ContactApp/ContactApp'
import { ContactDetails } from './pages/ContactDetailsApp/ContactDetailsApp';
import "./assets/scss/global.scss";
import { AppHeader } from './cmps/AppHeader/AppHeader';
import { SignupPage } from './pages/SignupPage/SignupPage'
import { HomePage } from './pages/HomePage/HomePage'
import { ContactEdit } from './pages/ContactEditApp/ContactEditApp';
import StatisticApp from './pages/StatisticApp/StatisticApp'
import {AppFooter} from './cmps/AppFooter/AppFooter'

export function App() {
  return (
    <div className="App main-container">
      <Router>
        <AppHeader />
        <Switch>
          <Route path="/statistic" component={StatisticApp} />
          <Route path="/contact/edit/:id?" component={ContactEdit} />
          <Route path="/contact/:id" component={ContactDetails} />
          <Route path="/contact" component={ContactApp} />
          <Route path="/signup" component={SignupPage} />
          <Route path="/" component={HomePage} />
        </Switch>
        <AppFooter />
      </Router>

    </div>
  );
}