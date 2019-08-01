import React from "react";

const AuthForm = props => {
    const { handleChange, handleSubmit, inputs: { username, password }, btnText } = props
    return (
        <form onSubmit={handleSubmit} className="s">
            <input
                className="i" 
                type="text" 
                name="username" 
                value={ username }
                onChange={ handleChange } 
                placeholder="Username"/>
            <input 
                className="i"
                type="text" 
                name="password" 
                value={ password } 
                onChange={ handleChange }
                placeholder="Password"/>
            <button className="btn">{ btnText }</button>       
        </form>
    )
}

export default AuthForm