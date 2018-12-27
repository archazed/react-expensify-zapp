import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import ExpenseDashboard from './components/ExpenseDashboard';
import AddExpensePage from './components/AddExpensePage';
import EditExpensePage from './components/EditExpensePage';
import HelpSection from './components/HelpSection';
import NotFoundPage from './components/NotFoundPage';
import './App.scss';


class App extends React.Component { 
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route path="/" component={ ExpenseDashboard } exact={true} />
            <Route path="/create" component={ AddExpensePage } />
            <Route path="/edit/:id" component={ EditExpensePage } />
            <Route path="/help" component={ HelpSection } />
            <Route component={ NotFoundPage } />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
