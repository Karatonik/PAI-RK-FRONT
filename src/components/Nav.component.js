import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoginFb from './LoginFb.component';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Home from '@material-ui/icons/Home'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Icon from '@material-ui/core/Icon';
import EventIcon from '@material-ui/icons/Event';
import DeleteIcon from '@material-ui/icons/Delete';
import PostAddIcon from '@material-ui/icons/PostAdd';
import EmailIcon from '@material-ui/icons/Email';
import StarIcon from '@material-ui/icons/Star';
import LoginGoogle from './LoginGoogle.component';
export default class Nav extends Component {

    handleLoguot=()=>{
        localStorage.clear();
        this.props.setUser(null);
    };
    render() {
        let buttons;
        if(localStorage.getItem('token')){
            buttons =(
                
                <ul className = "navbar-nav">
                  
                    <DropdownButton className='dropdown-content ' id="dropdown-basic-button" title="Menu">
                        <Dropdown.Item href="/events"><Icon component= {EventIcon}/>Find event</Dropdown.Item>
                        <Dropdown.Item href="/"><Icon component= {StarIcon}/>My Events</Dropdown.Item>
                        <Dropdown.Item href="/addEvent"><Icon component= {PostAddIcon}/>Create new Event</Dropdown.Item>
                        <Dropdown.Item href="/requestsFromUsers"><Icon component= {EmailIcon}/>My invites</Dropdown.Item>
                        <Dropdown.Item href="/deleteAcc"><Icon component= {DeleteIcon}/>Delete Account</Dropdown.Item>
                        <Dropdown.Item href="/" onClick ={this.handleLoguot}>  <Icon component= {ExitToAppIcon}/> Logout</Dropdown.Item>
                       
                    </DropdownButton>
                </ul>
                
                
                )
        }else{
            buttons =(
            <ul className = "navbar-nav ml-auto">
                <li className = "nav-item">
                    <Link to ={'/login'} className = "nav-link">Log in</Link>
                </li>
                <li className = "nav-item">
                    <Link to ={'/register'} className = "nav-link">Sign up</Link>
                </li>
            <li>
                <LoginFb/>
            </li>
            <li>
                <LoginGoogle/>
            </li>
            </ul>
            )
        }
        return (
            <nav className = "navbar navbar-expand navbar-light fixed-top">
           
                <div className = "container">
                    <Link className = "navbar-brand" to={'/'}><Icon component= {Home}/>Home</Link>
                    <div className = "collapse navbar-collapse">
                      {buttons}
                    </div>
                </div>
          </nav>
        );
    }
}

 