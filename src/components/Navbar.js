import React from 'react';
import logo from '../assets/logo.png';
import { Navbar, Container, Nav, Image, Button } from "react-bootstrap";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  const Logout = async () => {
    try {
      await axios.delete('http://localhost:5000/logout');
      navigate({ pathname: "/" });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Navbar variant='dark'>
        <Container>
          <Navbar.Brand href="/">
            <Image src={logo} alt="Logo" style={{
              height: 'fit-content',
              maxWidth: '90px'
            }} />
          </Navbar.Brand>
          <Nav>
            <Nav.Link>
              <Button onClick={Logout} variant='light'>Logout</Button>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

export default NavBar
