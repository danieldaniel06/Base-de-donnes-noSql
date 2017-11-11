import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router,Route, browserHistory } from 'react-router-dom'
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import FaitActivite from './FaitActivite/FaitActivite'

class App extends React.Component {
  render() {
    return (
      <div className="my-app">
        <Router>
          <div className="container-fluid">
            <Route exact path="/" component={FaitActivite} />
          </div>
        </Router>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
