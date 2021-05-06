
import React, { Component } from 'react';


export default class Home extends Component {
    
    render() {
        const nick = localStorage.getItem('nick');
       
        
        if(nick){
            return(
                <h2>Hi, {nick} </h2>
                
            )
            
        }
        return (
            <h2>You are not logged in</h2>
        );
    }
}

 