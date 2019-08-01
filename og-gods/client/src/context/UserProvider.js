import React, { Component } from "react";
import axios from "axios";

const UserContext = React.createContext()
const buyingAxios = axios.create()

buyingAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

class UserProvider extends Component {
    constructor(){
        super()
        this.state = {
            user: JSON.parse(localStorage.getItem("user")) || {},
            token: localStorage.getItem("token") || "",
            buying: []
        }
    }

    signup = (credentials) => {
        axios.post("/auth/signup", credentials)
            .then(res => {
                const { user, token } = res.data
                localStorage.setItem("user", JSON.stringify(user))
                localStorage.setItem("token", token)
                this.setState({user, token })
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    login = (credentials) => {
        axios.post("/auth/login", credentials)
            .then(res => {
                const { user, token } = res.data
                localStorage.setItem("user", JSON.stringify(user))
                localStorage.setItem("token", token)
                this.setState({user, token })
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    logout = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        this.setState({ usr: {}, token: "" })
    }

    addBuying = (newBuying) => {
        this.setState(prev => {
            return {
                buying: [...prev.buying, newBuying]
            }
        })
        buyingAxios.post("/api/buying", newBuying )
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    getUserOrders = () => {
        buyingAxios.get("/api/buying")
            .then(res => {
                this.setState({ buying: res.data })
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    render(){
        return(
            <UserContext.Provider
                value={{
                    ...this.state,
                    signup: this.signup,
                    login: this.login,
                    logout: this.logout,
                    addBuying: this.addBuying,
                    getUserOrders: this.getUserOrders

                }}>
                { this.props.children }
            </UserContext.Provider>
        )
    }
}

export default UserProvider

export const withUser = C => props => (
    <UserContext.Consumer>
        { (value) => <C {...value} {...props}/> }
    </UserContext.Consumer>
)