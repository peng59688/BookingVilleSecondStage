import React from 'react';
import './App.css';
import Home from './pages/Home'
import Rooms from './pages/Rooms'
import Reservations from './pages/Reservations'
import SingleRoom from './pages/SingleRoom'
import Error from './pages/Error'
import {Route,Switch} from 'react-router-dom'
import Navbar from './components/Navbar'
function App() {
  return (
    <div className="App">
    <Navbar/>
    <Switch>
    <Route exact path='/' component={Home}/>
    <Route exact path='/rooms/' component={Rooms}/>
    <Route exact path='/rooms/:slug' component={SingleRoom}/>
    <Route exact path='/rooms/:slug/reservation' component={Reservations}/>
    <Route component={Error}/>
    </Switch>
  
    </div>
  );
}

export default App;
