import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css/animate.min.css';
import { Provider } from './context/context';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import About from './components/About';
import ExtensionDownload from './components/ExtensionDownload';

function App() {
  return (
    <Provider>
      <Router basename={process.env.PUBLIC_URL}>
        <div>
          <ReactNotification />
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/extensions" component={ExtensionDownload} />
              <Route exact path="/about" component={About} />
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
