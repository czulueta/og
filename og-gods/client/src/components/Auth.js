import React from "react";
import AuthForm from "./AuthForm.js";
import Form from "../shared/Form.js";
import Toggle from "../shared/Toggle.js";
import { withUser } from "../context/UserProvider.js";
import "./styles.css";
import AuthLink from "./AuthLink.js";
import disImage from "../shared/og-gods.jpg";


const Auth = (props) => {
    const { signup, login } = props
    return (
        
            <div className="AuthChild" style={{backgroundImage: `url(${disImage})`}}>
                        <Toggle render={({on, toggler}) => 
                            !on ?
                                <>
                                    <Form 
                                        inputs={{ username: "", password: "" }}
                                        submit={ inputs => signup(inputs)}
                                        render={formProps => <AuthForm {...formProps} btnText="Sign Up"/>}
                                    />
                                    <p className="am" onClick={toggler}>Already A Member?</p>
                                </>
                                :
                                <>
                                    <Form 
                                        inputs={{ username: "", password: "" }}
                                        submit={ inputs => login(inputs)}
                                        render={formProps => <AuthForm {...formProps} btnText="Login"/>}
                                    />
                                    <p className="am" onClick={toggler}>Not A Member?</p>
                                    
                                </>
                        }/>
                    <div className="pHome">    
                        <h1 className="homeTitle">Og Gods</h1>
                    </div>
            </div>
        
    )
}

export default withUser(Auth)