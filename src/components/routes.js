import React, { Component } from "react";
import { Router, Route, Switch } from 'react-router';
import { connect } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import Dashboard from './Dashboard';
import DetailsPage from './DetailsPage';
const history = createHistory();

class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/details" component={DetailsPage} />
          <Route path="/*" component={() => 'NOT FOUND'} />
        </Switch>
      </Router>

    )
  }

};

const mapState = ({ }) => ({});
const mapDispatch = {};

export default connect(mapState, mapDispatch)(Routes);