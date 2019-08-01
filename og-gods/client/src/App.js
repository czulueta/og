import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Auth from "./components/Auth.js";
import BuyingPage from "./components/BuyingPage";
import { withUser } from "./context/UserProvider.js";



const App = (props) => {
    const { user: {username, _id}, token, logout } = props
    console.log( "hello" )
    return (
        <div>
                <Switch>
                    <Route exact path="/" render={rProps => !token ? <Auth {...rProps}/> : <Redirect to="/buying"/>} />
                    <Route path="/buying" render={rProps => !token ? <Redirect to="/"/> : <BuyingPage {...rProps} username={username} logout={logout}/>} /> 
                </Switch>
                <div>hello world</div>
        </div>
    )
}

export default withUser(App)