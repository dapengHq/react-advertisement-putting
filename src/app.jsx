import React,{ Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './router'
import routes from './router/router.config'
import './app.css'
class App extends Component{
    render(){
        return <BrowserRouter>
            <Router routes={routes}></Router>
        </BrowserRouter>
    }
}
export default App