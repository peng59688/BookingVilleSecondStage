import React, { Component } from 'react'
import logo from '../images/logo.svg'
import {FaAlignRight} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import {useContext} from 'react'
import {RoomContext} from '../context'


 const Navbar= ()=> {
    
  const context=useContext(RoomContext)
  const {
     currentUser,signOut
  }=context;
        return (
            <nav className="navbar">
              <div className="nav-center">
              <div className="nav-header">
              {console.log("currentUser is",currentUser)}
        <Link to='/'>
        <img src={logo} alt="beach resort"/>
        </Link>

           {/* <button type="button" className="nav-btn" onClick={this.handleToggle}>
           <FaAlignRight className="nav-icon"/>    
           </button>  */}
            </div> 
            
            <ul className={"nav-links"}>
                <li>
                    <Link to="/">Home</Link>
                    </li>
                    <li>
                    <Link to="/rooms">Rooms</Link>
                </li>
                
                {currentUser ? (
          <li className="hovereffect" onClick={()=>signOut()} >
            Sign Out
          </li>
        ) : (
          <li>
                <a href="https://bookingvalley.auth.us-west-2.amazoncognito.com/login?response_type=token&client_id=1fqqbh0i7fof8b8l37l3r3ihc9&redirect_uri=https%3A%2F%2Fbookingvalley.netlify.app">
             Sign In
              </a>
                </li>
        )}
                
        {/* <li>
                <a href="https://bookingvalley.auth.us-west-2.amazoncognito.com/login?response_type=token&client_id=1fqqbh0i7fof8b8l37l3r3ihc9&redirect_uri=https%3A%2F%2Fbookingvalley.netlify.app">
             Sign In
              </a>
                </li> */}
                <li>
              <a href="https://facebook.com">
                <i class="fab fa-facebook"></i>
              </a>
            </li>
            <li>
              <a href="https://twitter.com">
                <i class="fab fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="https://instagram.com">
              <i class="fab fa-instagram"></i>
              </a>
            </li>
            </ul> 
              </div>
            </nav>
        )
    }



export default Navbar;