import React, { createContext, Component } from 'react';

const AuthContext = createContext()

export class AuthContextProvider extends Component {
    state ={
        user: JSON.parse(localStorage.getItem('user'))
    }

    setUser = (user) => {
        localStorage.setItem('user', user? JSON.stringify(user): null)
        this.setState({user})
    }

    logout = () => {

    }
    
    render() {
        const value = {
            currentUser: this.state.user,
            setUser: this.setUser
        } 
        return ( 
            <AuthContext.Provider value={value}>
                {this.props.children}
            </AuthContext.Provider>
         );
    }
}

export const WithAuthConsumer = (WrappedComponent) => (props) => (
    <AuthContext.Consumer>
        {(authProps) => ( <WrappedComponent {...props} {...authProps} />)}
    </AuthContext.Consumer>
)

export default AuthContext