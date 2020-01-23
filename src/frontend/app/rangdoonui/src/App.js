import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header'
import Dashboard from './components/Dashboard';
import About from './components/About';
import ExtensionDownload from './components/ExtensionDownload';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div>
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
  );
}

export default App;
