
import React, { Component } from 'react';


export default class Home extends Component {
    
    render() {
       
        
        if(this.props.user){
            return(
                <h2 style={{marginTop:'-10%'}}>Hi, {this.props.user.nick} </h2>
                
            )
            
        }
        return (
            <h2 style={{marginTop:'-10%'}}>You are not logged in</h2>
        );
    }
}

 