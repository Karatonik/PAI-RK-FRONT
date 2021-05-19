import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
import FaceIcon from '@material-ui/icons/Face';


export default class Nav extends Component {

    handleLoguot=()=>{
        
        var eventID = localStorage.getItem('eventID');
        localStorage.clear();
        localStorage.setItem('eventID',eventID);
        this.props.setUser(null);
    };
    render() {
        let buttons;
        if(this.props.user){
            buttons =(
                
                <ul className = "navbar-nav">
                  
                    <DropdownButton className='dropdown-content ' id="dropdown-basic-button" title="Menu">
                        <Dropdown.Item href="/events"><Icon component= {EventIcon}/>Find event</Dropdown.Item>
                        <Dropdown.Item href="/myEvents"><Icon component= {StarIcon}/>Administrated events</Dropdown.Item>
                        <Dropdown.Item href="/addEvent"><Icon component= {PostAddIcon}/>Create new Event</Dropdown.Item>
                        <Dropdown.Item href="/requestsFromUsers"><Icon component= {EmailIcon}/>Requests to other events</Dropdown.Item>
                        <Dropdown.Item href="/invitesFromUsers"><Icon component= {EmailIcon}/>Invites from other events</Dropdown.Item>
                        <Dropdown.Item href="/eventsIPartiAlready"><Icon component= {EventIcon}/>Events which I participate already</Dropdown.Item>
                        <Dropdown.Item href="/deleteAcc"><Icon component= {DeleteIcon}/>Delete Account</Dropdown.Item>
                        <Dropdown.Item href="/addAvatar"><Icon component= {FaceIcon}/>Add avatar</Dropdown.Item>
                        <Dropdown.Item href="/" onClick ={this.handleLoguot}>  <Icon component= {ExitToAppIcon}/> Logout</Dropdown.Item>
                       
                    </DropdownButton>
                </ul>
                
                
                )
        }else{
            buttons =(
            <ul className = "navbar-nav ml-auto">
                <li className = "nav-item">
                    <Link to ={'/login'} className = "nav-link">Login</Link>
                </li>
                <li className = "nav-item">
                    <Link to ={'/register'} className = "nav-link">Sign up</Link>
                </li> <li className = "nav-item">
                    <Link to ={'/facebook'} className = "nav-link">Login Facebook</Link>
                </li>
                <li className = "nav-item">
                    <Link to ={'/google'} className = "nav-link">Login Google</Link>
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

 