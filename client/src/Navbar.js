import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./App.css"
import React,{useState} from "react"
import { Link } from 'react-router-dom';

function NavBarComponent() {
const [LoginOrOut, setLoginOrOut] = useState(false)

  function Switch(){
    if(LoginOrOut === false){
      setLoginOrOut(true)
    }else{
      setLoginOrOut(false)
    }
  }
  return (
    <>
      <Navbar id="navbar">
        <div id="navContainer">
          <div id="firstNavContainer">
          <Navbar.Brand style={{}}  href="#home"><h3 >LOGO</h3></Navbar.Brand>
          
        <div class="search-bar">
               
            <label id="Label">
            <svg id="Svg"  class="search-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
            <input type="text" class="search-input" />

            <button class="search-button">
              Search
            </button>
            </label>
            
        </div>
        </div>
        <div id="secondNavContainer">

        <div id="ButtonsContainer">
        <div id="ButtonOutline"><h3 onClick={Switch}>{LoginOrOut ? "Log Out" :"Log In"}</h3></div>
        <div id="ButtonOutline"><h3 onClick={Switch}>{LoginOrOut ? "Log Out" :"Sign Up"}</h3></div>
        </div>
        </div>
    </div>
        
      </Navbar>
      </>
      )
  }
  export default NavBarComponent

