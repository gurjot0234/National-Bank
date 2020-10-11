import React from 'react';
import Login  from './Components/Login';
import Dashboard from './Components/Dashboard'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import './App.css'
import Transfer from './Components/Transfer';
import {Provider} from 'react-redux';
import store from './redux/store/store';

export default function App() {
    const history={};
    return (
         <Provider store={store}>
        <div>
            <Router >
                <Switch>
                    <Route path="/" component={Login} exact={true}/>
                    <Route path="/dashboard" component={Dashboard} exact={true}/>
                    <Route path="/transfer" component={Transfer} exact={true}/>

                </Switch>
            </Router>

        </div>
        </Provider>
    )
}
