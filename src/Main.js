import React from 'react';
import Login from './login';
import HotelInfo from './hotelInfo'
import { Route, Switch } from 'react-router-dom';


class Main extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loggedIn : false
        }
    }

    isLoggedIn(){
        return this.state.loggedIn;
    }
    
    render(){
        return (
            <Switch>
            <Route path="/login" component={ Login }/>
            <Route path="/hotelInfo" component = { HotelInfo }/>
            </Switch>
        )
    }   
}

export default Main;