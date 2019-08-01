import React, { Component } from "react";
import Form from "../shared/Form.js";
import BuyingForm from "./BuyingForm.js";
import { withUser } from "../context/UserProvider.js";

class BuyingPage extends Component {
    componentDidMount(){
        this.props.getUserOrders()
    }

    render(){
        const { logout, username, addBuying, buying } = this.props
        return (
            <div className="growPops">
                <div className="grow" style={{backgroundImage: `url(https://www.cannasensation.com/wp-content/uploads/yay-1219172-digital.jpg)`}}>
                    <button onClick={logout}>Logout</button>
                    hello {username} welcome to " Og Gods " 
                    <Form 
                        inputs={{ title: "" }}
                        submit={inputs => addBuying(inputs)}
                        render={formProps => <BuyingForm {...formProps}/>}
                    />
                    { buying.map(buying => <h1 key={buying._id}>{buying.title}</h1>)} 
                </div>
            </div>
        )
    }
}
export default withUser(BuyingPage)