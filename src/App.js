
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home.component';
import Nav from './components/Nav.component';
import { BrowserRouter, Switch,Route } from 'react-router-dom';
import Login from './components/Login.component';
import Registration from './components/Registration.component';
import React ,{ Component } from 'react';
import axios from 'axios';
import Forgot from './components/Forgot.component';
import Reset from './components/Reset.component';
import EventPage from './components/EventPage'
import InfoComments from './components/InfoComments';
import DeleteAcc from './components/DeleteAcc';
import AddEvents from './components/AddEvents';
import MyEvents from './components/MyEvents';
import RequestsToEventsFromUsers from './components/RequestsToEventsFromUsers'
import MyInvites from './components/MyInvites';
import RequestUser from './components/Request';
import AddUserToEvent from './components/AddUserToEvent';
import AcceptInvite from './components/AcceptInvite';
import RequestToEvent from './components/RequestToEvent';
import AcceptUserToEvent from './components/AcceptUserToEvent';
import EventIPartiAlready from './components/EventIPartiAlready';
import LoginGoogle from './components/LoginGoogle';
import LoginFb from './components/LoginFb';
import MyGoogleMap from './components/MyGoogleMap';
import Avatar from './components/Avatar';

export default class App extends Component {

  state ={}

  componentDidMount = ()=> {
     
      const config ={
          headers:{
              Authorization: 'Bearer ' + localStorage.getItem('token') 
          },
         
      };
      const email = localStorage.getItem('email')
      console.log(email);
   

    axios.get('/user/'+email,config).then(
        res => {
            
                this.setState({
                    user:res.data
                })
          
        },
        
     err =>{
        console.log(err)
    }
  )

}

setUser = user =>{
  this.setState({
    user:user
  });
};


  render(){
  return (
    <BrowserRouter>
          <Switch> 
            <Route exact path = "/events" component = {EventPage}/>
            <Route exact path = "/event/:id" component = {RequestUser}/>
            <Route exact path ='/addUser/:id' component = {AddUserToEvent}/>
            <Route exact path ='/acceptInvite/:id' component = {AcceptInvite}/>
            <Route exact path = '/showRequests/:id' component ={RequestToEvent}/>
            <Route exact path = '/showRequests/:eventID/:id' component = {AcceptUserToEvent}/>
            <Route exact path = '/acceptInvite' component = {MyInvites}/>
            <Route exact path = "/deleteAcc" component ={DeleteAcc}/>
            <Route exact path = "/addEvent" component = {AddEvents}/>
            <Route exact path = "/myEvents" component = {MyEvents}/>
            <Route exact path = "/eventsIPartiAlready" component = {EventIPartiAlready}/>
            <Route exact path = "/invitesFromUsers" component = {MyInvites}/>
            <Route exact path = "/requestsFromUsers" component = {RequestsToEventsFromUsers}/>
            <Route exact path = "/infoComments/:id" component = {InfoComments}/>
            <Route exact path = "/addAvatar" component = {Avatar}/>
         

        </Switch>
      <div className="App">
      <Nav user = {this.state.user} setUser = {this.setUser}/>
      <div className = "auth-wrapper">
            <Switch>
              <Route exact path = "/" component = {()=><Home user ={this.state.user} />}/>
              <Route exact path="/map" component={() => 
                  <MyGoogleMap 
                    markerClick={this.test} 
                    markers={[{ name: 'Impreza A', x: 53.15, y: 18.00 }, {  name: 'Impreza B', x: 53.15, y: 18.10 }]}
                    onMapClick={this.test}
                    mapCenter={{ x: 53.15, y: 18.00 }} 
                  />} />
              <Route exact path = "/login" component = {()=> <Login setUser={this.setUser}/>}/>
              <Route exact path = "/register" component = {Registration}/>
              <Route exact path = "/forgot" component = {Forgot }/>
              <Route exact path = "/facebook" component = {LoginFb}/>
              <Route exact path = "/google" component = {LoginGoogle}/>
              <Route exact path = "/reset/:id" component = {Reset }/>
            </Switch>
        </div>
      </div>
    </BrowserRouter>
    );
  }
 }
