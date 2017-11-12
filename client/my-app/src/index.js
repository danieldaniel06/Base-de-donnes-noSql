import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, browserHistory } from 'react-router-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import FaitActivite from './FaitActivite/FaitActivite';
import Homme from './Homme/Homme';
import Top10 from './Top10/Top10';

class App extends React.Component {
	render() {
		return (
			<div className="my-app">
				<Router>
					<div className="container-fluid">
						<Route exact path="/" component={Homme} />
						<Route exact path="/cubeInstAct" component={FaitActivite} />
						<Route exact path="/topN" component={Top10} />
					</div>
				</Router>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
